"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { useEffect, useState } from "react";

import { getBlogs, getFeatured, getTopics } from "@/sanity/sanity-utils";
import Newsletter from "@/components/client/NewsLetter";
import FAQs from "@/components/client/FAQs";

import {
  BlogsArrow,
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
} from "@/components/icons/Icons";
import { blogsSchema } from "@/types/Blogs";
import { featuredSchema } from "@/types/Featured";
import { topicsSchema } from "@/types/Topics";

export default function Blogs() {
  const [filter, setFilter] = useState("ALL");
  const [blogs, setBlogs] = useState<blogsSchema[]>([]);
  const [featured, setFeatured] = useState<featuredSchema[]>([]);
  const [topics, setTopics] = useState<topicsSchema[]>([]);

  useEffect(() => {
    async function fetchFeatured() {
      const featured = await getFeatured();
      setFeatured(featured);
    }

    async function fetchTopics() {
      const topics = await getTopics();
      setTopics(topics);
    }
    async function fetchBlogs() {
      const blogs = await getBlogs();
      setBlogs(blogs);
    }

    fetchFeatured();
    fetchTopics();
    fetchBlogs();
  }, [filter]);

  const handleFilterClick = (filter: any) => {
    setFilter(filter);
  };

  return (
    <div className="blogs-main">
      <div className="blogs-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      {featured.map((featured) => (
        <div key={featured._id} className="blogs-featured-section">
          <div className="blogs-featured-img-container">
            {featured.image && (
              <Image
                fill
                src={featured.image.url}
                alt={featured._id}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className="blogs-featured-content">
            <h2>{featured.topic.name}</h2>
            <div className="blogs-featured-title">
              <PortableText value={featured.title} />
            </div>
            <div className="blogs-featured-description">
              <PortableText value={featured.description} />
            </div>
            <div className="blogs-read-more-container">
              <a href="/blogs/featured">
                <div className="blogs-read-more">
                  <p>READ MORE</p>
                  <BlogsArrow />
                </div>
              </a>
            </div>
          </div>
          <div className="blogs-border-container">
            <div className="blogs-border" />
          </div>
        </div>
      ))}
      <div className="blogs-filter-section">
        <div className="filter-container">
          <button
            className={`${filter === "ALL" ? "active" : ""}`}
            type="button"
            onClick={() => {
              handleFilterClick("ALL");
            }}
          >
            <h3>ALL</h3>
          </button>
        </div>
        {topics.map((topic) => (
          <div key={topic._id} className="filter-container">
            <button
              className={`${filter === `${topic.name}` ? "active" : ""}`}
              type="button"
              onClick={() => {
                handleFilterClick(topic.name);
              }}
            >
              <h3>{topic.name}</h3>
            </button>
          </div>
        ))}
      </div>
      <div className="blogs-articles-section">
        {blogs.map((blog) => {
          if (filter == "ALL") {
            return (
              <div key={blog._id} className="articles-container">
                <div className="articles-img-container">
                  {blog.image && (
                    <Image
                      fill
                      src={blog.image.url}
                      style={{ objectFit: "cover" }}
                      alt={blog.slug}
                    />
                  )}
                </div>
                <div className="articles-content">
                  <div className="articles-topic">{blog.topic.name}</div>
                  <div className="articles-title">
                    <PortableText value={blog.title} />
                  </div>
                  <div className="articles-description">
                    <PortableText value={blog.description} />
                  </div>
                  <div className="articles-read-more-container">
                    <a href={`/blogs/${blog.slug}`}>
                      <div className="articles-read-more">
                        <p>READ MORE</p>
                        <BlogsArrow />
                      </div>
                    </a>
                  </div>
                </div>
                <div className="blogs-border-container">
                  <div className="blogs-border" />
                </div>
              </div>
            );
          } else if (
            filter == blog.topic.name &&
            blog.topic.name == blog.topic.name
          ) {
            return (
              <div key={blog.topic.name} className="articles-container">
                <div className="articles-img-container">
                  {blog.image && (
                    <Image
                      fill
                      src={blog.image.url}
                      style={{ objectFit: "cover" }}
                      alt={blog.slug}
                    />
                  )}
                </div>
                <div className="articles-content">
                  <div className="articles-topic">{blog.topic.name}</div>
                  <div className="articles-title">
                    <PortableText value={blog.title} />
                  </div>
                  <div className="articles-description">
                    <PortableText value={blog.description} />
                  </div>
                  <div className="articles-read-more-container">
                    <a href={`/blogs/${blog.slug}`}>
                      <div className="articles-read-more">
                        <p>READ MORE</p>
                        <BlogsArrow />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className="blogs-faqs-section">
        <FAQs />
      </div>
      <div className="blogs-newsletter-section">
        <div className="newsletter-container">
          <Newsletter />
        </div>
      </div>
    </div>
  );
}
