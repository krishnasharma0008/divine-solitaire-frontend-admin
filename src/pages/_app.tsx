import "../globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";
import { getToken } from "@/local-storage";
import { useRouter } from "next/router";
import { LayoutWrapper } from "@/wrapper";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push } = useRouter();

  useEffect(() => {
    if (!getToken()) {
      push("/login");
    }
  }, [push]);

  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="text-sm">
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </div>
    </>
  );
};

export default App;
