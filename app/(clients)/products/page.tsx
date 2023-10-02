"use client";

import Filter from "@/components/client/Filter";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCard } from "@/redux/reducer/cartSlice";
import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories, getProducts } from "@/sanity/sanity-utils";
import { products } from "@/types/Products";
import { category } from "@/types/Category";
import { AiOutlinePlus } from "react-icons/ai";
import { useSearchParams } from "next/navigation";
import { AddCartOrder, getProCart } from "@/backend/Cart";
import { toast } from "react-toastify";

function arraysHaveCommonElement(array1: any[], array2: any[]) {
  return array1.some((item) => array2.includes(item));
}
const Products = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.CardReducer.value);
  const userData = useAppSelector((state) => state.userDataSlice.value);
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
  }, []);

  console.log("Products -->", products);

  useEffect(() => {
    set_Products((_products) => {
      if (searchQuery && selectedCategory === "_view all") {
        const filteredProducts = products.filter((product) =>
          product.searchTags.current
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );

        return filteredProducts;
      } else {
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

  const handleAddToCart = (product: any) => {
    if (userData.data.user)
      AddCartOrder(product, userData.extra_data.id, 1).then(() => {
        getProCart(userData.extra_data.id).then((data) => {
          dispatch(addToCard(data.data));
          toast.success("Product Added", {
            theme: "colored",
            autoClose: 800,
            hideProgressBar: true,
          });
        });
      });
    else
      toast.error("You Must Login First", {
        theme: "colored",
        autoClose: 1500,
        hideProgressBar: true,
      });
  };

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
                  if (product.isAvailable)
                    if (
                      selectedFilters.length !== 0 ||
                      selectedSizes.length !== 0
                    ) {
                      if (
                        selectedFilters.indexOf(product.type) !== -1 ||
                        arraysHaveCommonElement(selectedSizes, product.size)
                      ) {
                        if (
                          selectedCategory == "view all" ||
                          selectedCategory == "_view all"
                        ) {
                          return (
                            <div className="product-sec">
                              <Link
                                key={product._id}
                                href={`/products/${product.slug}`}
                                className={`product ${
                                  product.isAvailable ? "" : "product-link-out"
                                }`}
                              >
                                <div className="img-container">
                                  {product.images && (
                                    <Image
                                      fill
                                      src={product.images[0].url}
                                      style={{ objectFit: "cover" }}
                                      alt={product.slug}
                                      sizes="100%"
                                    />
                                  )}
                                  {!product.isAvailable && (
                                    <div className="out-of-stack">
                                      <p>Out Of Stock</p>
                                    </div>
                                  )}
                                </div>

                                {(!product.isAvailable && (
                                  <div className="product-info info-out">
                                    <h3>{product.name}</h3>
                                    <p>RS.{product.price}</p>
                                  </div>
                                )) || (
                                  <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>RS.{product.price}</p>
                                  </div>
                                )}
                              </Link>
                              {product.isAvailable && (
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(product)}
                                  disabled={!product.isAvailable}
                                >
                                  <AiOutlinePlus />
                                </button>
                              )}
                            </div>
                          );
                        } else if (
                          selectedCategory == product.category.name &&
                          product.category == product.category
                        ) {
                          return (
                            <div className="product-sec">
                              <Link
                                key={product._id}
                                href={`/products/${product.slug}`}
                                className={`product ${
                                  product.isAvailable ? "" : "product-link-out"
                                }`}
                              >
                                <div className="img-container">
                                  {product.images && (
                                    <Image
                                      fill
                                      src={product.images[0].url}
                                      style={{ objectFit: "cover" }}
                                      alt={product.slug}
                                      sizes="100%"
                                    />
                                  )}
                                  {!product.isAvailable && (
                                    <div className="out-of-stack">
                                      <p>Out Of Stock</p>
                                    </div>
                                  )}
                                </div>

                                {(!product.isAvailable && (
                                  <div className="product-info info-out">
                                    <h3>{product.name}</h3>
                                    <p>RS.{product.price}</p>
                                  </div>
                                )) || (
                                  <div className="product-info">
                                    <h3>{product.name}</h3>
                                    <p>RS.{product.price}</p>
                                  </div>
                                )}
                              </Link>
                              {product.isAvailable && (
                                <button
                                  type="button"
                                  onClick={() => handleAddToCart(product)}
                                  disabled={!product.isAvailable}
                                >
                                  <AiOutlinePlus />
                                </button>
                              )}
                            </div>
                          );
                        }
                      }
                    } else {
                      if (
                        selectedCategory == "view all" ||
                        selectedCategory == "_view all"
                      ) {
                        // console.log(product.size);
                        return (
                          <div className="product-sec">
                            <Link
                              key={product._id}
                              href={`/products/${product.slug}`}
                              className={`product ${
                                product.isAvailable ? "" : "product-link-out"
                              }`}
                            >
                              <div className="img-container">
                                {product.images && (
                                  <Image
                                    fill
                                    src={product.images[0].url}
                                    style={{ objectFit: "cover" }}
                                    alt={product.slug}
                                    sizes="100%"
                                  />
                                )}
                                {!product.isAvailable && (
                                  <div className="out-of-stack">
                                    <p>Out Of Stock</p>
                                  </div>
                                )}
                              </div>
                              {(!product.isAvailable && (
                                <div className="product-info info-out">
                                  <h3>{product.name}</h3>
                                  <p>RS.{product.price}</p>
                                </div>
                              )) || (
                                <div className="product-info">
                                  <h3>{product.name}</h3>
                                  <p>RS.{product.price}</p>
                                </div>
                              )}
                            </Link>
                            {product.isAvailable && (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.isAvailable}
                              >
                                <AiOutlinePlus />
                              </button>
                            )}
                          </div>
                        );
                      } else if (
                        selectedCategory == product.category.name &&
                        product.category == product.category
                      ) {
                        return (
                          <div className="product-sec">
                            <Link
                              key={product._id}
                              href={`/products/${product.slug}`}
                              className={`product ${
                                product.isAvailable ? "" : "product-link-out"
                              }`}
                            >
                              <div className="img-container">
                                {product.images && (
                                  <Image
                                    fill
                                    src={product.images[0].url}
                                    style={{ objectFit: "cover" }}
                                    alt={product.slug}
                                    sizes="100%"
                                  />
                                )}
                                {!product.isAvailable && (
                                  <div className="out-of-stack">
                                    <p>Out Of Stock</p>
                                  </div>
                                )}
                              </div>
                              {(!product.isAvailable && (
                                <div className="product-info info-out">
                                  <h3>{product.name}</h3>
                                  <p>RS.{product.price}</p>
                                </div>
                              )) || (
                                <div className="product-info">
                                  <h3>{product.name}</h3>
                                  <p>RS.{product.price}</p>
                                </div>
                              )}
                            </Link>

                            {product.isAvailable && (
                              <button
                                type="button"
                                onClick={() => handleAddToCart(product)}
                                disabled={!product.isAvailable}
                              >
                                <AiOutlinePlus />
                              </button>
                            )}
                          </div>
                        );
                      }
                    }
                })
              : products.map((product) => {
                  if (selectedCategory == "view all") {
                    // console.log(product.size);
                    return (
                      <div className="product-sec">
                        <Link
                          key={product._id}
                          href={`/products/${product.slug}`}
                          className={`product ${
                            product.isAvailable ? "" : "product-link-out"
                          }`}
                        >
                          <div className="img-container">
                            {product.images && (
                              <Image
                                fill
                                src={product.images[0].url}
                                style={{ objectFit: "cover" }}
                                alt={product.slug}
                                sizes="100%"
                              />
                            )}
                            {!product.isAvailable && (
                              <div className="out-of-stack">
                                <p>Out Of Stock</p>
                              </div>
                            )}
                          </div>
                          {(!product.isAvailable && (
                            <div className="product-info info-out">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          )) || (
                            <div className="product-info">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          )}
                        </Link>
                        {product.isAvailable && (
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.isAvailable}
                          >
                            <AiOutlinePlus />
                          </button>
                        )}
                      </div>
                    );
                  } else if (
                    selectedCategory == product.category.name &&
                    product.category == product.category
                  ) {
                    return (
                      <div className="product-sec">
                        <Link
                          key={product._id}
                          href={`/products/${product.slug}`}
                          className={`product ${
                            product.isAvailable ? "" : "product-link-out"
                          }`}
                        >
                          <div className="img-container">
                            {product.images && (
                              <Image
                                fill
                                src={product.images[0].url}
                                style={{ objectFit: "cover" }}
                                alt={product.slug}
                                sizes="100%"
                              />
                            )}
                            {!product.isAvailable && (
                              <div className="out-of-stack">
                                <p>Out Of Stock</p>
                              </div>
                            )}
                          </div>
                          {(!product.isAvailable && (
                            <div className="product-info info-out">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          )) || (
                            <div className="product-info">
                              <h3>{product.name}</h3>
                              <p>RS.{product.price}</p>
                            </div>
                          )}
                        </Link>
                        {product.isAvailable && (
                          <button
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            disabled={!product.isAvailable}
                          >
                            <AiOutlinePlus />
                          </button>
                        )}
                      </div>
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
