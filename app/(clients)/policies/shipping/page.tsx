"use client";

import {
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
} from "@/components/icons/Icons";
import { getPolicies } from "@/sanity/sanity-utils";
import { policiesSchema } from "@/types/Policies";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";

const Shipping = () => {
  const [policies, setPolicies] = useState<policiesSchema[]>([]);

  useEffect(() => {
    async function fetchPolicies() {
      const policies = await getPolicies();
      setPolicies(policies);
    }

    fetchPolicies();
  }, []);

  return (
    <div className="shipping-main">
      <div className="shipping-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      {policies.map((policy) => (
        <div key={policy._id} className="shipping-body">
          <div className="shipping-heading">
            <h1>{policy.shipping.title}</h1>
            <div className="shipping-description">
              <PortableText value={policy.shipping.description} />
            </div>
          </div>
          <div className="shipping-content-section">
            <div className="shipping-content">
              <PortableText value={policy.shipping.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shipping;
