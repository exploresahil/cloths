import { NewsletterArrowNormal, NewsletterTick } from "@/components/icons/Icons";

export default function Newsletter() {
  return (
    <div className="newsletter-form-container">
      <h1>STAY UPDATED</h1>
      <form className="newsletter-form">
        <h2>SIGN UP FOR OUR NEWSLETTER</h2>
        <div className="name">
          <input type="text" placeholder="FIRST NAME" />
          <input type="text" placeholder="LAST NAME" />
        </div>
        <input type="email" name="email" id="email" placeholder="EMAIL" />
        <button type="submit">
          <h3>JOIN THE MOVEMENT</h3>
          <NewsletterArrowNormal />
          <NewsletterTick />
        </button>
      </form>
    </div>
  );
}
