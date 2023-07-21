import Image from "next/image";

interface props {
  onCartCloseClick: any;
}
import productImage from "@/public/assets/images/products/product-img.png";
import { GrClose } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Call from "../icons/Call";
import Mail from "../icons/Mail";
import Insta from "../icons/Insta";

const Cart = ({ onCartCloseClick }: props) => {
  return (
    <div className="cart-main-container">
      <div className="cart-close-container" onClick={onCartCloseClick} />
      <div className="cart-container">
        <div className="cart-products">
          <div className="cart-items">
            <div className="cart-product-info">
              <div className="image-container">
                <Image
                  fill
                  src={productImage}
                  style={{ objectFit: "cover" }}
                  alt="footer-logo"
                />
              </div>
              <div className="cart-item-info">
                <div className="info">
                  <h3>striped shirt kurta</h3>
                  <p>rs 850</p>
                </div>
                <div className="item-filter">
                  <p>M</p>
                  <p>1</p>
                </div>
              </div>
            </div>
            <button>
              <GrClose />
            </button>
            <div className="line" />
          </div>
          <div className="cart-items">
            <div className="cart-product-info">
              <div className="image-container">
                <Image
                  fill
                  src={productImage}
                  style={{ objectFit: "cover" }}
                  alt="footer-logo"
                />
              </div>
              <div className="cart-item-info">
                <div className="info">
                  <h3>striped shirt kurta</h3>
                  <p>rs 850</p>
                </div>
                <div className="item-filter">
                  <p>M</p>
                  <p>1</p>
                </div>
              </div>
            </div>
            <button>
              <GrClose />
            </button>
            <div className="line" />
          </div>
        </div>

        <button>
          PROCEED TO CHECKOUT{" "}
          <div className="arrow">
            <BsArrowRight />
          </div>
        </button>
        <div className="socials">
          <Link href="#">
            <Call />
          </Link>
          <Link href="#">
            <Mail />
          </Link>
          <Link href="#">
            <Insta />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
