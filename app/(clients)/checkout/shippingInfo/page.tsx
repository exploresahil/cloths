"use client";

import React, { useState } from "react";
import Select from "react-select";
import db from "@/backend/Backend.client";
import { CheckoutArrowNormal, OTPTick } from "@/components/icons/Icons";
import AccordionDown from "@/components/icons/AccordionDown";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { getUser } from "@/backend/User";

export default function ShippingInfo() {
  const router = useRouter();
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
  const [input, setInput] = useState({
    name: userData?.data.user_metadata.full_name,
    address: userData?.extra_data.address,
    locality: userData?.extra_data.locality,
    state: userData?.extra_data.state,
    pincode: userData?.extra_data.pincode,
    more_info: userData?.extra_data.more_info,
    city: userData?.extra_data.city,
    region: "India",
    phone: userData?.data.phone,
  });
  //console.log(userData?.data.user_metadata.full_name);

  const number_formatter_current = new Intl.NumberFormat("en", {
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
              THIS INFORMATION CAN BE ACCESSED AT <a href="/user">USER</a> PANEL
            </h2>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="shipping-info-form"
          >
            <div className="main">
              <div className="left">
                <div className="name">
                  <p>NAME</p>
                  <input
                    value={input.name}
                    onChange={(e) =>
                      setInput((data) => ({ ...data, name: e.target.value }))
                    }
                    type="text"
                    required
                  />
                </div>
                <div className="address">
                  <p>ADDRESS</p>
                  <input
                    type="text"
                    value={input.address}
                    onChange={(e) =>
                      setInput((data) => ({ ...data, address: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="locality">
                  <p>LOCALITY</p>
                  <input
                    type="text"
                    value={input.locality}
                    onChange={(e) =>
                      setInput((data) => ({
                        ...data,
                        locality: e.target.value,
                      }))
                    }
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
                    value={input.state}
                    onChange={(e) =>
                      setInput((data) => ({ ...data, state: e.value }))
                    }
                    isSearchable
                  />
                </div>
              </div>
              <div className="right">
                <div className="pincode">
                  <p>PINCODE</p>
                  <input
                    type="tel"
                    value={input.pincode}
                    maxLength={6}
                    onChange={(e) =>
                      setInput((data) => ({ ...data, pincode: e.target.value }))
                    }
                    required
                  />
                </div>
                <div className="more-info">
                  <p>MORE INFO</p>
                  <input
                    type="text"
                    value={input.more_info}
                    placeholder="OPTIONAL"
                    onChange={(e) =>
                      setInput((data) => ({
                        ...data,
                        more_info: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="city">
                  <p>CITY</p>
                  <input
                    type="text"
                    value={input.city}
                    onChange={(e) =>
                      setInput((data) => ({ ...data, city: e.target.value }))
                    }
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
                  value={input.phone}
                  onChange={(e) =>
                    setInput((data) => ({ ...data, phone: e.target.value }))
                  }
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
            <button
              onClick={() => {
                db.auth.updateUser({
                  data: {
                    full_name: input.name,
                  },
                  phone: "+91" + input.phone,
                });
                db.from("USER")
                  .update({
                    address: input.address,
                    locality: input.locality,
                    state: input.state,
                    pincode: input.pincode,
                    more_info: input.more_info,
                    city: input.city,
                    region: input.region,
                  })
                  .eq("id", userData.extra_data.id)
                  .then(async (data) => {
                    await getUser();
                    // console.log(data);

                    router.push("/checkout/shippingInfo/authorize");
                  });
              }}
            >
              <h3>PROCEED TO CHECKOUT</h3>
              <CheckoutArrowNormal />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
