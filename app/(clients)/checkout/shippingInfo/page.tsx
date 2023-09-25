"use client";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import db from "@/backend/Backend.client";
import { CheckoutArrowNormal, OTPTick } from "@/components/icons/Icons";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { getUser, updateRedx } from "@/backend/User";
import { getProCart } from "@/backend/Cart";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { addUserAddress } from "@/redux/reducer/userSlice";
import Supabase from "@/backend/Backend.client";
export default function ShippingInfo() {
  const count = useAppSelector((state) => state.CardReducer.value);
  const UserAddress = useAppSelector((state) => state.userSlice.value);
  const dispatch = useAppDispatch();
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
  const [product, setProduct] = useState<null | any[]>(null);

  const [userData, setUserData] = useState<{ data: User; extra_data: any }>();
  useEffect(() => {
    if (userData)
      getProCart(userData.extra_data.id).then((data: any) =>
        setProduct(data.data)
      );
  }, [userData]);

  const [input, setInput] = useState<any>();
  React.useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);
  useEffect(() => {
    setInput({
      name: userData?.extra_data.name,
      address: UserAddress.at(-1)?.address,
      locality: UserAddress.at(-1)?.locality,
      state: UserAddress.at(-1)?.state,
      pincode: UserAddress.at(-1)?.pincode,
      more_info: UserAddress.at(-1)?.more_info,
      city: UserAddress.at(-1)?.city,
      region: UserAddress.at(-1)?.region,
      phone: UserAddress.at(-1)?.phone,
    });
  }, [userData]);

  //console.log(userData?.data.user_metadata.full_name);

  const orderAmount =
    count?.reduce(
      (
        accumulator: number,
        currentValue: { product: { price: string }; how_many: number }
      ) =>
        accumulator +
        parseInt(currentValue.product.price) * currentValue.how_many,
      0
    ) ?? 0;

  console.log(Object.values(input).map((value) => value).filter((element) => element !== undefined));


  return (
    userData &&
    input && (
      <div className="shipping-info-container">
        <div className="shipping-info-main">
          <div className="shipping-info">
            <h1>ENTER YOUR SHIPPING INFORMATION BELOW</h1>
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
                      setInput((data: any) => ({
                        ...data,
                        name: e.target.value,
                      }))
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
                      setInput((data: any) => ({
                        ...data,
                        address: e.target.value,
                      }))
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
                      setInput((data: any) => ({
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
                    value={stateOptions.find(
                      (option: any) => option.value === input.state
                    )}
                    onChange={(e) =>
                      setInput((data: any) => ({ ...data, state: e.value }))
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
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                      setInput((data: any) => ({
                        ...data,
                        pincode: numericValue,
                      }));
                    }}
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
                      setInput((data: any) => ({
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
                      setInput((data: any) => ({
                        ...data,
                        city: e.target.value,
                      }))
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
                  inputMode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => {
                    const telValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    setInput((data: any) => ({
                      ...data,
                      phone: telValue,
                    }));
                  }}
                  required
                />
              </div>
            </div>
          </form>
        </div>
        <div className="proceed-to-checkout-container">
          <div className="price-container">
            <div className="text">
              <h4>Rs. {orderAmount}</h4>
            </div>
          </div>
          <div className="line" />
          <div className="checkout-button-container">
            <button
              disabled={Object.values(input).map((value) => value).filter((element) => element !== undefined).map((value) => !value).indexOf(true) != -1}
              onClick={() => {
                db.from("USER")
                  .update({
                    name: input.name,
                  })
                  .eq("id", userData.extra_data.id)
                  .then(async (data: any) => {
                    await getUser();
                    dispatch(
                      addUserAddress({ ...input, id: UserAddress.length })
                    );

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
