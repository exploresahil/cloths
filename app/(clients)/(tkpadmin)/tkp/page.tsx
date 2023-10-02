"use client";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

//Order Id: TKP000001
import DB from "@/backend/Backend.client";
import CDB from "@/storeage";
import { useDispatch } from "react-redux";
import supabase from "@/backend/Backend.client";
import { addUserData } from "@/redux/reducer/userData";
import { getUser } from "@/backend/User";
import { reset } from "@/redux/reducer/cartSlice";
import { reset as Rest } from "@/redux/reducer/userSlice";
import { reset as _Rest } from "@/redux/reducer/userData";

import { useEffect, useState } from "react";
import { BiRefresh } from "react-icons/bi";
import { useRouter } from "next/navigation";

type ProductItem = {
  id: string;
  product: {
    sku: string;
    size: string[];
    name: string;
  };
};

type user = {
  name: string;
};

type DataItem = {
  id: string;
  order_id: string;
  product: ProductItem[];
  user: user;
  email: string;
  phone: string;
  address: string;
  created_at: string;
  more_info: string;
  locality: string;
  payment_confirm: boolean;
  pincode: number;
  city: string;
  state: string;
};

type DataNLItem = {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  last_name: string;
};

type DataContactItem = {
  id: string;
  created_at: string;
  first_name: string;
  email: string;
  last_name: string;
  message: string;
};

