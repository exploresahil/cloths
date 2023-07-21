"use client";

import Filter from "@/components/client/Filter";
import Image from "next/image";

import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/sanity/sanity-utils";
import { products } from "@/types/Products";
import { category } from "@/types/Category";
import { AiOutlinePlus } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
function arraysHaveCommonElement(array1: any[], array2: any[]) {
  return array1.some((item) => array2.includes(item));
}
const Products = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const [products, setProducts] = useState<products[]>([]);
  const [_products, set_Products] = useState<products[] | any[]>([]);
  const [categories, setCategories] = useState<category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("_view all");

  useEffect(() => {
    async function fetchProducts() {
      const products = await getProducts();
      setProducts(products);
      set_Products(products);
    }

    async function fetchCategories() {
      const categories = await getCategories();
      setCategories(categories);
    }

    fetchProducts();
    fetchCategories();
  }, [selectedCategory]);

  useEffect(() => {
    set_Products((_products) => {
      // console.log(
      //   "ssss=>",
      //   categories,
      //   selectedCategory,
      //   searchQuery,
      //   searchQuery && selectedCategory === "_view all"
      // );

      if (searchQuery && selectedCategory === "_view all") {
        console.log("search query not null");

        const filteredProducts = products.filter((product) =>
          product.searchTags.current
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
        console.log(filteredProducts);

        return filteredProducts;
      } else {
        console.log("search query  null");

        return products;
      }
    });
  }, [searchQuery, products]);
  useEffect(() => {
    if (categoryQuery) setSelectedCategory(categoryQuery);
  }, [categoryQuery]);

  const handleCategoryClick = (selectedCategory: any) => {
    setSelectedCategory(selectedCategory);
    setSelectedFilters([]);
    setSelectedSizes([]);
  };
  //====
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<any[]>([]);
  //====

  return (
    <div className="products-main">
      <Filter
        {...{
          selectedSizes,
          setSelectedSizes,
          selectedFilters,
          setSelectedFilters,
          setSelectedCategory,
        }}
      />
      <div className="products-container">
        <div className="sidebar">
          <ul className="category-container">
            {categories.map((category) => (
              <li
                className={`${
                  selectedCategory === `${category.name}` ? "active" : ""
                }`}
                key={category._id}
                onClick={() => {
                  setSelectedCategory(category.name);
                  handleCategoryClick(category.name);
                }}
              >
                {category.name}
                <ContactArrow />
              </li>
            ))}
            <li
              className={`${
                selectedCategory === "_view all" ||
                selectedCategory === "view all"
                  ? "active"
                  : ""
              }`}
              onClick={() => {
                handleCategoryClick("view all");
              }}
            >
              view all
              <ContactArrow />
            </li>
          </ul>
        </div>
        <div className="products">
          <div className="products-grid">
            {_products.length !== 0
              ? _products.map((product) => {
                  if (
                    selectedFilters.length !== 0 ||
                    selectedSizes.length !== 0
                  ) {
                    console.log(
                      selectedFilters,
                      product.type,
                      selectedSizes,
                      product.size,
                      selectedFilters.indexOf(product.type) !== -1 ||
                        arraysHaveCommonElement(selectedSizes, product.size)
                    );
                    if (
                      selectedFilters.indexOf(product.type) !== -1 ||
                      arraysHaveCommonElement(selectedSizes, product.size)
                    ) {
                      if (
                        selectedCategory == "view all" ||
                        selectedCategory == "_view all"
                      ) {
                        // console.log(product.size);
                        return (
                          <a
                            key={product._id}
                            href={`/products/${product.slug}`}
                            className="product"
                          >
                            <div className="img-container">
                              {product.images && (
                                <Image
                                  fill
                                  src={product.images[0].url}
                                  style={{ objectFit: "cover" }}
                                  alt={product.slug}
                                />
                              )}
                              <button type="button">
                                <AiOutlinePlus />
                              </button>
                            </div>
                            <div className="product-info">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          </a>
                        );
                      } else if (
                        selectedCategory == product.category &&
                        product.category == product.category
                      ) {
                        return (
                          <Link
                            key={product._id}
                            href={`/products/${product.slug}`}
                            className="product"
                          >
                            <div className="img-container">
                              {product.images && (
                                <Image
                                  fill
                                  src={product.images[0].url}
                                  style={{ objectFit: "cover" }}
                                  alt={product.slug}
                                />
                              )}
                            </div>
                            <div className="product-info">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          </Link>
                        );
                      }
                    }
                  } else {
                    console.log(
                      selectedCategory == product.category.name,
                      selectedCategory,
                      product.category,
                      product.category.name == product.category.name
                    );

                    if (
                      selectedCategory == "view all" ||
                      selectedCategory == "_view all"
                    ) {
                      // console.log(product.size);
                      return (
                        <a
                          key={product._id}
                          href={`/products/${product.slug}`}
                          className="product"
                        >
                          <div className="img-container">
                            {product.images && (
                              <Image
                                fill
                                src={product.images[0].url}
                                style={{ objectFit: "cover" }}
                                alt={product.slug}
                              />
                            )}
                            <button type="button">
                              <AiOutlinePlus />
                            </button>
                          </div>
                          <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>RS.{product.price}</p>
                          </div>
                        </a>
                      );
                    } else if (
                      selectedCategory == product.category &&
                      product.category == product.category
                    ) {
                      return (
                        <Link
                          key={product._id}
                          href={`/products/${product.slug}`}
                          className="product"
                        >
                          <div className="img-container">
                            {product.images && (
                              <Image
                                fill
                                src={product.images[0].url}
                                style={{ objectFit: "cover" }}
                                alt={product.slug}
                              />
                            )}
                          </div>
                          <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>RS.{product.price}</p>
                          </div>
                        </Link>
                      );
                    }
                  }
                })
              : products.map((product) => {
                  if (selectedCategory == "view all") {
                    // console.log(product.size);
                    return (
                      <a
                        key={product._id}
                        href={`/products/${product.slug}`}
                        className="product"
                      >
                        <div className="img-container">
                          {product.images && (
                            <Image
                              fill
                              src={product.images[0].url}
                              style={{ objectFit: "cover" }}
                              alt={product.slug}
                            />
                          )}
                          <button type="button">
                            <AiOutlinePlus />
                          </button>
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p>RS.{product.price}</p>
                        </div>
                      </a>
                    );
                  } else if (
                    selectedCategory == product.category &&
                    product.category == product.category
                  ) {
                    return (
                      <Link
                        key={product._id}
                        href={`/products/${product.slug}`}
                        className="product"
                      >
                        <div className="img-container">
                          {product.images && (
                            <Image
                              fill
                              src={product.images[0].url}
                              style={{ objectFit: "cover" }}
                              alt={product.slug}
                            />
                          )}
                        </div>
                        <div className="product-info">
                          <h3>{product.name}</h3>
                          <p>RS.{product.price}</p>
                        </div>
                      </Link>
                    );
                  }
                })}
          </div>
        </div>
        <div className="blank" />
      </div>
    </div>
  );
};

export default Products;
