"use client";

import React from "react";
import Select from "react-select";

import {
  CheckoutArrowNormal,
  OTPTick,
} from "@/components/icons/Icons";
import AccordionDown from "@/components/icons/AccordionDown";

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

  return (
    <div className="shipping-info-container">
      <div className="shipping-info-main">
        <div className="shipping-info">
          <h1>ENTER YOUR SHIPPING INFORMATION BELOW</h1>
          <h2>
            THIS INFORMATION CAN BE ACCESSED OR UPDATED AT <a href="/">USER</a>{" "}
            PANEL
          </h2>
        </div>
        <form className="shipping-info-form">
          <div className="main">
            <div className="left">
              <div className="name">
                <p>NAME</p>
                <input type="text" required />
              </div>
              <div className="address">
                <p>ADDRESS</p>
                <input type="text" required />
              </div>
              <div className="locality">
                <p>LOCALITY</p>
                <input type="text" required />
              </div>
              <div className="state">
                <p>STATE</p>
                <Select
                  required
                  className="state-select-container"
                  classNamePrefix="state-select"
                  options={stateOptions}
                  isSearchable
                />
              </div>
            </div>
            <div className="right">
              <div className="pincode">
                <p>PINCODE</p>
                <input type="tel" maxLength={6} required />
              </div>
              <div className="more-info">
                <p>MORE INFO</p>
                <input type="text" placeholder="OPTIONAL" />
              </div>
              <div className="city">
                <p>CITY</p>
                <input type="text" required />
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
              <input type="tel" maxLength={10} required />
              <div className="otp">
                <input
                  id="otp"
                  type="tel"
                  maxLength={6}
                  placeholder="OTP"
                  required
                />
                <OTPTick />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="proceed-to-checkout-container">
        <div className="price-container">
          <div className="text">
            <h3>Rs. 2,995</h3>
            <p>+EXCL.SHIPPING</p>
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
  );
}
