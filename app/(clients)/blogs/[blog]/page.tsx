"use client";

import FAQs from "@/components/client/FAQs";
import Newsletter from "@/components/client/NewsLetter";
import {
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
} from "@/components/icons/Icons";
import { getBlog } from "@/sanity/sanity-utils";
import { blogsSchema } from "@/types/Blogs";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  params: { blog: any };
};

export default function Blog({ params }: Props) {
  const [blog, setBlog] = useState<blogsSchema>();
  const slug = params.blog;

  useEffect(() => {
    getBlog(slug).then((data) => {
      setBlog(data);
    });
  }, [slug]);

  return (
    <div className="blog-main">
      <div className="blog-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      {blog && (
        <div className="blog-section">
          <div className="blog-img-container">
            {blog.image && (
              <Image
                fill
                src={blog.image.url}
                alt={blog.slug}
                style={{ objectFit: "cover" }}
                sizes="100%"
              />
            )}
          </div>
          <div className="blog-content">
            <div className="blog-heading">
              <h2>{blog.topic.name}</h2>
              <div className="blog-title">
                <PortableText value={blog.title} />
              </div>
            </div>
            <div className="blogs-border-container">
              <div className="blogs-border" />
            </div>
            <div className="blog-description">
              <PortableText value={blog.description} />
            </div>
            <div className="blog-text">
              <PortableText value={blog.content} />
            </div>
          </div>
        </div>
      )}

      <div className="blog-faqs-section">
        <FAQs />
      </div>
      <div className="blog-newsletter-section">
        <div className="newsletter-container">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
