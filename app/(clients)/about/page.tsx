"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import CircularSlider from "@fseehawer/react-circular-slider";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";

import {
  AboutLine,
  CategoriesWatermarkCenter,
  CategoriesWatermarkOuter,
  CircularText,
  ScrollArrow,
  SolutionImpactLogo,
  SolutionScrollLine,
  FoundersInsta,
  FoundersLinkedin,
  NewsletterArrowNormal,
} from "@/components/icons/Icons";

import { getAbout } from "@/sanity/sanity-utils";

interface About {
  _id: string;
  _createdAt: Date;
  title: {
    teal: string;
    black: string;
  };
  description: PortableTextBlock[];
  image: {
    url: string;
  };
  circularProgress: {
    circularProgressOne: {
      percentage: number;
      text: PortableTextBlock[];
    };
    circularProgressTwo: {
      percentage: number;
      text: PortableTextBlock[];
    };
    circularProgressThree: {
      percentage: number;
      text: PortableTextBlock[];
    };
  };
  expandingWindow: {
    image: {
      url: string;
    };
    text: PortableTextBlock[];
  };
  sideScroll: {
    headingSmall: string;
    headingBig: PortableTextBlock[];
    text: PortableTextBlock[];
    image: {
      url: string;
    };
    scrollableTabs: {
      tabOne: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabTwo: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabThree: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabFour: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
      tabFive: {
        number: number;
        heading: string;
        text: PortableTextBlock[];
      };
    };
  };
  team: [
    {
      heading: string;
      image: {
        url: string;
      };
      name: string;
      job: string;
      instagram: string;
      linkedin: string;
    }
  ];
}

