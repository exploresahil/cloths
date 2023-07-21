"use client";

import Image from "next/image";
import { useState } from "react";
import productImage from "@/public/assets/images/products/product-img.png";
import ContactArrow from "@/components/icons/ContactArrow";
import Link from "next/link";

const User = () => {
  const [activeTab, setActiveTab] = useState("order");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
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
          <h2>SANYUKTA ADHIKARY</h2>
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
          <h2>SANYUKTA ADHIKARY</h2>
          <ul>
            <li>
              <Link href="#">
                Addresses <ContactArrow />
              </Link>
            </li>
            <li>
              <Link href="#">
                Email <ContactArrow />
              </Link>
              <p>email@email.com</p>
            </li>
            <li>
              <Link href="#">
                Phone No <ContactArrow />
              </Link>
              <p>+91-79741-39701</p>
            </li>
          </ul>
          <button type="button">Sign Out</button>
        </div>
      )}
      {activeTab === "settings" && (
        <div className="settings-container menu-section">
          <h2>SANYUKTA ADHIKARY</h2>
          <ul>
            <li>
              <Link href="#">
                Newsletter <ContactArrow />
              </Link>
              <p>Select your preferences for receiving updates via mail</p>
            </li>
            <li>
              <Link href="#">
                Cookie Settings <ContactArrow />
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;
