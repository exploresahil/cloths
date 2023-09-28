"use client";

import {
  NewsletterArrowNormal,
  NewsletterTick,
} from "@/components/icons/Icons";
import { Newsletter as NL } from "@/backend/forms";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Newsletter() {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const submitNewsLetter = (e: any) => {
    e.preventDefault();
    NL(inputValue.firstName, inputValue.lastName, inputValue.email)
      .then(() => {
        toast.success("Submitted Successfully!", {
          theme: "colored",
          autoClose: 800,
        });
      })
      .catch((error) => {
        toast.error("Erron on submit!", {
          theme: "colored",
          autoClose: 800,
        });
      });
  };

  return (
    <div className="newsletter-form-container">
      <h1>STAY UPDATED</h1>
      <form className="newsletter-form" onSubmit={submitNewsLetter}>
        <h2>SIGN UP FOR OUR NEWSLETTER</h2>
        <div className="name">
          <input
            type="text"
            placeholder="FIRST NAME"
            required
            value={inputValue.firstName}
            onChange={(e) => {
              setInputValue((v) => ({ ...v, firstName: e.target.value }));
            }}
          />
          <input
            type="text"
            placeholder="LAST NAME"
            value={inputValue.lastName}
            onChange={(e) => {
              setInputValue((v) => ({ ...v, lastName: e.target.value }));
            }}
          />
        </div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="EMAIL"
          required
          value={inputValue.email}
          onChange={(e) => {
            setInputValue((v) => ({ ...v, email: e.target.value }));
          }}
        />
        <button type="submit">
          <h3>JOIN THE MOVEMENT</h3>
          <NewsletterArrowNormal />
          <NewsletterTick />
        </button>
      </form>
    </div>
  );
}