const About = () => {
  const [about, setAbout] = useState<About[]>([]);

  useEffect(() => {
    async function fetchAbout() {
      const about = await getAbout();
      setAbout(about);
    }

    fetchAbout();
  }, []);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      gsap.registerPlugin(ScrollTrigger);

      const tlAbout = gsap.timeline();
      const tlSolution = gsap.timeline();

      tlAbout.fromTo(
        ".about-section",
        {},
        {
          scrollTrigger: {
            trigger: ".about-section",
            start: "top top",
            end: "1650vh top",
            scrub: true,
            // markers: true,
            pin: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-bg-container",
        {
          width: "50vw",
        },
        {
          width: "30vw",
          scrollTrigger: {
            trigger: ".about-bg-container",
            // markers: true,
            start: "top top",
            end: "1800px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-content",
        {
          width: "50vw",
        },
        {
          width: "70vw",
          y: "-1200px",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "top top",
            end: "1600px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-percent-one",
        {
          y: 500,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "top top",
            end: "300px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-percent-two",
        {
          y: 600,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "100px top",
            end: "400px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-percent-three",
        {
          y: 700,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "200px top",
            end: "500px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-window-container",
        {
          width: "25vw",
          height: "50vh",
          right: 0,
          borderRadius: "1000px 1000px 0 0",
          top: 0,
        },
        {
          width: "100vw",
          height: "110vh",
          right: "15vw",
          borderRadius: "0 0 0 0",
          top: "15.1vh",
          scrollTrigger: {
            trigger: ".about-window-container",
            // markers: true,
            start: "center+=18vh center",
            end: "bottom+=20vh center",
            scrub: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-section",
        {},
        {
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "2200px bottom",
            scrub: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-main",
        {
          x: 0,
        },
        {
          x: "-166.66vw",
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "2800px bottom",
            scrub: true,
            pin: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-side-scroll-main",
        {
          x: "100vw",
        },
        {
          x: "-66.66vw",
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "2800px bottom",
            scrub: true,
          },
        }
      );
    });

    mm.add("(max-width: 1024px)", () => {
      gsap.registerPlugin(ScrollTrigger);

      const tlAbout = gsap.timeline();
      const tlSolution = gsap.timeline();

      tlAbout.fromTo(
        ".about-percent-one",
        {
          y: 500,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "top top",
            end: "200px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-percent-two",
        {
          y: 600,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "100px top",
            end: "300px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-percent-three",
        {
          y: 700,
        },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: "#about-bg-container",
            // markers: true,
            start: "200px top",
            end: "400px top",
            scrub: true,
          },
        }
      );

      tlAbout.fromTo(
        ".about-window-section",
        {
          y: 500,
        },
        {
          y: 0,
          scrollTrigger: {
            trigger: ".about-percent-section",
            // markers: true,
            start: "center center",
            end: "bottom+=120px center",
            scrub: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-section",
        {},
        {
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "2200px bottom",
            scrub: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-main",
        {
          x: 0,
        },
        {
          x: "-550vw",
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "3200px bottom",
            scrub: true,
            pin: true,
          },
        }
      );

      tlSolution.fromTo(
        ".solution-side-scroll-main",
        {
          x: "210vw",
        },
        {
          x: "-350vw",
          scrollTrigger: {
            trigger: ".solution-section",
            // markers: true,
            start: "top top",
            end: "3200px bottom",
            scrub: true,
          },
        }
      );
    });
  });

  return (
    <div>
      {about.map((about) => (
        <div key={about._id} className="about-main">
          <div className="about-section">
            <div className="about-watermark-container">
              <CategoriesWatermarkCenter />
              <CategoriesWatermarkOuter />
            </div>
            <div className="about-bg-container">
              {about && (
                <Image
                  fill
                  src={about.image.url}
                  style={{ objectFit: "cover" }}
                  alt="about-bg"
                />
              )}
            </div>
            <div className="about-content">
              <div className="about-content-main">
                <div
                  className="about-content-heading"
                  id="about-content-heading"
                >
                  <h1>{about.title.teal}</h1>
                  <h1>
                    <span>{about.title.black}</span>
                  </h1>
                </div>
                <div className="about-content-text">
                  <div className="about-content-description">
                    <PortableText value={about.description} />
                    <AboutLine />
                  </div>
                </div>
                <div className="about-scroll-arrow">
                  <ScrollArrow />
                </div>
              </div>
              <div className="about-percent-section">
                <div className="about-percent-one">
                  <CircularSlider
                    label=" "
                    min={0}
                    max={100}
                    appendToValue="%"
                    labelColor="#194841"
                    knobDraggable={false}
                    knobSize={1}
                    hideKnob={true}
                    progressColorFrom="#194841"
                    progressColorTo="#194841"
                    progressSize={25}
                    trackColor="#194841"
                    trackSize={10}
                    dataIndex={
                      about.circularProgress.circularProgressOne.percentage
                    }
                    valueFontSize="1.4rem"
                    verticalOffset="8px"
                  />
                  <div className="about-percent-one-text">
                    <PortableText
                      value={about.circularProgress.circularProgressOne.text}
                    />
                  </div>
                </div>
                <div className="about-percent-two">
                  <CircularSlider
                    label=" "
                    min={0}
                    max={100}
                    appendToValue="%"
                    labelColor="#194841"
                    knobDraggable={false}
                    knobSize={1}
                    hideKnob={true}
                    progressColorFrom="#194841"
                    progressColorTo="#194841"
                    progressSize={25}
                    trackColor="#194841"
                    trackSize={10}
                    dataIndex={
                      about.circularProgress.circularProgressTwo.percentage
                    }
                    valueFontSize="1.4rem"
                    verticalOffset="8px"
                  />
                  <div className="about-percent-two-text">
                    <PortableText
                      value={about.circularProgress.circularProgressTwo.text}
                    />
                  </div>
                </div>
                <div className="about-percent-three">
                  <CircularSlider
                    label=" "
                    min={0}
                    max={100}
                    appendToValue="%"
                    labelColor="#194841"
                    knobDraggable={false}
                    knobSize={1}
                    hideKnob={true}
                    progressColorFrom="#194841"
                    progressColorTo="#194841"
                    progressSize={25}
                    trackColor="#194841"
                    trackSize={10}
                    dataIndex={
                      about.circularProgress.circularProgressThree.percentage
                    }
                    valueFontSize="1.4rem"
                    verticalOffset="8px"
                  />
                  <div className="about-percent-three-text">
                    <PortableText
                      value={about.circularProgress.circularProgressThree.text}
                    />
                  </div>
                </div>
              </div>
              <div className="about-window-section">
                <div className="about-window-container">
                  {about.expandingWindow.image && (
                    <Image
                      fill
                      src={about.expandingWindow.image.url}
                      alt="about-window-shirt"
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
              </div>
              <div className="about-window-text">
                <PortableText value={about.expandingWindow.text} />
              </div>
            </div>
          </div>
          <div className="solution-section">
            <div className="solution-main">
              <div className="solution-heading">
                <h2>{about.sideScroll.headingSmall}</h2>
                <div className="solution-heading-big">
                  <PortableText value={about.sideScroll.headingBig} />
                </div>
                <div className="solution-text">
                  <PortableText value={about.sideScroll.text} />
                </div>
              </div>
              <div className="solution-bg-container">
                {about.sideScroll.image && (
                  <Image
                    fill
                    src={about.sideScroll.image.url}
                    alt="solution-bg"
                  />
                )}
                <div className="solution-impact-logo">
                    <SolutionImpactLogo />
                </div>
              </div>
            </div>
            <div className="solution-side-scroll-main">
              <div className="solution-scroll-one">
                <h2>{about.sideScroll.scrollableTabs.tabOne.number}</h2>
                <h1>{about.sideScroll.scrollableTabs.tabOne.heading}</h1>
                <div className="solution-scroll-one-text">
                  <PortableText
                    value={about.sideScroll.scrollableTabs.tabOne.text}
                  />
                </div>
              </div>
              <SolutionScrollLine />
              <div className="solution-scroll-two">
                <h2>{about.sideScroll.scrollableTabs.tabTwo.number}</h2>
                <h1>{about.sideScroll.scrollableTabs.tabTwo.heading}</h1>
                <div className="solution-scroll-two-text">
                  <PortableText
                    value={about.sideScroll.scrollableTabs.tabTwo.text}
                  />
                </div>
              </div>
              <SolutionScrollLine />
              <div className="solution-scroll-three">
                <h2>{about.sideScroll.scrollableTabs.tabThree.number}</h2>
                <h1>{about.sideScroll.scrollableTabs.tabThree.heading}</h1>
                <div className="solution-scroll-three-text">
                  <PortableText
                    value={about.sideScroll.scrollableTabs.tabThree.text}
                  />
                </div>
              </div>
              <SolutionScrollLine />
              <div className="solution-scroll-four">
                <h2>{about.sideScroll.scrollableTabs.tabFour.number}</h2>
                <h1>{about.sideScroll.scrollableTabs.tabFour.heading}</h1>
                <div className="solution-scroll-four-text">
                  <PortableText
                    value={about.sideScroll.scrollableTabs.tabFour.text}
                  />
                </div>
              </div>
              <SolutionScrollLine />
              <div className="solution-scroll-five">
                <h2>{about.sideScroll.scrollableTabs.tabFive.number}</h2>
                <h1>{about.sideScroll.scrollableTabs.tabFive.heading}</h1>
                <div className="solution-scroll-five-text">
                  <PortableText
                    value={about.sideScroll.scrollableTabs.tabFive.text}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="founders-section">
            <h1>Meet The Team</h1>
            <div className="founders-main">
              {about.team.map((team) => (
                <div key={team.name} className="founders">
                  <div className="founders-header">
                    <div className="founders-heading">{team.heading}</div>
                  </div>
                  <div className="founders-img-container">
                    <Image
                      fill
                      src={team.image.url}
                      alt="graphic-design-head"
                    />
                  </div>
                  <h2>{team.name}</h2>
                  <h3>{team.job}</h3>
                  <div className="founders-socials">
                    <Link
                      href={team.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FoundersInsta />
                    </Link>
                    <Link
                      href={team.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FoundersLinkedin />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="sustain-section">
            <div className="sustain-circular-text-container">
              <CircularText />
            </div>
            <div className="sustain-circular-text-mask" />
            <div className="sustain-main">
              <div className="sustain-heading">
                <h3>WE AIM TO MAKE</h3>
                <h2>SUSTAINABILITY</h2>
                <h1>THE NORM</h1>
              </div>
              <div className="sustain-text">
                <p>
                  Upcycled slow fashion that inspires everyone to consume
                  consciously. Explore our newest collection and be a part of
                  this change.
                </p>
              </div>
              <Link href="/products">
                <button type="button">
                  <h3>EXPLORE</h3>
                  <NewsletterArrowNormal />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
