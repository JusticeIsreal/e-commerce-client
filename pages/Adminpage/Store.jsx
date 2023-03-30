import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// firebase imports
import { db, storage } from "../../Firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// COMPONENTS
import Topbar from "../../Components/AdminPageComponents/Topbar";
import Sidebar from "../../Components/AdminPageComponents/Sidebar";
import StoreItems from "../../Components/AdminPageComponents/StoreItems";

// ICONS
import { MdArrowBackIos } from "react-icons/md";

function Store() {
  // display form on and of
  const [formShow, setFormShow] = useState(true);

  // GENERATE IMAGE REVIEW
  const filePickerRef1 = useRef();
  const filePickerRef2 = useRef();
  const filePickerRef3 = useRef();
  const filePickerRef4 = useRef();
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [imageBase64File1, setImageBase64File1] = useState("");
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [imageBase64File2, setImageBase64File2] = useState("");
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [imageBase64File3, setImageBase64File3] = useState("");
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [imageBase64File4, setImageBase64File4] = useState("");

  // CONVERT ALL IMAGE FILE TO BASE 64 STRING AND CREATE PREVIEW

  // image 1
  const uploadFile1 = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajis_store");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/isreal/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const addImageToPost1 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile1(file);
      setImageBase64File1(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target.result;
        setSelectedFile1(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 2
  const uploadFile2 = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajis_store");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/isreal/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const addImageToPost2 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile2(file);
      setImageBase64File2(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target.result;
        setSelectedFile2(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 3
  const uploadFile3 = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajis_store");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/isreal/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const addImageToPost3 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile3(file);
      setImageBase64File3(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target.result;
        setSelectedFile3(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };
  // image 4
  const uploadFile4 = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ajis_store");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/isreal/image/upload`,
        formData
      );

      return response.data.secure_url;
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };
  const addImageToPost4 = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageUrl = await uploadFile4(file);
      setImageBase64File4(imageUrl);

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        const selectedFile = readerEvent.target.result;
        setSelectedFile4(selectedFile);
      };

      reader.readAsDataURL(file);
    }
  };

  // UPLOAD FORM DETAILS TO FIREBASE
  // useform config
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(true);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const productDetails = {
      ...data,
      timestamp: serverTimestamp(),
      image: [
        imageBase64File1,
        imageBase64File2,
        imageBase64File3,
        imageBase64File4,
      ],
    };

    try {
      const colRef = collection(db, "products");
      await addDoc(colRef, { ...productDetails });
      alert("Product added successfully!");
    } catch (error) {
      console.error(error);
    }

    reset();
    // setFormShow(false);

    setLoading(false);
    setSelectedFile1(null);
    setSelectedFile2(null);
    setSelectedFile3(null);
    setSelectedFile4(null);
  };

  // SERVER SIDE RENDERING OF DATA
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(collection(db, "products"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setProductDetails(snapshot.docs);
      }
    );
  }, [db]);

  return (
    <div className="store-main-con">
      <Topbar />
      <Sidebar />
      <div id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Store</h1>

              <ul className="breadcrumb">
                <li>
                  <a href="#">Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a
                    className="active"
                    href="#"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MdArrowBackIos /> Back
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="btn-download"
              onClick={() => setFormShow(!formShow)}
            >
              <b className="bx bxs-cloud-download"> + </b>
              <span className="text">
                {formShow ? "Close Table" : "Add Product"}
              </span>
            </div>
          </div>
          {formShow && (
            <div className="store-form-container">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* PRODUCT PRICE */}
                <label>Product Name</label>
                <input
                  type="text"
                  placeholder="Enter Product Name"
                  {...register("productname", { required: true })}
                />
                {errors.productname && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Name
                  </span>
                )}
                {/* PRODUCT PRICE */}
                <label>Product Price</label>
                <input
                  type="Number"
                  placeholder="Enter Product Price"
                  {...register("productprice", { required: true })}
                />
                {errors.productprice && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Price
                  </span>
                )}
                {/* PRODUCT OLD PRICE */}
                <label>Product Old Price</label>
                <input
                  type="Number"
                  placeholder="Enter Product Old Price"
                  {...register("productoldprice", { required: true })}
                />
                {errors.productoldprice && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Old Price
                  </span>
                )}
                {/* PRODUCT NUMBER */}
                <label>Product Number</label>
                <input
                  type="Number"
                  placeholder="Enter Product Number"
                  {...register("productnumber", { required: true })}
                />
                {errors.productnumber && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Number
                  </span>
                )}
                {/* PRODUCT CATEGORY */}
                <label>Product Category</label>
                <select {...register("productcategory", { required: true })}>
                  <option value="">Select</option>
                  <option value="romance">Romance</option>
                  <option value="scifi">Sci-fi</option>
                  <option value="motivation">Motivation</option>
                </select>
                {errors.productcategory && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Category
                  </span>
                )}
                {/* PRODUCT CLASS */}
                <label>Product Class</label>
                <select {...register("productclass", { required: true })}>
                  <option value="">Select</option>
                  <option value="promo">Promo</option>
                  <option value="newarrival">New</option>
                </select>
                {errors.productclass && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Class
                  </span>
                )}
                {/* PRODUCT DISCRIPTION */}
                <label>Product Description</label>
                <input
                  type="text"
                  placeholder="Enter Product Description"
                  {...register("productdescription", { required: true })}
                />
                {errors.productdescription && (
                  <span
                    className="errror-msg"
                    style={{
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: "red",
                    }}
                  >
                    Kindly Enter Product Description
                  </span>
                )}
                {/* PRODUCT IMAGE*/}
                <label>Product Image</label>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {/* IMAGE 1 */}
                  <input
                    className="file-input"
                    type="file"
                    placeholder="Enter Product Number"
                    ref={filePickerRef1}
                    onChange={addImageToPost1}
                  />
                  <img
                    src={selectedFile1}
                    onClick={() => setSelectedFile1(null)}
                    alt="img"
                    style={{ width: "40px", marginBottom: "10px" }}
                  />
                  {/* IMAGE 2 */}
                  <input
                    className="file-input"
                    type="file"
                    placeholder="Enter Product Number"
                    ref={filePickerRef2}
                    onChange={addImageToPost2}
                  />
                  <img
                    src={selectedFile2}
                    onClick={() => setSelectedFile2(null)}
                    alt="img"
                    style={{ width: "40px", marginBottom: "10px" }}
                  />
                  {/* IMAGE 3 */}
                  <input
                    className="file-input"
                    type="file"
                    placeholder="Enter Product Number"
                    ref={filePickerRef3}
                    onChange={addImageToPost3}
                  />
                  <img
                    src={selectedFile3}
                    onClick={() => setSelectedFile3(null)}
                    alt="img"
                    style={{ width: "40px", marginBottom: "10px" }}
                  />
                  {/* IMAGE 4 */}
                  <input
                    className="file-input"
                    type="file"
                    placeholder="Enter Product Number"
                    ref={filePickerRef4}
                    onChange={addImageToPost4}
                  />
                  <img
                    src={selectedFile4}
                    onClick={() => setSelectedFile4(null)}
                    alt="img"
                    style={{ width: "40px", marginBottom: "10px" }}
                  />
                </div>
                <input
                  type="submit"
                  className="submit-btn"
                  value={loading ? "Uploading..." : "Upload Post"}
                />
              </form>
            </div>
          )}
          <StoreItems productDetails={productDetails} />
        </main>
      </div>
    </div>
  );
}

export default Store;
