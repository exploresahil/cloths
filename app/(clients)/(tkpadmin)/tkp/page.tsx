"use client";

import { useEffect, useState } from "react";

type ProductItem = {
  id: string;
  sku: string;
  size: string[];
  // other properties...
};

type DataItem = {
  id: string;
  product: ProductItem[];
  // other properties...
};

const page = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Fetch data from your API here
    fetch("/api/admin/allorders") // Assuming your API endpoint is defined in an "order.ts" file inside the "api" directory
      .then((response) => response.json())
      .then((json) => setData(json.data));
  }, []);

  function formatSizes(sizes: string[]) {
    return sizes.join(", ");
  }

  return (
    <div className="tkp-admin-main">
      <div className="tkp-admin-title">
        <h3>Orders</h3>
        <div className="tkp-admin-option">
          <button type="button">Sign Out</button>
          <button type="button">Download</button>
        </div>
      </div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* {data.map((item: any) => (
        <li key={item.id}>
          <h2>ID: {item.id}</h2>
          <p>
            Address: {item.address}, More Info: {item.more_info}
          </p>
          <p>Mob. No: {item.phone}</p>
          <ul>
            Porducts:
            <li>
              {item.product.map((product: any) => (
                <li key={product.id}>
                  <p>
                    • {product.product.name}, SKU: {product.product.sku} size:{" "}
                    {formatSizes(product.product.size)}
                  </p>
                </li>
              ))}
            </li>
          </ul>
        </li>
      ))} */}
      {/* <table>
        <thead>
          <tr className="title">
            <th>Sr/No</th>
            <th>Order No.</th>
            <th>Product SKUs</th>
            <th>Products</th>
            <th>Ordered By</th>
            <th>Mob. No.</th>
            <th>Order Address</th>
            <th>Order Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>
                {item.product.map((product) => (
                  <div key={product.id}>
                    {product.product.sku} ({formatSizes(product.product.size)})
                  </div>
                ))}
              </td>
              <td>
                {item.product.map((product) => (
                  <div key={product.id}>{product.product.name}</div>
                ))}
              </td>
              <td>{item.user}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <table>
        <tr className="title">
          <td>Sr/No</td>
          <td>Order No.</td>
          <td>Product SKUs</td>
          <td>Products</td>
          <td>Ordered By</td>
          <td>Mob. No.</td>
          <td>Order Address</td>
          <td>Order Date</td>
        </tr>
        <tr>
          <td>01</td>
          <td>Order No.</td>
          <td>Product SKUs</td>
          <td>Products</td>
          <td>Ordered By</td>
          <td>Mob. No.</td>
          <td>Order Address</td>
          <td>Order Date</td>
        </tr>
        <tr>
          <td>02</td>
          <td>Order No.</td>
          <td>Product SKUs</td>
          <td>Products</td>
          <td>Ordered By</td>
          <td>Mob. No.</td>
          <td>Order Address</td>
          <td>Order Date</td>
        </tr>
      </table>
    </div>
  );
};

export default page;