const page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [dataUser, setDataUser] = useState<any>([]);
  const [NLdata, setNLData] = useState<DataNLItem[]>([]);
  const [Contactdata, setContactData] = useState<DataContactItem[]>([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const tableRef = useRef(null);
  const newsletterTableRef = useRef(null);
  const contactTableRef = useRef(null);

  const generateFilename = (prefix: string) => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours() % 12 || 12).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `TKP-${prefix}-${dd}-${mm}-${yyyy}-${hh}-${min}-${ampm}`;
  };

  const fetchData = () => {
    setLoading(true);

    fetch("/api/admin/allorders")
      .then((response) => response.json())
      .then((json) => {
        const sortedData = json.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setData(sortedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });

    fetch("/api/admin/newsletter")
      .then((response) => response.json())
      .then((json) => {
        const sortedNLData = json.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setNLData(sortedNLData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });

    fetch("/api/admin/contact")
      .then((response) => response.json())
      .then((json) => {
        const sortedContactData = json.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setContactData(sortedContactData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("orders All -->", data);

  const handleRefreshClick = () => {
    fetchData();
  };

  const { onDownload: onOrdersDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: generateFilename("Orders"),
    sheet: "Orders",
  });

  const { onDownload: onNewsletterDownload } = useDownloadExcel({
    currentTableRef: newsletterTableRef.current,
    filename: generateFilename("Newsletter"),
    sheet: "Newsletter",
  });

  const { onDownload: onContactDownload } = useDownloadExcel({
    currentTableRef: contactTableRef.current,
    filename: generateFilename("ContactUs"),
    sheet: "ContactUs",
  });

  function formatSizes(sizes: string[]) {
    return sizes.join(", ");
  }

  function formatDateTime(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-GB", options);
    return formattedDate;
  }

  function getRowColor(created_at: string) {
    const currentDate = new Date();
    const orderDate = new Date(created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    if (orderDate >= oneDayAgo && orderDate <= currentDate) {
      return "blue-order"; // blue color for orders less than 1 day old
    } else if (orderDate >= oneWeekAgo && orderDate <= currentDate) {
      return "green-order"; // green color for recent orders
    } else if (orderDate > currentDate) {
      return "black-order"; // Black color for future orders
    } else {
      return ""; // Default color for other orders
    }
  }

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  let serialNumber = 1;

  useEffect(() => {
    (async () => {
      const data: any = await CDB.getItem("user-data");

      if (data != undefined && data) {
        dispatch(addUserData(data));
        const orders = await supabase
          .from("Order")
          .select("*")
          .eq("user", data.extra_data?.id);
        setDataUser(orders.data);
        //console.log("orders:", orders);
      } else {
        getUser().then(async (data) => {
          if (data?.data.user) {
            dispatch(addUserData(data));
            const orders = await supabase
              .from("Order")
              .select("*")
              .eq("user", data.extra_data?.id);
            setDataUser(orders.data);
          }
        });
      }
      //console.log(data);
    })();
  }, []);

  return (
    <div className="tkp-admin-main">
      <h2>Admin</h2>
      <div className="tkp-admin-title">
        <div className="tkp-admin-menu">
          <button
            type="button"
            onClick={() => handleTabClick("orders")}
            className={activeTab === "orders" ? "active" : ""}
          >
            Orders
          </button>
          <button
            type="button"
            onClick={() => handleTabClick("newsletter")}
            className={activeTab === "newsletter" ? "active" : ""}
          >
            Newsletter
          </button>
          <button
            type="button"
            onClick={() => handleTabClick("contactus")}
            className={activeTab === "contactus" ? "active" : ""}
          >
            Contact Us
          </button>
        </div>
        <div className="tkp-admin-option">
          {loading ? (
            <div className="loading">
              <BiRefresh />
            </div>
          ) : (
            <button
              type="button"
              className="refresh"
              onClick={handleRefreshClick}
              title="refresh"
            >
              <BiRefresh />
            </button>
          )}
          <button
            type="button"
            onClick={async () => {
              await DB.auth.signOut();
              CDB.clear();
              dispatch(reset());
              dispatch(Rest());
              dispatch(_Rest());
              router.push("/login");
            }}
          >
            Sign Out
          </button>
          {activeTab === "orders" && (
            <button type="button" onClick={onOrdersDownload}>
              Download
            </button>
          )}
          {activeTab === "newsletter" && (
            <button type="button" onClick={onNewsletterDownload}>
              Download
            </button>
          )}
          {activeTab === "contactus" && (
            <button type="button" onClick={onContactDownload}>
              Download
            </button>
          )}
        </div>
      </div>
      <div className="table-admin-info">
        <p>
          with in 24hr: <span className="blue" />
        </p>
        <p>
          with in 7 days: <span className="green" />
        </p>
        <p>
          before 7 days: <span className="black" />
        </p>
      </div>

      {activeTab === "orders" && (
        <div className="table-responsive">
          <table ref={tableRef}>
            <thead>
              <tr className="title">
                <th className="srno">Sr/No</th>
                <th>Order No.</th>
                <th>Product SKUs</th>
                <th>Products</th>
                <th>Ordered By</th>
                <th>Mob. No.</th>
                <th>Email</th>
                <th>Order Address</th>
                <th>Ordered On</th>
              </tr>
            </thead>

            <tbody>
              {data.map(
                (item) =>
                  item.payment_confirm && (
                    <tr key={item.id} className={getRowColor(item.created_at)}>
                      <td>{serialNumber++}</td>
                      <td>{item.order_id}</td>
                      <td>
                        {item.product.map((products) => (
                          <div key={products.id}>
                            • {products.product.sku}: (
                            {formatSizes(products.product.size)}),
                          </div>
                        ))}
                      </td>
                      <td>
                        {item.product.map((products) => (
                          <div key={products.id}>
                            • {products.product.name}: (
                            {formatSizes(products.product.size)}),
                          </div>
                        ))}
                      </td>
                      <td>{item.user.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                      <td>
                        {item.address}, Locality: {item.locality}, City:{" "}
                        {item.city}, Pincode: {item.pincode}, State:{" "}
                        {item.state}, More Info: {item.more_info}
                      </td>
                      <td>{formatDateTime(item.created_at)}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "newsletter" && (
        <div className="table-responsive nl-table">
          <table ref={newsletterTableRef}>
            <thead>
              <tr className="title">
                <th className="srno">Sr/No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {NLdata.map((item) => (
                <tr key={item.id} className={getRowColor(item.created_at)}>
                  <td>{serialNumber++}</td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.email}</td>
                  <td>{formatDateTime(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "contactus" && (
        <div className="table-responsive contact-table">
          <table ref={contactTableRef}>
            <thead>
              <tr className="title">
                <th className="srno">Sr/No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {Contactdata.map((item) => (
                <tr key={item.id} className={getRowColor(item.created_at)}>
                  <td>{serialNumber++}</td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.email}</td>
                  <td>{item.message}</td>
                  <td>{formatDateTime(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default page;
