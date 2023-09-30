"use client";

import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCard } from "@/redux/reducer/cartSlice";
import { AiFillPlusCircle, AiOutlinePlus } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { PiRulerLight } from "react-icons/pi";
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { products } from "@/types/Products";
import { getProduct, getProducts } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { ScrollArrow } from "@/components/icons/Icons";
import { AddCartOrder, getProCart } from "@/backend/Cart";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  params: { product: any };
};

export default function Product({ params }: Props) {
  const count = useAppSelector((state) => state.CardReducer.value);
  const userAddress = useAppSelector((state) => state.userSlice.value);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<products>();
  const [relatedProducts, setRelatedProducts] = useState<products[]>([]);
  const [randomProducts, setRandomProducts] = useState<products[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const userData = useAppSelector(state => state.userDataSlice.value)
  const slug = params.product;



  useEffect(() => {
    getProduct(slug).then((data) => {
      setProduct(data);
    });
  }, [slug]);

  useEffect(() => {
    async function fetchRelatedProducts() {
      const relatedProducts = await getProducts();
      setRelatedProducts(relatedProducts);
    }

    fetchRelatedProducts();

    console.log(relatedProducts);
  }, []);

  useEffect(() => {
    // Shuffle the relatedProducts array to randomize the order
    const shuffledProducts = [...relatedProducts];
    for (let i = shuffledProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledProducts[i], shuffledProducts[j]] = [
        shuffledProducts[j],
        shuffledProducts[i],
      ];
    }

    // Select the first 3 products from the shuffled array
    const selectedRandomProducts = shuffledProducts.slice(0, 3);

    // Set the random products to state
    setRandomProducts(selectedRandomProducts);
  }, [relatedProducts]);

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % (product?.images?.length ?? 0)
    );
  };

  let firstImageSrc = "";
  if (product && product.images.length >= 2) {
    firstImageSrc = product.images[currentImageIndex].url;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget as HTMLElement;
    const image = container.querySelector(".zoomed-image") as HTMLImageElement;

    if (image) {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const scaleX = width / image.offsetWidth;
      const scaleY = height / image.offsetHeight;

      image.style.transformOrigin = `${x}px ${y}px`;
      image.style.transform = `scale(${scaleX}, ${scaleY})`;
    }
  };

  const handleMouseLeave = () => {
    const image = document.querySelector(".zoomed-image") as HTMLElement;

    if (image) {
      image.style.transform = "scale(1)";
    }
  };

  const handleAddToCart = (product: any) => {
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
  };

  return (
    <>
      {product && (
        <div className="product-slug-main">
          <div className="product-container">
            <div className="product-info">
              <h2>{product.name}</h2>
              <div className="product-details">
                <PortableText value={product.details} />
              </div>
              <div className="product-info-price-size">
                <p>Rs {product.price}</p>
                {product.size.includes("S") && <button>S</button>}
                {product.size.includes("M") && <button>M</button>}
                {product.size.includes("L") && <button>L</button>}
              </div>
              <Link href="#">
                <PiRulerLight /> Size Guide
              </Link>
              <div className="scroller">
                <ScrollArrow />
                <p>Product Info</p>
              </div>
            </div>
            <div className="product-images">
              <div key={product._id} className="img-container">
                <div
                  className="image-zoom-container"
                  onMouseMove={(e) => handleMouseMove(e)}
                  onMouseLeave={() => handleMouseLeave()}
                >
                  <Image
                    fill
                    src={firstImageSrc}
                    style={{ objectFit: "cover" }}
                    alt="logo"
                    className="zoomed-image"
                  />
                </div>
              </div>
              <div key={product._id} className="img-container">
                <Image
                  fill
                  src={
                    product.images[
                      (currentImageIndex + 1) % product.images.length
                    ].url
                  }
                  style={{ objectFit: "cover" }}
                  alt="logo"
                />
              </div>
              <button type="button" className="next" onClick={handleNextImage}>
                <HiArrowLongRight />
              </button>
            </div>
            <div className="buy-now-container">
              <button
                type="button"
                onClick={() => {
                  handleAddToCart(product);
                }}
              >
                <AiFillPlusCircle />
              </button>
              <div className="line" />
              <button
                type="button"
                className="button"
                onClick={() => {
                  AddCartOrder(product, userData.extra_data.id, 1).then(
                    (data) => {
                      getProCart(userData.extra_data.id).then((data) => {
                        dispatch(addToCard(data.data));

                        router.push(
                          userAddress.length != 0
                            ? "/checkout/shippingInfo/authorize"
                            : "/checkout/shippingInfo/"
                        );
                      });
                    }
                  );
                }}
              >
                Buy Now <BsArrowRight />
              </button>
            </div>
          </div>
          <div className="description-container">
            <h2>Description</h2>
            <PortableText value={product.description} />
          </div>
          <div className="related-products-main">
            <h2>Related Products</h2>

            <div className="products-grid">
              {randomProducts.map((randomProduct) => (
                <div className="product-sec" key={randomProduct._id}>
                  <Link
                    href={`/products/${randomProduct.slug}`}
                    className="product"
                  >
                    <div className="img-container">
                      {randomProduct.images && (
                        <Image
                          fill
                          src={randomProduct.images[0].url}
                          style={{ objectFit: "cover" }}
                          alt={randomProduct.slug}
                        />
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{randomProduct.name}</h3>
                      <p>RS.{randomProduct.price}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      // console.log("hi", "", product, userData);

                      AddCartOrder(product, userData.extra_data.id, 1).then(
                        (data) => {
                          getProCart(userData.extra_data.id).then((data) => {
                            dispatch(addToCard(data.data));
                          });
                        }
                      );
                    }}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
