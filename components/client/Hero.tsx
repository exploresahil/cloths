"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Image from "next/image";

import {
  Arches,
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
  ScrollArrow,
  CategoryArrowRight,
} from "@/components/icons/Icons";

const dance =
  "https://assets.mixkit.co/videos/preview/mixkit-young-man-modeling-old-fashion-style-41480-large.mp4";

const life =
  "https://assets.mixkit.co/videos/preview/mixkit-t-shirts-on-hangers-at-fashion-store-34707-large.mp4";

import Link from "next/link";
import { GrSpa } from "react-icons/gr";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const accessoriesArrowRef = useRef<HTMLAnchorElement>(null);
  const coOrdsArrowRef = useRef<HTMLAnchorElement>(null);
  const archesRef = useRef<HTMLDivElement>(null);
  const scrollPromoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tlHero = gsap.timeline();

    tlHero.fromTo(
      ".one",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }
    );
    tlHero.fromTo(
      ".two",
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }
    );
    tlHero.fromTo(
      ".three",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }
    );
    tlHero.fromTo(
      ".four",
      {
        x: 100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      "#coOrds",
      {
        y: 500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      "#coOrdsMobile",
      {
        y: 500,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      archesRef.current,
      {
        clipPath: "circle(0% at 50% 50%)",
        opacity: 0,
      },
      {
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        opacity: 1,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      watermarkRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      scrollPromoRef.current,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        ease: "power2.out",
      }
    );

    tlHero.fromTo(
      ".category-watermark-container svg",
      {
        opacity: 1,
      },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom bottom",
          end: "bottom bottom",
          //markers: true,
          scrub: true,
        },
      }
    );

    let mm = gsap.matchMedia();

    //*----> Large Device Screen

    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        "#coOrds",
        {
          width: "33.4vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#coOrdsMain",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#coOrds",
        {},
        {
          scrollTrigger: {
            trigger: "#coOrdsMain",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "2200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#accessories",
        {
          width: "33.4vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#accessoriesMain",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#accessories",
        {},
        {
          scrollTrigger: {
            trigger: "#accessoriesMain",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#accessories",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#accessoriesMain",
            scrub: 0.1,
            // markers: true,
            start: "10px top",
            end: "bottom top",
          },
        }
      );
    });

    //*----> Med Device Screen

    /* mm.add("(max-height: 1024px)", () => {
      gsap.fromTo(
        "#accessories",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#accessoriesMain",
            scrub: 0.1,
            markers: true,
            start: "1500px bottom",
            end: "2000px bottom",
          },
        }
      );
    }); */

    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        "#coOrdsMobile",
        {
          width: "100vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#coOrdsMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#coOrdsMobile",
        {},
        {
          scrollTrigger: {
            trigger: "#coOrdsMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "2200px 180px",
            pin: true,
          },
        }
      );
      gsap.fromTo(
        "#accessoriesMobile",
        {
          width: "100vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#accessoriesMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#accessoriesMobile",
        {},
        {
          scrollTrigger: {
            trigger: "#accessoriesMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#accessoriesMobile",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#accessoriesMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "1400px bottom",
            end: "2200px bottom",
          },
        }
      );
    });

    //*----> Mobile Device Screen

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        "#accessoriesMobile",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#accessoriesMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "1000px bottom",
            end: "1400px bottom",
          },
        }
      );
    });
  }, []);

  const videoRefOne = useRef<HTMLVideoElement | null>(null);
  const videoRefOneDesktop = useRef<HTMLVideoElement | null>(null);
  const videoRefTwo = useRef<HTMLVideoElement | null>(null);
  const videoRefTwoDesktop = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRefOne.current) {
        videoRefOne.current.play();
      }
    };

    // Add event listener for user interaction (e.g., button click)
    document.addEventListener("click", playVideo);

    return () => {
      // Clean up event listener when component is unmounted
      document.removeEventListener("click", playVideo);
    };
  }, []);

  useEffect(() => {
    const playVideoDesktop = () => {
      if (videoRefOneDesktop.current) {
        videoRefOneDesktop.current.play();
      }
    };

    // Add event listener for user interaction (e.g., button click)
    document.addEventListener("click", playVideoDesktop);

    return () => {
      // Clean up event listener when component is unmounted
      document.removeEventListener("click", playVideoDesktop);
    };
  }, []);

  useEffect(() => {
    const playVideoTwo = () => {
      if (videoRefTwo.current) {
        videoRefTwo.current.play();
      }
    };

    // Add event listener for user interaction (e.g., button click)
    document.addEventListener("click", playVideoTwo);

    return () => {
      // Clean up event listener when component is unmounted
      document.removeEventListener("click", playVideoTwo);
    };
  }, []);

  useEffect(() => {
    const playVideoTwoDesktop = () => {
      if (videoRefTwoDesktop.current) {
        videoRefTwoDesktop.current.play();
      }
    };

    // Add event listener for user interaction (e.g., button click)
    document.addEventListener("click", playVideoTwoDesktop);

    return () => {
      // Clean up event listener when component is unmounted
      document.removeEventListener("click", playVideoTwoDesktop);
    };
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="arches-container" ref={archesRef}>
        <Arches />
      </div>
      <div className="category-watermark-container" ref={watermarkRef}>
        <CategoriesWatermarkCenter />
        <CategoriesWatermarkOuter />
      </div>
      <div className="scroll-promoter-container" ref={scrollPromoRef}>
        <p>scroll</p>
        <ScrollArrow />
      </div>
      <div className="category_co-ords_main" id="coOrdsMain">
        {/*  <div className="category_co-ords_container" ref={categoryCoOrdsRef}>
          <Image
            fill
            src={coOrds}
            style={{ objectFit: "cover" }}
            alt="footer-logo"
            ref={coOrdsRef}
          />
        </div> */}
        <div className="category_co-ords_container" id="coOrds">
          <video
            ref={videoRefOneDesktop}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ objectFit: "cover" }}
          >
            <source src={dance} type="video/mp4" />
          </video>
        </div>
      </div>
      <div className="category_co-ords_main_mobile" id="coOrdsMainMobile">
        {/*  <div className="category_co-ords_container" ref={categoryCoOrdsRef}>
          <Image
            fill
            src={coOrds}
            style={{ objectFit: "cover" }}
            alt="footer-logo"
            ref={coOrdsRef}
          />
        </div> */}
        <div className="category_co-ords_container_mobile" id="coOrdsMobile">
          <video
            ref={videoRefOne}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ objectFit: "cover" }}
          >
            <source src={dance} />
          </video>
        </div>
      </div>
      <div className="link-container">
        <Link href="#" ref={coOrdsArrowRef} className="coOrdsArrowRef">
          <p>Tube Top</p>
          <CategoryArrowRight />
        </Link>
      </div>
      <div className="category_accessories_main" id="accessoriesMain">
        {/* <div
          className="category_accessories_container"
          ref={categoryAccessoriesRef}
        >
          <Image
            fill
            src={accessories}
            style={{ objectFit: "cover" }}
            alt="footer-logo"
            ref={accessoriesRef}
          />
        </div> */}
        <div className="category_accessories_container" id="accessories">
          <video
            ref={videoRefTwoDesktop}
            autoPlay
            loop
            muted
            style={{ objectFit: "cover" }}
          >
            <source src={life} />
          </video>
        </div>
      </div>
      <div
        className="category_accessories_main_mobile"
        id="accessoriesMainMobile"
      >
        {/* <div
          className="category_accessories_container"
          ref={categoryAccessoriesRef}
        >
          <Image
            fill
            src={accessories}
            style={{ objectFit: "cover" }}
            alt="footer-logo"
            ref={accessoriesRef}
          />
        </div> */}
        <div
          className="category_accessories_container_mobile"
          id="accessoriesMobile"
        >
          <video
            ref={videoRefTwo}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{ objectFit: "cover" }}
          >
            <source src={life} />
          </video>
        </div>
      </div>
      <div className="link-container">
        <Link
          href="#"
          ref={accessoriesArrowRef}
          className="accessoriesArrowRef"
        >
          <p>Crop Top</p>
          {/* <p>accessories</p> */}
          <CategoryArrowRight />
        </Link>
      </div>
      <h3 className="stitchingImpact">
        <span className="one">stitching</span>{" "}
        <span className="two">impact</span>
      </h3>
      <h3 className="throughLives">
        <span className="three">through</span>{" "}
        <span className="four">lives</span>
      </h3>
    </section>
  );
};

export default Hero;
