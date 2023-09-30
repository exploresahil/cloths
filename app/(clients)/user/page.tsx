"use client";
import DB from "@/backend/Backend.client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import productImage from "@/public/assets/images/products/product-img.png";
import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";
import CDB from "@/storeage"
import { User as user } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { reset } from "@/redux/reducer/cartSlice";
import { reset as Rest } from "@/redux/reducer/userSlice";
import { reset as _Rest } from "@/redux/reducer/userData";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hook";
import { addUserData } from "@/redux/reducer/userData";

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("order");
  const userData = useAppSelector(state => state.userDataSlice.value)
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  useEffect(() => {
    (async () => {
      const data = await CDB.getItem("user-data");

      if (data != undefined) dispatch(addUserData(data))
      console.log(data);
    })();

  }, [])
  console.log("userdata", userData);



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
            <div className="product-main-container">
              <div className="product-info">
                <div className="item-info">
                  <div className="order-number">
                    <p>Order ID: { }</p>
                  </div>
                  <div className="items">
                    <div className="info">
                      <h3>
                        striped shirt kurta <span>M</span>
                      </h3>
                      <h3>
                        striped shirt kurta <span>M</span>
                      </h3>
                      <h3>
                        striped shirt kurta <span>M</span>
                      </h3>
                    </div>
                    <div className="total-amount">
                      <p>Rs. 121</p>
                    </div>
                  </div>
                  <div className="order-address">
                    <p>Address: { }</p>
                  </div>
                </div>
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
                dispatch(_Rest())
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
