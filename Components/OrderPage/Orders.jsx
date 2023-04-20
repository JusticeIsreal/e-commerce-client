import React, { useEffect, useState } from "react";
import Link from "next/link";
// icon
import { FaMoneyCheck } from "react-icons/fa";
import { useRouter } from "next/router";
function Orders({ userTransaction }) {
  const router = useRouter();
  const orderStatus = ["All", "Processing", "Transit", "Delvered"];

  // state for category
  const [category, setCategory] = useState("All");

  // state for products
  const [products, setProducts] = useState(userTransaction);

  // filter products based on category
  useEffect(() => {
    if (category === "All") {
      setProducts(userTransaction);
    } else {
      setProducts(userTransaction.filter((item) => item.status === item));
    }
  }, [category, userTransaction, products, category, router]);

  return (
    <div className="oders-con">
      <div className="order-page-top">
        <h1>TRANSACTIONS</h1>
        <div className="order-status">
          {orderStatus.map((btn, index) => (
            <p
              key={index}
              className={`${
                btn === category ? "category active-category" : "category"
              }`}
              onClick={() => setCategory(btn)}
            >
              {btn}
            </p>
          ))}
        </div>
      </div>
      <div className="each-order-con">
        {products.map((order) => (
          <TransactionReceipt key={order._id} {...order} />
        ))}
      </div>
    </div>
  );
}

export default Orders;

function TransactionReceipt({
  _id,
  timestamp,
  totalAmount,
  status,
  product,

  transactionstatus,
}) {
  // conver time stamp
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const formattedTimestamp = formatDate(timestamp);

  return (
    <Link href={`/ClientDynamic/Reciept/${_id}`}>
      {}
      <div className="each-order">
        <div className="order-icon">
          <FaMoneyCheck />
        </div>
        <div className="order-details">
          <p className="timestamp">{formattedTimestamp}</p>
          <p className="productnames">
            {product.map((name) => name.productname.split(" ")[0] + ",  ")}
          </p>
          <p
            className="productnames"
            style={{ color: "black" }}
          >
            {" "}
            ₦ {totalAmount.toLocaleString()}
          </p>
          <p style={{ color: "gray", fontWeight: "bold" }}>
            Payment:{" "}
            <span
              style={{
                color: (() => {
                  switch (transactionstatus) {
                    case "pending":
                      return "#db504a";
                    case "success":
                      return "#3d91e6";
                    case "failed":
                      return "#db504a";
                    default:
                      return "#db504a";
                  }
                })(),
                fontWeight: "normal",
              }}
            >
              {transactionstatus}
            </span>
          </p>
        </div>
        <div className="order-payment-status">
          <p
            style={{
              color: (() => {
                switch (status) {
                  case "Processing":
                    return "#db504a";
                  case "Transit":
                    return "#ffce26";
                  case "Delivered":
                    return "#3d91e6";
                  default:
                    return "#3d91e6";
                }
              })(),
            }}
          >
            {status}
          </p>
        </div>
      </div>
    </Link>
  );
}
