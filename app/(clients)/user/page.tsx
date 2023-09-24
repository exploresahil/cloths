"use client";
import DB from "@/backend/Backend.client";
import Image from "next/image";
import React, { useState } from "react";
import productImage from "@/public/assets/images/products/product-img.png";
import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
const User = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("order");
  const [userData, setUserData] = useState<{ data: User; extra_data: any }>();
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);
  console.log(userData);

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
            <h2>{userData.data.user_metadata.full_name || ""}</h2>
            <div className="product-main-container">
              <div className="product-info">
                <div className="image-container">
                  <Image
                    fill
                    src={productImage}
                    style={{ objectFit: "cover" }}
                    alt="footer-logo"
                  />
                </div>
                <div className="item-info">
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
              <div className="product-info">
                <div className="image-container">
                  <Image
                    fill
                    src={productImage}
                    style={{ objectFit: "cover" }}
                    alt="footer-logo"
                  />
                </div>
                <div className="item-info">
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
              <div className="product-info">
                <div className="image-container">
                  <Image
                    fill
                    src={productImage}
                    style={{ objectFit: "cover" }}
                    alt="footer-logo"
                  />
                </div>
                <div className="item-info">
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
            </div>
          </div>
        )}
        {activeTab === "account" && (
          <div className="account-container menu-section">
            <h2>{userData.data.user_metadata.full_name || ""}</h2>
            <ul>
              <li>
                <Link href="#">
                  Addresses <ContactArrow />
                </Link>
                <p>{userData.extra_data.address}</p>
              </li>
              <li>
                <Link href="#">
                  Email <ContactArrow />
                </Link>
                <p>{userData.data.email}</p>
              </li>
              <li>
                <Link href="#">
                  Phone No <ContactArrow />
                </Link>
                <p>{userData.data.phone}</p>
              </li>
            </ul>
            <button
              type="button"
              onClick={async () => {
                await DB.auth.signOut();
                localStorage.clear();
                router.push("/login");
              }}
            >
              Sign Out
            </button>
          </div>
        )}
        {activeTab === "settings" && (
          <div className="settings-container menu-section">
            <h2>{userData.data.user_metadata.full_name || ""}</h2>
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
