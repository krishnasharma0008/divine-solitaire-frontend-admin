import "../globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { getToken } from "@/local-storage";
import { useRouter } from "next/router";
import { LayoutWrapper } from "@/wrapper";
import { BreadCrumb } from "@/constants";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const { push, asPath } = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<BreadCrumb>>([]);

  useEffect(() => {
    if (!getToken() && asPath !== "/login") {
      push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath]);

  return (
    <>
      <div className="text-sm">
        <LayoutWrapper breadcrumbs={breadcrumbs}>
          <Component {...pageProps} setBreadcrumbs={setBreadcrumbs} />
        </LayoutWrapper>
      </div>
    </>
  );
};

export default App;
