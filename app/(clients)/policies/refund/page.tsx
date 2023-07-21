"use client";

import {
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
} from "@/components/icons/Icons";
import { getPolicies } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";
import { PortableTextBlock } from "sanity";

interface Policies {
  _id: string;
  _createdAt: Date;
  refund: {
    title: string;
    description: PortableTextBlock[];
    content: PortableTextBlock[];
  };
  shipping: {
    title: string;
    description: PortableTextBlock[];
    content: PortableTextBlock[];
  };
  privacy: {
    title: string;
    description: PortableTextBlock[];
    content: PortableTextBlock[];
  };
}

const Refund = () => {
  const [policies, setPolicies] = useState<Policies[]>([]);

  useEffect(() => {
    async function fetchPolicies() {
      const policies = await getPolicies();
      setPolicies(policies);
    }

    fetchPolicies();
  }, []);

  return (
    <div className="refund-main">
      <div className="refund-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      {policies.map((policy) => (
        <div key={policy._id} className="refund-body">
          <div className="refund-heading">
            <h1>{policy.refund.title}</h1>
            <div className="refund-description">
              <PortableText value={policy.refund.description} />
            </div>
          </div>
          <div className="refund-content-section">
            <div className="refund-content">
              <PortableText value={policy.refund.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Refund;
