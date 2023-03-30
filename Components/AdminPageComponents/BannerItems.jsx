import React from "react";
import Link from "next/link";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../Loader";
function BannerItems({ bannerDetails }) {
  // console.log(productDetails.map((product) => {));

  return (
    <div>
      <div className="table-data">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "60px",
            paddingTop: "50px",
            overflow: "hidden",
          }}
        >
          <div className="head">
            <h3>Banner Post</h3>
          </div>
        </div>

        {bannerDetails.length < 1 ? (
          <Loader />
        ) : (
          <div className="order" style={{ position: "relative" }}>
            <table
              className="table"
              style={{
                width: "100%",
                minWidth: "500px",
              }}
            >
              <thead>
                <tr>
                  <th>Img</th>
                  <th>Name</th>
                  <th>Cat</th>
                  <th>Desc</th>
                  <th>Edit / Delete</th>
                </tr>
              </thead>
              {bannerDetails.map((product) => {
                return (
                  <StoreItemsIndividual
                    key={product.id}
                    id={product.id}
                    bannercategory={product.data().bannercategory}
                    bannerdescription={product.data().bannerscription}
                    bannerimage={product.data().bannerimage}
                    bannername={product.data().bannername}
                  />
                );
              })}
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerItems;

function StoreItemsIndividual({
  id,
  bannercategory,
  bannerdescription,
  bannerimage,
  bannername,
}) {
  const deleteProduct = async () => {};
  return (
    //
    <tbody style={{ color: "black" }}>
      <tr>
        <td>
          <img
            src={bannerimage}
            alt={bannername}
            style={{ width: "40px", borderRadius: "0%", margin: "5px" }}
          />
        </td>
        <td style={{ width: "15%" }}>
          <p>{bannername}</p>
        </td>
        <td style={{ width: "10%", margin: "5px" }}>{bannercategory}</td>
        <td style={{ width: "40%", margin: "5px" }}>
          {bannerdescription.substring(0, 70)} . . .
        </td>
        <td
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "20px",
            width: "100px",
          }}
        >
          <Link href="/AdminDynamic/[bannerItemID]" as={`/AdminDynamic/${id}`}>
            <FaEdit
              style={{ cursor: "pointer", color: "#3c91e6", margin: "0 12px" }}
            />
          </Link>{" "}
          <FaTrashAlt
            style={{ cursor: "pointer", color: "red" }}
            // onClick={() => deleteProduct(id)}
          />
        </td>
      </tr>
    </tbody>
  );
}