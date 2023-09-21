"use client";

import Image from "next/image";
import Link from "next/link";

import { AiFillPlusCircle } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import { PiRulerLight } from "react-icons/pi";
import { HiArrowLongRight } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { products } from "@/types/Products";
import { getProduct } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { ScrollArrow } from "@/components/icons/Icons";
import { AddCartOrder } from "@/backend/Cart";

type Props = {
  params: { product: any };
};

export default function Product({ params }: Props) {
  const [product, setProduct] = useState<products>();
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [userData, setUser] = useState<null | any>(null);
  const slug = params.product;
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);
  useEffect(() => {
    getProduct(slug).then((data) => {
      setProduct(data);
    });
  }, [slug]);

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
                <button>S</button>
                <button>M</button>
                <button>L</button>
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
                  AddCartOrder(product, userData.extra_data.id, 1).then(
                    (data) => {
                      console.log(data.data);
                    }
                  );
                }}
              >
                <AiFillPlusCircle />
              </button>
              <div className="line" />
              <button>
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
          </div>
        </div>
      )}
    </>
  );
}
