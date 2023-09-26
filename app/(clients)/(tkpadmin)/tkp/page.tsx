"use client";
import { useRef } from "react";
import { useDownloadExcel } from "react-export-table-to-excel";

//Order Id: TKP000001

import { useEffect, useState } from "react";

type ProductItem = {
  id: string;
  product: {
    sku: string;
    size: string[];
    name: string;
  };
};

type DataItem = {
  id: string;
  product: ProductItem[];
  user: string;
  phone: string;
  address: string;
  created_at: string;
  more_info: string;
  // other properties...
};

const page = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [activeTab, setActiveTab] = useState("orders");

  const tableRef = useRef(null);

  const generateFilename = () => {
    const date = new Date();
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "pm" : "am";

    return `TKP-Orders-${dd}-${mm}-${yyyy}-${hh}-${min}-${ampm}`;
  };

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: generateFilename(),
    sheet: "Users",
  });

  useEffect(() => {
    // Fetch data from your API here
    fetch("/api/admin/allorders") // Assuming your API endpoint is defined in an "order.ts" file inside the "api" directory
      .then((response) => response.json())
      .then((json) => {
        // Sort orders by date and time in descending order
        const sortedData = json.data.sort(
          (a: any, b: any) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setData(sortedData);
      });
  }, []);

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

  // Function to determine the row color based on the date
  function getRowColor(created_at: string) {
    const currentDate = new Date();
    const orderDate = new Date(created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (orderDate >= oneWeekAgo && orderDate <= currentDate) {
      return "recent-order"; // green color for recent orders
    } else if (orderDate > currentDate) {
      return "future-order"; // Black color for future orders
    } else {
      return ""; // Default color for other orders
    }
  }

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="tkp-admin-main">
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
          <button type="button">Sign Out</button>
          {activeTab === "orders" && (
            <button type="button" onClick={onDownload}>
              Download
            </button>
          )}
        </div>
      </div>
      {activeTab === "orders" && (
        <div className="table-responsive">
          <table ref={tableRef}>
            <thead>
              <tr className="title">
                <th>Sr/No</th>
                <th>Order No.</th>
                <th>Product SKUs</th>
                <th>Products</th>
                <th>Ordered By</th>
                <th>Mob. No.</th>
                <th>Order Address</th>
                <th>Ordered On</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id} className={getRowColor(item.created_at)}>
                  <td>{data.length - index}</td>
                  <td>{item.id}</td>
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
                  <td>{item.user}</td>
                  <td>{item.phone}</td>
                  <td>
                    {item.address}, More Info: {item.more_info}
                  </td>
                  <td>{formatDateTime(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "newsletter" && (
        <div className="newsletter-main">NewsLetter</div>
      )}
      {activeTab === "contactus" && (
        <div className="contactus-main">Contact Us</div>
      )}
    </div>
  );
};

export default page;
