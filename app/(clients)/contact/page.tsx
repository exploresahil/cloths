"use client";

import Image from "next/image";
import Link from "next/link";
import { contact as contactUs } from "@/backend/forms";

import {
  ContactInstaColor,
  ContactArrow,
  ContactPhone,
  ContactMail,
  ContactNewsletterArrow,
  NewsletterArrowNormal,
  NewsletterTick,
} from "@/components/icons/Icons";

import { useEffect, useState } from "react";
import { contactSchema } from "@/types/Contact";
import { getContact } from "@/sanity/sanity-utils";
import { toast } from "react-toastify";

const Contact = () => {
  const [contacts, setContacts] = useState<contactSchema[]>([]);
  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const submitContctForm = (e: any) => {
    e.preventDefault();
    contactUs(
      inputValue.firstName,
      inputValue.lastName,
      inputValue.email,
      inputValue.message
    ).then(
      () => {
        toast.success("Submitted Successfully!", {
          theme: "colored",
        });
      },
      (error) => {
        toast.error("Erron on submit!", {
          theme: "colored",
        });
      }
    );
  };

  const handleMessageChange = (e: any) => {
    const inputMessage = e.target.value;
    if (inputMessage.length <= 150) {
      setMessage(inputMessage); // Update message state
    }
    setInputValue((v) => ({ ...v, message: e.target.value }));
  };

  const remainingCharacters = 150 - message.length; // Calculate remaining characters

  useEffect(() => {
    async function fetchContacts() {
      const contacts = await getContact();
      setContacts(contacts);
    }

    fetchContacts();
  }, []);

  return (
    <div>
      {contacts.map((contact) => (
        <div key={contact._id} className="contact-section">
          <div className="contact-bg-container">
            <Image
              fill
              src={contact.image.url}
              style={{ objectFit: "cover" }}
              alt="contact-bg"
            />
          </div>
          <div className="contact-details">
            <h1>Get in touch</h1>
            <div className="contact-options">
              <div className="contact-options-wrapper">
                <Link href={`tel: ${contact.phone.phoneLink}`}>
                  <div className="contact-phone">
                    <div className="contact-phone-left">
                      <ContactPhone />
                      <h2>{contact.phone.phoneNo}</h2>
                    </div>
                    <div className="contact-right">
                      <ContactArrow />
                    </div>
                  </div>
                </Link>
                <Link href={contact.email.emailLink}>
                  <div className="contact-mail">
                    <div className="contact-mail-left">
                      <ContactMail />
                      <h2>{contact.email.emailId}</h2>
                    </div>
                    <div className="contact-right">
                      <ContactArrow />
                    </div>
                  </div>
                </Link>
                <Link href={contact.instagram.instagramLink}>
                  <div className="contact-insta">
                    <div className="contact-insta-left">
                      <ContactInstaColor />
                      <h2>{contact.instagram.instagramUser}</h2>
                    </div>
                    <div className="contact-right">
                      <ContactArrow />
                    </div>
                  </div>
                </Link>
              </div>
              <div className="contact-newsletter">
                <form
                  className="contact-newsletter-form"
                  onSubmit={submitContctForm}
                >
                  <h2>Contact Us</h2>
                  <div className="name">
                    <input
                      type="text"
                      placeholder="FIRST NAME"
                      required
                      value={inputValue.firstName}
                      onChange={(e) => {
                        setInputValue((v) => ({
                          ...v,
                          firstName: e.target.value,
                        }));
                      }}
                    />
                    <input
                      type="text"
                      placeholder="LAST NAME"
                      value={inputValue.lastName}
                      onChange={(e) => {
                        setInputValue((v) => ({
                          ...v,
                          lastName: e.target.value,
                        }));
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
                  <div className="character-count">
                    {remainingCharacters}/150
                  </div>
                  <textarea
                    name=""
                    id=""
                    required
                    placeholder="Message"
                    maxLength={150}
                    onChange={handleMessageChange}
                    value={inputValue.message}
                  ></textarea>
                  <button type="submit">
                    <h3>Send</h3>
                    <NewsletterArrowNormal />
                    <NewsletterTick />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
