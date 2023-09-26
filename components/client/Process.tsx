"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { getProcesses } from "@/sanity/sanity-utils";

import gif from "@/public/assets/images/V01.gif";

import {
  CircularText,
  StitchingImpact,
  MissionArrow,
} from "@/components/icons/Icons";
import Link from "next/link";

interface Process {
  _id: string;
  number: number | string;
  processName: string;
  description: string;
  image: {
    url: string;
  };
  imageAlt: string;
}

export default function Process() {
  const [processes, setProcesses] = useState<Process[]>([]);

  useEffect(() => {
    async function fetchProcesses() {
      const processes = await getProcesses();
      setProcesses(processes);
    }

    fetchProcesses();
  }, []);

  return (
    <>
      <section className="main-process-section">
        <div className="main-process-heading">
          <h1>
            <span>LOVE</span> WHAT YOU SEE?
          </h1>
          <h2>
            YOU&apos;LL LOVE <span>THE PROCESS</span> TOO
          </h2>
        </div>

        <div className="circular-text-container">
          <CircularText />
        </div>
        <div className="cut-container" />

        <div className="mission-section">
          <div className="mission-text">
            <p>
              We&apos;re the <span>Kapda Project</span>, a clothing and fashion
              accessories venture that believes in breaking stereotypes about
              comfortable clothing and slow fashion.
            </p>
            <p>
              Our goal is to make affordable, vernacular clothes and fashion
              accessories using upcycled fabric, and create a positive social
              impact by{" "}
              <span>
                providing employment and economic opportunities in rural areas
                and a platform to autistic people to showcase their talent.
              </span>
            </p>
            <Link href="/about">
              <button type="button">
                <h3>OUR MISSION</h3>
                <MissionArrow />
              </button>
            </Link>
          </div>
          <div className="mission-container">
            {/* 
            <StitchingImpact /> */}
            <div className="img-container">
              <Image src={gif} fill sizes="100" alt="gif" />
            </div>
          </div>
        </div>

        <div className="process-section">
          {processes.map((process) => (
            <div key={process._id} className="process-container">
              {process.image && (
                <Image
                  fill
                  src={process.image.url}
                  style={{ objectFit: "cover" }}
                  alt={process.imageAlt}
                />
              )}
              <h1>
                <span>{process.number}</span>
                {process.processName}
              </h1>
              <p>{process.description}</p>
            </div>
          ))}
        </div>
        <div className="process-section-mobile">
          {processes.map((process) => (
            <div key={process._id} className="process-main-mobile">
              <h1>
                <span>{process.number}</span>
                {process.processName}
              </h1>
              <div className="process-container-mobile">
                {process.image && (
                  <Image
                    fill
                    src={process.image.url}
                    style={{ objectFit: "cover" }}
                    alt={process.imageAlt}
                  />
                )}
              </div>
              <p>{process.description}</p>
              <div className="line" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
