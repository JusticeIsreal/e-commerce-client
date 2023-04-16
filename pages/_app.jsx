import Head from "next/head";
import "../styles/HomePage/Style.css";
import "../styles/ProductPage/style.css";
import "../styles/AdminPage/App.css";
import "../styles/DynamicPage/clientSingleproduct/style.css";
import "../styles/DynamicPage/adminSingleproduct/style.css";
import "../styles/DynamicPage/transactionreceipt/style.css";
import "../styles/CartPage/style.css";
import "../styles/RegistrationLogin/LoginStyle.css";
import "../styles/OrderPage/style.css";
import { AppProps } from "next/app";
import { AuthGuard } from "./api/auth/AuthGuard.";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";

export default function MyApp({ Component, pageProps }) {
  const [preRender, setPreRender] = useState(false);

  useEffect(() => {
    setPreRender(true);
  }, []);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>E-commerce</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      {preRender ? (
        <>
          {Component.requireAuth ? (
            <AuthGuard>
              <Component {...pageProps} />{" "}
            </AuthGuard>
          ) : (
            <>
              <Component {...pageProps} />
            </>
          )}
        </>
      ) : (
        <div style={{ marginTop: "200px" }}>
          {" "}
          <Loader />
        </div>
      )}
    </>
  );
}
