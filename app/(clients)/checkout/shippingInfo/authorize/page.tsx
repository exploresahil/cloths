"use client";

import Image from "next/image";

import { GrClose } from "react-icons/gr";
import AccordionDown from "@/components/icons/AccordionDown";
import { CheckoutArrowNormal } from "@/components/icons/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import { getProCart, RemoveCartOrder } from "@/backend/Cart";
import { products } from "@/types/Products";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeToCard } from "@/redux/reducer/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { makeOrder } from "@/backend/Order";
export default function Authorize() {
  const count = useAppSelector((state) => state.CardReducer.value);
  const dispatch = useAppDispatch();
  const UserAddress = useAppSelector((state) => state.userSlice.value);
  const [product, setProduct] = useState<null | any[]>(null);
  const router = useRouter();
  const [userData, setUser] = useState<null | any>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);

  useEffect(() => {
    if (userData)
      getProCart(userData.extra_data.id).then((data) => setProduct(data.data));
  }, [userData]);
  const current = new Date();
  //const next6 = current.setDate(new Date().getDate() + 6);

  const orderAmount =
    count?.reduce(
      (accumulator, currentValue) =>
        accumulator +
        parseInt(currentValue.product.price) * currentValue.how_many,
      0
    ) ?? 0;

  const deliveryCharges = orderAmount > 2550 ? "It's Free!" : 80;

  const total = orderAmount + (orderAmount > 2550 ? 0 : deliveryCharges);

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
                <h1>{userData.extra_data.name}</h1>
              </div>
              <div className="address">
                <h2 className="address-line">{UserAddress.at(-1)?.address},</h2>
                <h2 className="city">{UserAddress.at(-1)?.city}</h2>
                <h2 className="pincode"> - {UserAddress.at(-1)?.pincode}</h2>
                <h2 className="state">{UserAddress.at(-1)?.state}</h2>
                <h2 className="country">India</h2>
                <h2 className="phone">{UserAddress.at(-1)?.phone}</h2>
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
            {count &&
              count.map(
                (
                  v: { product: products; how_many: number; id: string },
                  i: any
                ) => (
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
                          getProCart(userData.extra_data.id).then((data) => {
                            dispatch(removeToCard(data.data));
                          });
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
                <p>Order Amount: Rs. {orderAmount}</p>
                <p>Delivery Charges: {deliveryCharges}</p>
              </span>
              <h3>Total: Rs. {total}</h3>
            </div>
          </div>
          <div className="line" />
          <div className="payment-button-container">
            <button type="button" onClick={() => {

              makeOrder(
                count,
                userData.extra_data.id,
                {

                  ...{ ...UserAddress.at(-1), name: undefined, id: undefined }
                }
              ).then((data) => {
                console.log(data);
                axios.post("/api/getPaymentGateway", {
                  price: total,
                  phoneNo: userData.extra_data.phone,
                  order_id: data.data[0].id
                }).then(({ data: Data }) => {
                  router.push(Data.data.instrumentResponse.redirectInfo.url)
                })


              })
            }}>
              {/* <button
              type="button"
              onClick={() => {
                makeOrder(count, userData.extra_data.id).then((data) => {
                  console.log(data);
                  axios
                    .post("/api/getPaymentGateway", {
                      price: total,
                      phoneNo: userData.extra_data.phone,
                      order_id: data.data[0].id,
                    })
                    .then(({ data: Data }) => {
                      router.push(
                        Data.data.instrumentResponse.redirectInfo.url
                      );
                    });
                });
              }}
            > */}
              <h3>AUTHORIZE PAYMENT</h3>
              <CheckoutArrowNormal />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 
Delivery Time: 5 to 7 working days
Delivery Amount: 80
*/
