"use client";

import Image from "next/image";

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
  const current = new Date();
  const next6 = current.setDate(new Date().getDate() + 6);

  return (
    <div className="authorize-container">
      <div className="authorize-main">
        <div className="delivery-container">
          <div className="delivery-type">
            <h1>DELIVERY</h1>
            <h2>
              STANDARD HOME SHIPPING ~{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long", // or 'short' or 'narrow'
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              ,{" "}
              {current.toLocaleDateString("en-US", {
                weekday: "long", // or 'short' or 'narrow'
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h2>
          </div>
          <p className="delivery-offer">
            Free shipping for orders over Rs.{" "}
            {/* {product
              ?.map((v) => parseInt(v.product.price))
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )} */}
            2550
          </p>
        </div>
        {userData && (
          <div className="delivery-address-container">
            <div className="delivery-address-main">
              <h1>Dilivery Address</h1>
              <div className="name">
                <h1>{userData.data.user_metadata.full_name}</h1>
              </div>
              <div className="address">
                <h2 className="address-line">{userData.extra_data.address},</h2>
                <h2 className="city">{userData.extra_data.city}</h2>
                <h2 className="pincode"> - {userData.extra_data.pincode}</h2>
                <h2 className="state">{userData.extra_data.state}</h2>
                <h2 className="country">India</h2>
                <h2 className="phone">+{userData.data.phone}</h2>
              </div>
            </div>
            <a className="delivery-address-edit" href="/checkout/shippingInfo">
              Edit
            </a>
          </div>
        )}
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
              <span>
                <p>
                  Order Amount: Rs.{" "}
                  {product
                    ?.map((v) => parseInt(v.product.price))
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    )}
                </p>
                <p>Dilivery Charges:{}</p>
              </span>
              <h3>Total: Rs. {}</h3>
            </div>
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
