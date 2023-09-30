"use client";

import NavLinks from "@/components/client/NavLinks";
import Link from "next/link";
import { Link as ScrollLink } from "react-scroll";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiSearch } from "react-icons/fi";
import { useAppSelector } from "@/redux/hook";
import { useAppDispatch } from "@/redux/hook";
import { set } from "@/redux/reducer/cartSlice";
import { set as Set } from "@/redux/reducer/userSlice";
import { Newsletter as NL } from "@/backend/forms";
import { toast } from "react-toastify";
import {
  Bag,
  User,
  Arrow,
  Mail,
  Call,
  Insta,
  Menu,
  MenuClose,
  TkpLogo,
} from "@/components/icons/Icons";
import Cart from "./Cart";
import { User as user } from "@supabase/supabase-js";
import { getRedx, getUser } from "@/backend/User";
import { getProCart } from "@/backend/Cart";
import Supabase from "@/backend/Backend.client";
import CDB from "@/storeage";
import { addUserData } from "@/redux/reducer/userData";

const Header = () => {
  const count = useAppSelector((state) => state.CardReducer.value);
  const userData = useAppSelector((state) => state.userDataSlice.value);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  const submitNewsLetter = (e: any) => {
    e.preventDefault();
    NL(inputValue.firstName, inputValue.lastName, inputValue.email).then(
      () => {
        toast.success("Submitted Successfully!", {
          theme: "colored",
          autoClose: 800,
        });
      },
      (error) => {
        toast.error("Erron on submit!", {
          theme: "colored",
          autoClose: 800,
        });
      }
    );
  };



  const handleCartClickOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClickClose = () => {
    setIsCartOpen(false);
  };
  // console.log(userData);
  useEffect(() => {
    (async () => {
      const data = await CDB.getItem("user-data");

      if (data != undefined) dispatch(addUserData(data))
      console.log(data);
    })();

  }, [])
  useEffect(() => {
    //push
    (async () => {
      if (userData.extra_data.id) {
        await getRedx(userData.extra_data.id).then((data_) => {
          console.log("red->", data_);
          dispatch(Set(data_.data?.at(0).Redux.userSlice.value));
          dispatch(set(data_.data?.at(0).Redux.CardReducer.value));
        });
      } else {
        console.error("dam.extra_data is undefined"); // Handle this case as needed
      }
    })()
  }, [userData])
  useEffect(() => {
    // (async () => {
    //   const dam = await getUser();
    //   console.log(dam);

    //   if (dam.extra_data) {
    //     await getRedx(dam.extra_data.id).then((data_) => {
    //       console.log("red->", data_);
    //       dispatch(Set(data_.data?.at(0).Redux.userSlice.value));
    //       dispatch(set(data_.data?.at(0).Redux.CardReducer.value));
    //     });
    //   } else {
    //     console.error("dam.extra_data is undefined"); // Handle this case as needed
    //   }

    //   if (dam.data !== null) {
    //     setUserData(dam);
    //   } else setUserData(undefined);
    // })();

    let prevScrollPos = window.scrollY || document.documentElement.scrollTop;
    const handleScroll = () => {
      const currentScrollPos =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScrollPos > 0 && currentScrollPos > prevScrollPos);

      if (currentScrollPos > prevScrollPos && isOpen) {
        setIsOpen(false);
      }

      if (currentScrollPos > prevScrollPos && isCartOpen) {
        setIsCartOpen(false);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen, isCartOpen]);

  useEffect(() => {
    if (pathname === "/" && typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      const tl = gsap.timeline();

      tl.fromTo(
        "#tkpLogo",
        {
          fill: "black",
        },
        {
          fill: "white",
          scrollTrigger: {
            trigger: "#logo-container",
            //markers: true,
            start: "top top",
            end: "180px top",
            scrub: 0.5,
          },
        }
      );

      tl.fromTo(
        "#tkpLogo",
        {},
        {
          fill: "black",
          scrollTrigger: {
            trigger: "#logo-container",
            //markers: true,
            start: "50% top",
            end: "50% top",
            scrub: 0.5,
          },
        }
      );
    }
  }, [pathname]);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuCloseClick = () => {
    setIsOpen(false);
  };

  const logoclick = () => {
    setIsOpen(false);
    router.push("/");
  };

  const handleProductsClick = (selectedCategory: any) => {
    router.push(`/products?category=${selectedCategory}`);
    setIsOpen(false);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    window.location.href = `/products?search=${searchQuery}`;
    // router.push(,{});
    setSearchQuery("");
  };

  return (
    <header className={`${isScrolled ? "scrollDown" : ""}`}>
      <ScrollLink
        to="bodyTop"
        offset={-180}
        className="logo-container"
        smooth={true}
        duration={1000}
        spy={true}
      >
        <TkpLogo onClick={logoclick} id="tkpLogo" />
      </ScrollLink>
      <div className="search-container">
        <form action="#" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">
            <FiSearch size={14} />
          </button>
        </form>
      </div>
      <div className="user-menu">
        <div className="user-menu-ecommercs">
          <button className="cart" onClick={handleCartClickOpen}>
            <Bag />
            {count.length !== 0 && <p>{count.length}</p>}
          </button>
          <div className="line" />
          <button
            onClick={() => {
              console.log(userData);

              router.push(userData.data?.user?.id ? "/user" : "/login");
            }}
          >
            <User />
          </button>
        </div>
        <div
          className={`bgDarkMenu ${isOpen ? "fadeIn" : ""}`}
          onClick={handleMenuCloseClick}
        />
        <button className="menu-button" onClick={handleMenuClick}>
          {isOpen ? <MenuClose /> : <Menu />}
        </button>
        <nav className={`nav-d ${isOpen ? "navOpen" : ""}`}>
          <div className={`menu ${isOpen ? "fadeInMenu" : ""}`}>
            <div className="left section">
              <ul>
                <li className="title">SHOP</li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Shirt Kurta")}
                  >
                    shirt kurta
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Crop Tops")}
                  >
                    crop tops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Co-Ords")}
                  >
                    co-ords
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Samosa Tote Bag")}
                  >
                    samosa tote bag
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Laptop Sleeves")}
                  >
                    laptop sleeves
                  </a>
                </li>
                <NavLinks
                  pageLink="#"
                  title="View All"
                  classTitle="nav-item"
                  onClick={() => handleProductsClick("view all")}
                />
              </ul>
            </div>
            <div className="center section">
              <ul>
                <li className="title">INFO</li>
                <NavLinks
                  pageLink="/about"
                  title="about"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
                <NavLinks
                  pageLink="/contact"
                  title="contact"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
                <NavLinks
                  pageLink="/blogs"
                  title="blog"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
                <NavLinks
                  pageLink="/policies/privacy"
                  title="privacy policy"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
                <NavLinks
                  pageLink="/policies/refund"
                  title="refund policy"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
                <NavLinks
                  pageLink="/policies/shipping"
                  title="shipping policy"
                  classTitle="nav-item"
                  onClick={handleMenuCloseClick}
                />
              </ul>
            </div>
            <div className="right section">
              <div className="text">
                <div className="dot" />
                <div className="title">
                  <h2>coming soon!</h2>
                  <p>
                    Be the first to know about our latest collections, upcoming
                    events and special discounts.
                  </p>
                </div>
              </div>
              <form onSubmit={submitNewsLetter}>
                <h2>sign up for our newsletter</h2>
                <div className="name">
                  <input
                    type="text"
                    placeholder="First Name"
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
                    placeholder="Last Name"
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
                  placeholder="Email"
                  required
                  value={inputValue.email}
                  onChange={(e) => {
                    setInputValue((v) => ({ ...v, email: e.target.value }));
                  }}
                />
                <button type="submit">
                  <h3>JOIN THE MOVEMENT</h3>
                  <Arrow />
                </button>
              </form>
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
        </nav>
        <nav className={`nav-mobile ${isOpen ? "navOpen" : ""}`}>
          <div className={`menu ${isOpen ? "fadeInMenu" : ""}`}>
            <div className="left section">
              <ul>
                <li className="title">SHOP</li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Shirt Kurta")}
                  >
                    shirt kurta
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Crop Tops")}
                  >
                    crop tops
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Co-Ords")}
                  >
                    co-ords
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Samosa Tote Bag")}
                  >
                    samosa tote bag
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="nav-item"
                    onClick={() => handleProductsClick("Laptop Sleeves")}
                  >
                    laptop sleeves
                  </a>
                </li>
                <NavLinks
                  pageLink="#"
                  title="View All"
                  classTitle="nav-item"
                  onClick={() => handleProductsClick("view all")}
                />
              </ul>
            </div>
            <div className="menu-second">
              <div className="center section">
                <ul>
                  <li className="title">INFO</li>
                  <NavLinks
                    pageLink="/about"
                    title="about"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                  <NavLinks
                    pageLink="/contact"
                    title="contact"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                  <NavLinks
                    pageLink="/blogs"
                    title="blog"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                  <NavLinks
                    pageLink="/policies/privacy"
                    title="privacy policy"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                  <NavLinks
                    pageLink="/policies/refund"
                    title="refund policy"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                  <NavLinks
                    pageLink="/policies/shipping"
                    title="shipping policy"
                    classTitle="nav-item"
                    onClick={handleMenuCloseClick}
                  />
                </ul>
              </div>
              <div className="right section">
                <div className="text">
                  <div className="dot" />
                  <div className="title">
                    <h2>coming soon!</h2>
                    <p>
                      Be the first to know about our latest collections,
                      upcoming events and special discounts.
                    </p>
                  </div>
                </div>
                <form action="#">
                  <h2>sign up for our newsletter</h2>
                  <div className="name">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                  />
                  <button type="submit">
                    <h3>JOIN THE MOVEMENT</h3>
                    <Arrow />
                  </button>
                </form>
              </div>
            </div>
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
        </nav>
      </div>
      {isCartOpen && <Cart onCartCloseClick={handleCartClickClose} />}
    </header>
  );
};

export default Header;
