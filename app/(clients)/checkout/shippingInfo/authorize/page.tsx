"use client";

import Image from "next/image";

import { GrClose } from "react-icons/gr";
import AccordionDown from "@/components/icons/AccordionDown";
import { CheckoutArrowNormal } from "@/components/icons/Icons";
import { AiOutlinePlus } from "react-icons/ai";
import { deleteAllCartProduct, getProCart, RemoveCartOrder, UpdateCartOrder } from "@/backend/Cart";
import { products } from "@/types/Products";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeToCard, _reset } from "@/redux/reducer/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { makeOrder } from "@/backend/Order";
import { updateCardRedx } from "@/backend/User";
import { getProduct_by_id } from "@/sanity/sanity-utils";
export default function Authorize() {
  const count = useAppSelector((state) => state.CardReducer.value);
  const dispatch = useAppDispatch();
  const UserAddress = useAppSelector((state) => state.userSlice.value);
  const [product, setProduct] = useState<any[]>([]);
  const router = useRouter();
  const userData = useAppSelector((state) => state.userDataSlice.value)
  const [isAva, setAva] = useState<any[]>([])
  // const [Product,setProduct] = ise

  useEffect(() => {
    if (count.length !== 0) {
      // getProCart(userData.extra_data.id).then((data) => setProduct(data.data));
      count.map((v, i) => {
        getProduct_by_id(v.product._id).then((data: any) => {
          console.log(data[0].isAvailable);
          let pro = { product: { ...v.product, isAvailable: data[0].isAvailable }, ...v }
          // v.product.isAvailable = data[0].isAvailable;
          setProduct(prv => [...prv, pro])
        })
      })


    }
  }, [count]);
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
            {(product && product.length !== 0) &&
              product.map(
                (
                  v: { product: products; how_many: number; id: string },
                  i: any
                ) => {



                  return (
                    <div className="cart-items">
                      <div className="cart-product-info">
                        {v.product.isAvailable && <p>out of stock</p>}
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
                }
              )}
          </div>
        </div>
        <div className="authorize-payment-bottom-container">
          <div className="price-container">
            <div className="text">
              <span>
                {/* ok */}
                <p>Order Amount: Rs. {orderAmount}</p>
                <p>Delivery Charges: {deliveryCharges}</p>
              </span>
              <h3>Total: Rs. {total}</h3>
            </div>
          </div>
          <div className="line" />
          <div className="payment-button-container">
            <button
              type="button"

              onClick={() => {
                makeOrder(count, userData.extra_data.id, {
                  ...{ ...UserAddress.at(-1), id: undefined },
                }).then((data) => {
                  axios
                    .post("/api/getPaymentGateway", {
                      price: total,
                      phoneNo: UserAddress.at(-1)?.phone,
                      order_id: data.data[0].id,
                    })
                    .then(({ data: Data }) => {
                      console.log(Data.data);
                      deleteAllCartProduct(userData.extra_data.id).then(() => {

                        dispatch(_reset());
                        router.push(
                          Data.data.instrumentResponse.redirectInfo.url
                        );
                      })

                      // updateCardRedx(userData.extra_data.id);



                    });
                });
              }}
            >
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
