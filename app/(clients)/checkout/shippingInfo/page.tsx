"use client";

import React, { useState } from "react";
import Select from "react-select";

import { CheckoutArrowNormal, OTPTick } from "@/components/icons/Icons";
import AccordionDown from "@/components/icons/AccordionDown";
import { User } from "@supabase/supabase-js";

export default function ShippingInfo() {
  const stateOptions: any = [
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Delhi", label: "Delhi" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Puducherry", label: "Puducherry" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
  ];
  const [userData, setUserData] = useState<{ data: User; extra_data: any }>();
  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);
  console.log(userData?.data.user_metadata.full_name);

  const number_formatter_current = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "inr",
  });
  return (
    userData && (
      <div className="shipping-info-container">
        <div className="shipping-info-main">
          <div className="shipping-info">
            <h1>ENTER YOUR SHIPPING INFORMATION BELOW</h1>
            <h2>
              THIS INFORMATION CAN BE ACCESSED OR UPDATED AT{" "}
              <a href="/">USER</a> PANEL
            </h2>
          </div>
          <form className="shipping-info-form">
            <div className="main">
              <div className="left">
                <div className="name">
                  <p>NAME</p>
                  <input
                    value={userData.data.user_metadata.full_name}
                    type="text"
                    required
                  />
                </div>
                <div className="address">
                  <p>ADDRESS</p>
                  <input
                    type="text"
                    value={userData.extra_data.address}
                    required
                  />
                </div>
                <div className="locality">
                  <p>LOCALITY</p>
                  <input
                    type="text"
                    value={userData.extra_data.locality}
                    required
                  />
                </div>
                <div className="state">
                  <p>STATE</p>
                  <Select
                    required
                    className="state-select-container"
                    classNamePrefix="state-select"
                    options={stateOptions}
                    value={userData.extra_data.state}
                    isSearchable
                  />
                </div>
              </div>
              <div className="right">
                <div className="pincode">
                  <p>PINCODE</p>
                  <input
                    type="tel"
                    value={userData.extra_data.pincode}
                    maxLength={6}
                    required
                  />
                </div>
                <div className="more-info">
                  <p>MORE INFO</p>
                  <input
                    type="text"
                    value={userData.extra_data.more_info}
                    placeholder="OPTIONAL"
                  />
                </div>
                <div className="city">
                  <p>CITY</p>
                  <input
                    type="text"
                    value={userData.extra_data.city}
                    required
                  />
                </div>
                <div className="region">
                  <p>REGION</p>
                  <input type="text" value="India" readOnly />
                </div>
              </div>
            </div>
            <div className="phone">
              <div className="code">
                <p>CODE</p>
                <input type="text" value="+91" readOnly />
              </div>
              <div className="telephone">
                <p>TELEPHONE</p>
                <input
                  type="tel"
                  maxLength={10}
                  value={userData.data.phone}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="proceed-to-checkout-container">
          <div className="price-container">
            <div className="text">
              <h4>MRP {number_formatter_current.format(2995)}</h4>
              <h5>Delivery {number_formatter_current.format(500)}</h5>
              <p>Total {number_formatter_current.format(2995 + 500)} </p>
            </div>
            <AccordionDown />
          </div>
          <div className="line" />
          <div className="checkout-button-container">
            <button type="button">
              <h3>PROCEED TO CHECKOUT</h3>
              <CheckoutArrowNormal />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
