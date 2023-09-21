"use client";
//2550
import Image from "next/image";

import ProductImage from "@/public/assets/images/products/product-img.png";
import { GrClose } from "react-icons/gr";
import AccordionDown from "@/components/icons/AccordionDown";
import { CheckoutArrowNormal } from "@/components/icons/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import { getProCart, RemoveCartOrder } from "@/backend/Cart";
import { products } from "@/types/Products";
import { useAppDispatch } from "@/redux/hook";
import { decrement } from "@/redux/reducer/cartSlice";
import { useEffect, useState } from "react";

export default function Authorize() {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<null | any[]>(null);
  const [userData, setUser] = useState<null | any>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);

  useEffect(() => {
    if (userData)
      getProCart(userData.extra_data.id).then((data) => setProduct(data.data));
  }, [userData]);

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
        </div>
        <div className="delivery-address-container">
          <div className="delivery-address-main">
            <h1>Dilivery Address</h1>
            <div className="name">
              <h1>Sanyukta Adhikary</h1>
            </div>
            <div className="address">
              <h2 className="address-line">UTTARAYAN, VIDHYA NAGAR,</h2>
              <h2 className="city">BILASPUR</h2>
              <h2 className="pincode"> - 495004</h2>
              <h2 className="state">Chhattisgarh</h2>
              <h2 className="country">India</h2>
              <h2 className="phone">+91-7974139701</h2>
            </div>
          </div>
          <a className="delivery-address-edit" href="/">
            Edit
          </a>
        </div>
      </div>
      <div className="authorize-payment-container">
        <div className="authorize-payment-cart">
          <div className="cart-products">
            {product &&
              product.map(
                (v: { product: products; how_many: number; id: string }, i) => (
                  <div className="cart-items">
                    <div className="cart-product-info">
                      <div className="image-container">
                        <Image
                          fill
                          src={v.product.images[0].url}
                          style={{ objectFit: "cover" }}
                          alt="product-image"
                        />
                      </div>
                      <div className="cart-item-info">
                        <div className="info">
                          <h3>{v.product.name}</h3>
                          <p>rs {v.product.price}</p>
                        </div>
                        <div className="item-filter">
                          <p>M</p>
                          <p>{v.how_many}</p>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        RemoveCartOrder(v.id).then(() => {
                          getProCart(userData.extra_data.id).then((data) =>
                            setProduct(data.data)
                          );
                          dispatch(decrement());
                        });
                      }}
                    >
                      <GrClose />
                    </button>
                    <div className="line" />
                  </div>
                )
              )}
          </div>
        </div>
        <div className="authorize-payment-bottom-container">
          <div className="price-container">
            <div className="text">
              <h3>Rs. 2,995</h3>
              <span>
                <AiOutlinePlus />
                <p>EXCL.SHIPPING</p>
              </span>
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
