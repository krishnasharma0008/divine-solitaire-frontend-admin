import { BreadCrumb } from "@/constants";

interface AppCommon {
  setBreadcrumbs: (breadcrumbs: Array<BreadCrumb>) => void;
}

export { type AppCommon };
