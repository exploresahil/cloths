"use client";

import Image from "next/image";
import Link from "next/link";

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
import { contactSchema } from "@/sanity/types/Contact";
import { getContact } from "@/sanity/sanity-utils";

const Contact = () => {
  const [contacts, setContacts] = useState<contactSchema[]>([]);

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
                <form className="contact-newsletter-form">
                  <h2>SIGN UP FOR OUR NEWSLETTER</h2>
                  <div className="name">
                    <input type="text" placeholder="FIRST NAME" />
                    <input type="text" placeholder="LAST NAME" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="EMAIL"
                  />
                  <button type="submit">
                    <h3>JOIN THE MOVEMENT</h3>
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
