import Image from "next/image";
import { Accordion, AccordionItem as Item } from "@szhsin/react-accordion";
import { FC, useEffect, useState } from "react";

import AccordionDown from "@/public/assets/images/blogs/AccordionDown.svg";
import { getFAQs } from "@/sanity/sanity-utils";

interface AccordionItemProps {
  header: any;
  children: any;
}

interface FAQs {
  _id: string;
  _createdAt: Date;
  question: string;
  answer: Text;
}

const AccordionItem: FC<AccordionItemProps> = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={
      <>
        {header}
        <Image
          className="accordion-down"
          src={AccordionDown}
          alt="accordion-down"
          sizes="100%"
        />
      </>
    }
  />
);

function FAQs() {
  const [faqs, setFaqs] = useState<FAQs[]>([]);

  useEffect(() => {
    async function fetchFaqs() {
      const faqs = await getFAQs();
      setFaqs(faqs);
    }

    fetchFaqs();
  });

  return (
    <div className="faq-section">
      <div className="faq-heading">
        <h2>FAQs</h2>
        <h1>Frequently Asked Questions</h1>
      </div>
      <div className="faq-container">
        {faqs.map((faq) => (
          <div key={faq._id} className="faq-content">
            <Accordion transition transitionTimeout={250}>
              <AccordionItem header={faq.question}>{faq.answer}</AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;
