import { useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import axios from "axios";

import { AiFillEye, AiFillEyeInvisible, AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoIosArrowBack } from "react-icons/io";

function RegisterForm({
  flipLogin,
  regErrMessage,
  onSubmit,
  setShowResendOTPForm,
  showResendOTPLink,
}) {
  const flipRegPage = () => {
    flipLogin.current.style.transform = "rotateY(0deg)";
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      useremail: "",
      userphonenumber: "",
      password: "",
      confirmPassword: "",
      policy: false,
    },
  });

  const passwordConfirmValidator = (value) =>
    value === watch("password") || "Passwords do not match";

  return (
    <form className="back" onSubmit={handleSubmit(onSubmit)}>
      <p className="sign-in-header">Create an account</p>
      <p
        style={{
          color: "red",
          fontSize: "15px",
          textAlign: "center",
          width: "80%",
          marginBottom: "10px",
        }}
      >
        {regErrMessage}
      </p>
      {showResendOTPLink && (
        <p
          style={{
            color: "gray",
            fontSize: "15px",
            textAlign: "center",
            width: "80%",
            marginBottom: "10px",
          }}
        >
          Already registered ?
          <span
            onClick={() => setShowResendOTPForm(true)}
            style={{
              color: "blue",
              fontWeight: "bold",
            }}
          >
            {" "}
            Click here
          </span>{" "}
          to resend OTP
        </p>
      )}
      <div className="input-main-con">
        <div className="input-name-con">
          <input
            style={{ width: "100%" }}
            type="text"
            placeholder="First name"
            {...register("username", { required: true })}
          />
        </div>
        {errors.username && (
          <p className="validation-text">Kindly enter a first name.</p>
        )}
      </div>

      <div className="input-main-con">
        <div className="input-name-con">
          <input
            style={{ width: "100%" }}
            type="email"
            placeholder="Enter Email"
            {...register("useremail", { required: true })}
          />
        </div>
        {errors.useremail && (
          <p className="validation-text">Kindly enter a valid email address.</p>
        )}
      </div>

      <div className="input-main-con">
        <div className="input-name-con">
          <input
            style={{ width: "100%" }}
            type="number"
            placeholder="Active / Whatsapp Number"
            {...register("userphonenumber", { required: true })}
          />
        </div>
        {errors.userphonenumber && (
          <p className="validation-text">Kindly enter a valid phone number.</p>
        )}
      </div>

      <div className="input-main-con">
        <div className="input-name-con" style={{ position: "relative" }}>
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: true,
              validate: passwordConfirmValidator,
            })}
          />
          <AiFillEye style={{ position: "absolute", right: "54%" }} />
          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword", {
              required: true,
              validate: passwordConfirmValidator,
            })}
          />
          <AiFillEye style={{ position: "absolute", right: "5px" }} />
        </div>
        {errors.password && (
          <p className="validation-text">{errors.password.message}</p>
        )}
        {errors.confirmPassword && (
          <p className="validation-text">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div
        className="policy-checkbox-con"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          color: "red",
        }}
      >
        <div>
          {" "}
          <input type="checkbox" {...register("policy", { required: true })} />
          <span>
            I agree to all <a href="/">Terms & Conditions</a>
          </span>
        </div>

        <div>
          {errors.policy && (
            <p
              className="validation-text"
              style={{
                fontSize: "12px",
                fontStyle: "italic",
                color: "red",
              }}
            >
              Kindly click to accept our terms and conditions
            </p>
          )}
        </div>
      </div>
      <div className="login-btn-link">
        <input
          type="submit"
          className="login-submit-btn"
          // value={loading ? "Uploading..." : "Upload Product"}
        />
      </div>
      <p className="login-registration-link">
        Already have an account ?{" "}
        <span onClick={() => flipRegPage()}>Log in</span>
      </p>
    </form>
  );
}

export default RegisterForm;
