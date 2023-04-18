import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { TiArrowBack } from "react-icons/ti";

const emoji =
  "https://res.cloudinary.com/isreal/image/upload/v1681808231/downloai-removebg-preview_qgmagz.png";

function Modal({ setLoginTriger }) {
  // GO BACK
  const router = useRouter();
  function goBack() {
    router.back();
  }
  return (
    <div className="modal-main-con">
      <div className="modal-relative">
        <div className="modal-card">
          <button onClick={() => setLoginTriger(false)} className="go-back">
            <TiArrowBack />
            Back
          </button>
          <div className="modal-img-con">
            <img src={emoji} alt="emoji" />
          </div>
          <div className="modal-text">
            <p> To access this Function you need to sign in</p>{" "}
            <Link href="/Login" className="modal-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
