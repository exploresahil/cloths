"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

import {
  Arches,
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
  ScrollArrow,
  CategoryArrowRight,
} from "@/components/icons/Icons";

import { useRouter } from "next/navigation";

import Link from "next/link";
import { GrSpa } from "react-icons/gr";
import { getHeros } from "@/sanity/sanity-utils";
import { heros } from "@/types/Heros";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const vidTwoArrowRef = useRef<HTMLAnchorElement>(null);
  const vidOneArrowRef = useRef<HTMLAnchorElement>(null);
  const vidThreeArrowRef = useRef<HTMLAnchorElement>(null);
  const archesRef = useRef<HTMLDivElement>(null);
  const scrollPromoRef = useRef<HTMLDivElement>(null);
  const [heros, setHeros] = useState<heros[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchHeros() {
      const heros = await getHeros();
      setHeros(heros);
    }

    fetchHeros();
  }, []);

  const videoUrlOne = heros[0]?.video_url;
  const catogeryOne = heros[0]?.catogery_video.name;
  const videoUrlTwo = heros[2]?.video_url;
  const catogeryTwo = heros[2]?.catogery_video.name;
  const videoUrlThree = heros[1]?.video_url;
  const catogeryThree = heros[1]?.catogery_video.name;

  const handleCatogeryClick = (selectedCategory: any) => {
    router.push(`/products?category=${selectedCategory}`);
  };

  //  console.log("heros-->", heros[0]?.catogery_video.name);

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
      "#vidOne",
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
      "#vidOneMobile",
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
        "#vidOne",
        {
          width: "33.4vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidOneMain",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidOne",
        {},
        {
          scrollTrigger: {
            trigger: "#vidOneMain",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "2200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#vidTwo",
        {
          width: "33.4vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidTwoMain",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidTwo",
        {},
        {
          scrollTrigger: {
            trigger: "#vidTwoMain",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1300px top",
            pin: true,
          },
        }
      );

      /*----------------------------------------------------------------*/

      gsap.fromTo(
        "#vidThree",
        {
          width: "33.4vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidThreeMain",
            scrub: 0.1,
            //markers: true,
            start: "top 350px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidThree",
        {},
        {
          scrollTrigger: {
            trigger: "#vidThreeMain",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#vidThree",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#vidThreeMain",
            scrub: 0.1,
            //markers: true,
            start: "10px top",
            end: "bottom top",
          },
        }
      );
    });

    //*----> Med Device Screen

    mm.add("(max-width: 1024px)", () => {
      gsap.fromTo(
        "#vidOneMobile",
        {
          width: "100vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidOneMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidOneMobile",
        {},
        {
          scrollTrigger: {
            trigger: "#vidOneMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "2200px 180px",
            pin: true,
          },
        }
      );

      /*----------------------------------------------------------------*/

      gsap.fromTo(
        "#vidTwoMobile",
        {
          width: "100vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidTwoMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidTwoMobile",
        {},
        {
          scrollTrigger: {
            trigger: "#vidTwoMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1400px top",
            pin: true,
          },
        }
      );

      /*----------------------------------------------------------------*/

      gsap.fromTo(
        "#vidThreeMobile",
        {
          width: "100vw",
          borderRadius: "1000px 1000px 0 0",
        },
        {
          width: "100vw",
          borderRadius: "0 0 0 0",
          scrollTrigger: {
            trigger: "#vidThreeMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "top 180px",
            end: "180px 180px",
          },
        }
      );

      gsap.fromTo(
        "#vidThreeMobile",
        {},
        {
          scrollTrigger: {
            trigger: "#vidThreeMainMobile",
            scrub: 0.1,
            //markers: true,
            start: "180px 180px",
            end: "1200px 180px",
            pin: true,
          },
        }
      );

      gsap.fromTo(
        "#vidThreeMobile",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#vidThreeMainMobile",
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
        "#vidThreeMobile",
        {},
        {
          borderRadius: "0 0 1000px 1000px",
          scrollTrigger: {
            trigger: "#vidThreeMainMobile",
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

      {/* ---------------------> Vid One <---------------------- */}

      <div className="category_vid_one_main" id="vidOneMain">
        <div className="category_vid_one_container" id="vidOne">
          {videoUrlOne && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{ objectFit: "cover" }}
            >
              <source src={videoUrlOne} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
      <div className="category_vid_one_main_mobile" id="vidOneMainMobile">
        <div className="category_vid_one__container_mobile" id="vidOneMobile">
          {videoUrlOne && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{ objectFit: "cover" }}
            >
              <source src={videoUrlOne} />
            </video>
          )}
        </div>
      </div>
      <div className="link-container">
        {catogeryOne && (
          <a
            href="#"
            ref={vidOneArrowRef}
            className="vidOneArrowRef"
            onClick={() => handleCatogeryClick(catogeryOne)}
          >
            <p>{catogeryOne}</p>
            <CategoryArrowRight />
          </a>
        )}
      </div>

      {/* ---------------------> Vid Two <---------------------- */}

      <div className="category_vid_two_main" id="vidTwoMain">
        <div className="category_vid_two_container" id="vidTwo">
          {videoUrlTwo && (
            <video autoPlay loop muted style={{ objectFit: "cover" }}>
              <source src={videoUrlTwo} />
            </video>
          )}
        </div>
      </div>
      <div className="category_vid_two_main_mobile" id="vidTwoMainMobile">
        <div className="category_vid_two_container_mobile" id="vidTwoMobile">
          {videoUrlTwo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{ objectFit: "cover" }}
            >
              <source src={videoUrlTwo} />
            </video>
          )}
        </div>
      </div>
      <div className="link-container">
        {catogeryTwo && (
          <a
            href="#"
            ref={vidTwoArrowRef}
            onClick={() => handleCatogeryClick(catogeryTwo)}
            className="vidTwoArrowRef"
          >
            <p>{catogeryTwo}</p>
            <CategoryArrowRight />
          </a>
        )}
      </div>

      {/* ---------------------> Vid Three <---------------------- */}

      <div className="category_vid_three_main" id="vidThreeMain">
        <div className="category_vid_three_container" id="vidThree">
          {videoUrlThree && (
            <video autoPlay loop muted style={{ objectFit: "cover" }}>
              <source src={videoUrlThree} />
            </video>
          )}
        </div>
      </div>
      <div className="category_vid_three_main_mobile" id="vidThreeMainMobile">
        <div
          className="category_vid_three_container_mobile"
          id="vidThreeMobile"
        >
          {videoUrlThree && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              style={{ objectFit: "cover" }}
            >
              <source src={videoUrlThree} />
            </video>
          )}
        </div>
      </div>
      <div className="link-container">
        {catogeryThree && (
          <a
            href="#"
            ref={vidThreeArrowRef}
            onClick={() => handleCatogeryClick(catogeryThree)}
            className="vidThreeArrowRef"
          >
            <p>{catogeryThree}</p>
            <CategoryArrowRight />
          </a>
        )}
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
