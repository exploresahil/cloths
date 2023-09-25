import React from "react";

const page = () => {
  return (
    <div className="tkp-admin-main">
      <div className="tkp-admin-title">
        <h3>Orders</h3>
        <div className="tkp-admin-option">
          <button type="button">Sign Out</button>
          <button type="button">Download</button>
        </div>
      </div>

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
