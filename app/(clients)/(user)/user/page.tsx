"use client";
import DB from "@/backend/Backend.client";
import React, { useState, useEffect } from "react";
import productImage from "@/public/assets/images/products/product-img.png";
import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";
import CDB from "@/storeage";
import supabase from "@/backend/Backend.client";
import { useRouter } from "next/navigation";
import { reset } from "@/redux/reducer/cartSlice";
import { reset as Rest } from "@/redux/reducer/userSlice";
import { reset as _Rest } from "@/redux/reducer/userData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { addUserData } from "@/redux/reducer/userData";
import { getUser } from "@/backend/User";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("order");
  const [data, setData] = useState<any>([]);
  const userData = useAppSelector((state) => state.userDataSlice.value);
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    (async () => {
      const data: any = await CDB.getItem("user-data");

      if (data != undefined && data) {
        dispatch(addUserData(data));
        const orders = await supabase
          .from("Order")
          .select("*")
          .eq("user", data.extra_data?.id);
        setData(orders.data);
        //console.log("orders:", orders);
      } else {
        getUser().then(async (data) => {
          if (data?.data.user) {
            dispatch(addUserData(data));
            const orders = await supabase
              .from("Order")
              .select("*")
              .eq("user", data.extra_data?.id);
            setData(orders.data);
          }
        });
      }
      //console.log(data);
    })();
  }, []);

  function formatDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }
  return (
    userData && (
      <div className="user-main-container">
        <div className="user-menu">
          <button
            onClick={() => handleTabClick("order")}
            className={activeTab === "order" ? "active" : ""}
          >
            Orders
          </button>
          <button
            onClick={() => handleTabClick("account")}
            className={activeTab === "account" ? "active" : ""}
          >
            Account
          </button>
          <button
            onClick={() => handleTabClick("settings")}
            className={activeTab === "settings" ? "active" : ""}
          >
            Settings
          </button>
        </div>
        {activeTab === "order" && (
          <div className="order-container menu-section">
            <h2>{userData.data.user?.user_metadata?.full_name || ""}</h2>
            <h3>Orders:</h3>
            <div className="product-main-container">
              <div className="product-info">
                {data &&
                  data.map((item: any, id: any) => {
                    const orderAmount =
                      item.product?.reduce(
                        (accumulator: any, currentValue: any) =>
                          accumulator +
                          parseInt(currentValue.product.price) *
                            currentValue.how_many,
                        0
                      ) ?? 0;

                    const deliveryCharges =
                      orderAmount > 2550 ? "It's Free!" : 80;

                    const total =
                      orderAmount + (orderAmount > 2550 ? 0 : deliveryCharges);
                    return (
                      <div key={id} className="item-info">
                        <div className="order-number">
                          <p>Order ID: {item.order_id}</p>
                          <p>Ordered On: {formatDateTime(item.created_at)}</p>
                        </div>
                        <div className="items">
                          <div className="info">
                            {item.product.map((pro: any, id: any) => (
                              <h3>
                                {pro.product.name}{" "}
                                <span>{pro.product.size.at(0)}</span>
                              </h3>
                            ))}
                          </div>

                          <div className="total-amount">
                            <p>Rs. {total}</p>
                          </div>
                        </div>
                        <div className="order-address">
                          <p>Name: {item.name}</p>
                          <p>
                            Address: {item.address}, Locality: {item.locality},
                            City: {item.city}, Pincode: {item.pincode}, State:{" "}
                            {item.state}, More Info: {item.more_info}
                          </p>
                        </div>
                      </div>
                    );
                  })}{" "}
                {(!data || data.length === 0) && (
                  <p>No order found or Loading...</p>
                )}
              </div>
            </div>
          </div>
        )}
        {activeTab === "account" && (
          <div className="account-container menu-section">
            <h2>{userData.data.user?.user_metadata?.full_name || ""}</h2>
            <ul>
              <li>
                <Link href="#">
                  Email <ContactArrow />
                </Link>
                <p>{userData.data?.user?.email}</p>
              </li>
              <li>
                <Link href="#">
                  Phone No <ContactArrow />
                </Link>
                <p>{userData.data.user?.phone}</p>
              </li>
            </ul>
            <button
              type="button"
              onClick={async () => {
                await DB.auth.signOut();
                CDB.clear();
                dispatch(reset());
                dispatch(Rest());
                dispatch(_Rest());
                router.push("/login");
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="settings-container menu-section">
            <h2>{userData.data.user?.user_metadata?.full_name || ""}</h2>
            <ul>
              <li>
                <Link href="#">
                  Newsletter <ContactArrow />
                </Link>
                <p>Select your preferences for receiving updates via mail</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    )
  );
};

export default User;
