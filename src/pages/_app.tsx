import "../globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { getToken } from "@/local-storage";
import { useRouter } from "next/router";
import { LayoutWrapper } from "@/wrapper";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push, asPath } = useRouter();

  useEffect(() => {
    if (!getToken() && asPath !== "/login") {
      push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <>
      <div className="text-sm">
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </div>
    </>
  );
};

export default App;
