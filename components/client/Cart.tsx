import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCard, removeToCard } from "@/redux/reducer/cartSlice";
import { toast } from "react-toastify";
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

import { useRouter } from "next/navigation";

const Cart = ({ onCartCloseClick }: props) => {
  const count = useAppSelector((state) => state.CardReducer.value);
  const userAddress = useAppSelector((state) => state.userSlice.value);
  const router = useRouter();
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

  const removeFromCart = (productId: string) => {
    RemoveCartOrder(productId)
      .then((data) => {
        getProCart(userData.extra_data.id).then(async (data) => {
          dispatch(removeToCard(data.data));
        });
      })
      .then(() => {
        toast.success("Product Removed", {
          theme: "colored",
          autoClose: 800,
          hideProgressBar: true,
        });
      });
  };

  return (
    <div className="cart-main-container">
      <div className="cart-close-container" onClick={onCartCloseClick} />
      <div className="cart-container">
        <div className="cart-products">
          {count &&
            count.map(
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
                      removeFromCart(v.id);
                    }}
                  >
                    <GrClose />
                  </button>
                  <div className="line" />
                </div>
              )
            )}
          {count?.length == 0 && <h3>No Product in cart</h3>}
        </div>

        <button
          type="button"
          onClick={() => {
            /*  console.log(userData.extra_data.address); */

            router.push(
              userAddress.length != 0
                ? "/checkout/shippingInfo/authorize"
                : "/checkout/shippingInfo/"
            );
            onCartCloseClick();
          }}
          disabled={count.length === 0}
        >
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
