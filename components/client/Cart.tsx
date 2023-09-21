import Image from "next/image";
import { useAppDispatch } from "@/redux/hook";
import { decrement } from "@/redux/reducer/cartSlice";
interface props {
  onCartCloseClick: any;
}
import { GrClose } from "react-icons/gr";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import Call from "../icons/Call";
import Mail from "../icons/Mail";
import Insta from "../icons/Insta";
import { useEffect, useState } from "react";
import { getProCart, RemoveCartOrder } from "@/backend/Cart";
import { products } from "@/types/Products";

const Cart = ({ onCartCloseClick }: props) => {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<null | any[]>(null);
  const [userData, setUser] = useState<null | any>(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userData") || ""));
  }, []);
  useEffect(() => {
    if (userData)
      getProCart(userData.extra_data.id).then((data) => setProduct(data.data));
  }, [userData]);
  //console.log(product);

  return (
    <div className="cart-main-container">
      <div className="cart-close-container" onClick={onCartCloseClick} />
      <div className="cart-container">
        <div className="cart-products">
          {product &&
            product.map(
              (v: { product: products; how_many: number; id: string }, i) => (
                <div className="cart-items" key={i}>
                  <div className="cart-product-info">
                    <div className="image-container">
                      <Image
                        fill
                        src={v.product.images[0].url}
                        style={{ objectFit: "cover" }}
                        alt="footer-logo"
                      />
                    </div>
                    <div className="cart-item-info">
                      <div className="info">
                        <h3>{v.product.name}</h3>
                        <p>rs {v.product.price}</p>
                      </div>
                      <div className="item-filter">
                        <p>M</p>
                        <p>{v.how_many}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      RemoveCartOrder(v.id).then(() => {
                        getProCart(userData.extra_data.id).then((data) =>
                          setProduct(data.data)
                        );
                        dispatch(decrement());
                      });
                    }}
                  >
                    <GrClose />
                  </button>
                  <div className="line" />
                </div>
              )
            )}
          {product?.length == 0 && <h3>No Product in cart</h3>}
          {/* <div className="cart-items">
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
          </div> */}
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
