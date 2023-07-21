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

const Privacy = () => {
  const [policies, setPolicies] = useState<Policies[]>([]);

  useEffect(() => {
    async function fetchPolicies() {
      const policies = await getPolicies();
      setPolicies(policies);
    }

    fetchPolicies();
  }, []);
  return (
    <div className="privacy-main">
      <div className="privacy-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      {policies.map((policy) => (
        <div key={policy._id} className="privacy-body">
          <div className="privacy-heading">
            <h1>{policy.privacy.title}</h1>
            <div className="privacy-description">
              <PortableText value={policy.privacy.description} />
            </div>
          </div>
          <div className="privacy-content-section">
            <div className="privacy-content">
              <PortableText value={policy.privacy.content} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Privacy;
