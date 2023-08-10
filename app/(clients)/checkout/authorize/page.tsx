"use client";

import Image from "next/image";

import ProductImage from "@/public/assets/images/products/product-img.png";
import { GrClose } from "react-icons/gr";
import AccordionDown from "@/components/icons/AccordionDown";
import { CheckoutArrowNormal } from "@/components/icons/Icons";

export default function Authorize() {
  return (
    <div className="authorize-container">
      <div className="authorize-main">
        <div className="delivery-container">
          <div className="delivery-type">
            <h1>DELIVERY</h1>
            <h2>
              STANDARD HOME SHIPPING ~ WEDNESDAY 24, MAY - THURSDAY 25, MAY
            </h2>
          </div>
          <p className="delivery-offer">
            Free shipping for orders over Rs. 2,990.
          </p>
          <a className="delivery-type-edit" href="/">
            edit
          </a>
        </div>
        <div className="delivery-address-container">
          <div className="delivery-address-main">
            <div className="name">
              <h1>Sanyukta Adhikary</h1>
            </div>
            <div className="address">
              <h2 className="address-line">UTTARAYAN, VIDHYA NAGAR,</h2>
              <h2 className="city">BILASPUR</h2>
              <h2 className="pincode"> - 495004</h2>
              {/* <h2 className="state">Chhattisgarh</h2> */}
              <h2 className="country">India</h2>
              <h2 className="phone">+91-7974139701</h2>
            </div>
          </div>
          <a className="delivery-address-edit" href="/">
            edit
          </a>
        </div>
      </div>
      <div className="authorize-payment-container">
        <div className="authorize-payment-cart">
          <div className="cart-products">
            <div className="cart-items">
              <div className="cart-product-info">
                <div className="image-container">
                  <Image
                    fill
                    src={ProductImage}
                    style={{ objectFit: "cover" }}
                    alt="product-image"
                  />
                </div>
                <div className="cart-item-info">
                  <div className="info">
                    <h3>striped shirt kurta</h3>
                    <p>rs 850</p>
                  </div>
                  <div className="item-filter">
                    <p>M</p>
                    <p>1</p>
                  </div>
                </div>
              </div>
              <button>
                <GrClose />
              </button>
              <div className="line" />
            </div>
            <div className="cart-items">
              <div className="cart-product-info">
                <div className="image-container">
                  <Image
                    fill
                    src={ProductImage}
                    style={{ objectFit: "cover" }}
                    alt="product-image"
                  />
                </div>
                <div className="cart-item-info">
                  <div className="info">
                    <h3>striped shirt kurta</h3>
                    <p>rs 850</p>
                  </div>
                  <div className="item-filter">
                    <p>M</p>
                    <p>1</p>
                  </div>
                </div>
              </div>
              <button>
                <GrClose />
              </button>
              <div className="line" />
            </div>
          </div>
        </div>
        <div className="authorize-payment-bottom-container">
          <div className="price-container">
            <div className="text">
              <h3>Rs. 2,995</h3>
              <p>+EXCL.SHIPPING</p>
            </div>
            <AccordionDown />
          </div>
          <div className="line" />
          <div className="payment-button-container">
            <button type="button">
              <h3>AUTHORIZE PAYMENT</h3>
              <CheckoutArrowNormal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
