"use client";

import Image from "next/image";

import FAQs from "@/components/client/FAQs";

import {
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
} from "@/components/icons/Icons";

import ArticleImg from "@/public/assets/images/blogs/article/ArticleImg.png";
import Newsletter from "@/components/client/NewsLetter";

const Article = () => {
  return (
    <div className="article-main">
      <div className="article-watermark-container">
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      <div className="article-section">
        <div className="article-img-container">
          <Image src={ArticleImg} alt="article-img" />
        </div>
        <div className="article-content">
          <div className="article-heading">
            <h2>UPCYCLING 101</h2>
            <h1>Embracing Upcycled Fashion</h1>
          </div>
          <div className="article-description">
            <h2>
              Discover the beauty of upcycled fashion with the kapda project
            </h2>
          </div>
          <div className="article-text">
            <p>
              In a world where fast fashion dominates, we believe in the power
              of sustainable fashion to make a difference. At The Kapda Project,
              we are committed to creating a positive impact through our
              eco-friendly and ethically produced clothing. Our garments are
              crafted with love and care, using organic and responsibly sourced
              fabrics. By embracing sustainable fashion, you can make a
              conscious choice to support ethical practices and reduce your
              environmental footprint. Join us on this journey towards a more
              sustainable and stylish future.
            </p>
            <p>
              The Kapda Project is not just a fashion brand; it&apos;s a
              movement. We believe that fashion has the power to empower and
              create positive change. Through our commitment to sustainable
              practices, we are redefining the industry and challenging the
              norms. From the selection of eco-friendly fabrics to the fair
              treatment of our skilled artisans, every decision we make is
              rooted in our mission to uplift communities and protect the
              environment.
            </p>
            <p>
              By choosing The Kapda Project, you become a part of this movement.
              You contribute to fair wages, safe working conditions, and the
              preservation of traditional craftsmanship. Our garments, carefully
              designed with a blend of modern aesthetics and timeless elegance,
              reflect our dedication to quality and sustainability.
            </p>
            <p>
              Together, we can transform the fashion landscape. Join us on this
              journey of empowerment, where style meets purpose and every
              garment tells a story of positive impact. Together, let&apos;s
              create a better future, one sustainable fashion choice at a time.
            </p>
          </div>
        </div>
      </div>
      <div className="article-faqs-section">
        <FAQs />
      </div>
      <div className="article-newsletter-section">
        <div className="newsletter-container">
          <Newsletter />
        </div>
      </div>
    </div>
  );
};

export default Article;
