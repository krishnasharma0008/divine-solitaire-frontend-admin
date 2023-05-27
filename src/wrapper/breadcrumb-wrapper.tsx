import { AppCommon, Breadcrumbs } from "@/interface";
import { useEffect } from "react";

interface BreadcrumbWrapperProps extends AppCommon, Breadcrumbs {
  children: React.ReactNode;
}

const BreadcrumbWrapper: React.FC<BreadcrumbWrapperProps> = ({
  breadcrumbs,
  children,
  setBreadcrumbs,
}) => {
  useEffect(() => {
    setBreadcrumbs(breadcrumbs);
  }, [breadcrumbs, setBreadcrumbs]);

  return <>{children}</>;
};

export default BreadcrumbWrapper;
export { type BreadcrumbWrapperProps };
