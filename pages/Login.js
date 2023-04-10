import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";

import OtpInput from "react-otp-input";

import LoginForm from "../Components/Homepage/LoginForm";
import RegisterForm from "../Components/Homepage/RegisterForm";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRouter } from "next/router";

function Login() {
  let flipLogin = useRef();

  // function to flip te login page to registration page
  const flipLoginPage = () => {
    flipLogin.current.style.transform = "rotateY(180deg)";
  };
  const flipRegPage = () => {
    flipLogin.current.style.transform = "rotateY(0deg)";
  };

  // useform hooks
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // submit form
  const onLogin = async (data, e) => {
    console.log(data);
  };

  // RIGISTER USER
  const [regErrMessage, setRegErrMessage] = useState();
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showResendOTPForm, setShowResendOTPForm] = useState(false);
  const [showResendOTPLink, setShowResendOTPLink] = useState(false);

  const onSubmit = async (data) => {
    axios
      .post("http://localhost:1234/api/v1/userverification/registeruser", data)
      .then((resp) => {
        // console.log(resp.data.data.userId);
        localStorage.setItem("userId", resp.data.data.userId);
        setShowOTPForm(true);
        setShowResendOTPForm(false);
      })
      .catch((error) => {
        // console.log(error.response);
        setRegErrMessage(error.response.data.error);
        setShowResendOTPLink(true);
        setTimeout(() => {
          setRegErrMessage("");
        }, 3000);
      });
    reset();
  };

  // RESEND OTP

  return (
    <div className="login-page-con">
      <div className="container">
        <div className="card" ref={flipLogin}>
          {/* LOGIN FORM  */}
          <LoginForm flipLogin={flipLogin} />
          {/* REGISTRATION */}

          <RegisterForm
            flipLogin={flipLogin}
            regErrMessage={regErrMessage}
            onSubmit={onSubmit}
            setShowResendOTPForm={setShowResendOTPForm}
            showResendOTPLink={showResendOTPLink}
          />
        </div>
        {showResendOTPForm && (
          <ResendOTP
            setShowResendOTPForm={setShowResendOTPForm}
            setShowOTPForm={setShowOTPForm}
          />
        )}
        {showOTPForm && (
          <OTPInput
            setShowOTPForm={setShowOTPForm}
            setShowResendOTPForm={setShowResendOTPForm}
          />
        )}
      </div>
    </div>
  );
}

export default Login;

// ENTER OTP
function OTPInput({ setShowOTPForm, setShowResendOTPForm }) {
  const [otp, setOtp] = useState("");

  // retrive userID from local storage
  const userId = localStorage.getItem("userId");

  const enterOTP = async () => {
    axios
      .post("http://localhost:1234/api/v1/userverification/verifyotp", {
        userId,
        otp,
      })
      .then((resp) => {
        console.log(resp);
        localStorage.removeItem("userId");
        setShowOTPForm(false);
        setShowResendOTPForm(false);
        location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        width: "100%",
        height: "550px",
        background: "white",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "550px",
          borderRadius: "5px",
          border: "2px solid #3c91e6",
        }}
      >
        <p
          className="session-note"
          style={{
            fontSize: "13px",
            width: "90%",
            color: "#3c91e6",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          A OTP has been sent to the email address you provided , Enter OTP
          below to verify your email address
        </p>
        <label
          style={{
            fontSize: "20px",
            color: "#3c91e6",
            marginBottom: "20px",
          }}
        >
          Enter OTP
        </label>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            width: "250px",
            height: "50px",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          inputStyle={{
            border: "2px solid #3c91e6",
            width: "100%",
            height: "100%",
            fontSize: "30px",
          }}
        />
        <button
          type="button"
          style={{
            width: "250px",
            height: "50px",
            marginTop: "50px",
            borderRadius: "5px",
            fontSize: "20px",
            color: "white",
            background: " #3c91e6",
            border: "2px solid #3c91e6",
          }}
          onClick={() => enterOTP()}
        >
          Verify Email
        </button>
      </div>
    </div>
  );
}

// RESEND OTP

function ResendOTP({ setShowResendOTPForm, setShowOTPForm }) {
  const emailRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    const useremail = emailRef.current.value;
    // retrive userID from local storage
    const userId = localStorage.getItem("userId");

    axios
      .post("http://localhost:1234/api/v1/userverification/resendotp", {
        useremail,
        userId,
      })
      .then((resp) => {
        console.log(resp);
        setShowResendOTPForm(false);
        setShowOTPForm(true);
        // location.reload();
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  return (
    <div
      style={{
        position: "absolute",
        top: "0px",
        width: "100%",
        height: "550px",
        background: "white",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "550px",
          borderRadius: "5px",
          border: "2px solid #3c91e6",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "8px",
            top: "5px",
            cursor: "pointer",
            fontSize: "20px",
            color: "#3c91e6",
          }}
          onClick={() => setShowResendOTPForm(false)}
        >
          {"< back"}
        </div>

        <form onSubmit={handleSubmit}>
          <label
            htmlFor="email"
            style={{
              fontSize: "20px",
              color: "#3c91e6",
              marginBottom: "20px",
            }}
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            style={{
              width: "250px",
              padding:"5px",
              height: "50px",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              border: "2px solid #3c91e6",
              borderRadius: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              width: "250px",
              height: "50px",
              marginTop: "30px",
              borderRadius: "5px",
              fontSize: "20px",
              color: "white",
              background: " #3c91e6",
              border: "2px solid #3c91e6",
            }}
            // onClick={() => enterOTP()}
          >
            Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}