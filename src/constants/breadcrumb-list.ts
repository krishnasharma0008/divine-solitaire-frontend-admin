enum URLs {
  DASHBOARD = "/",
  USER = "/admin/user",
  USER_DETAIL = "/admin/user-detail",
  INSURANCE = "/admin/insurance",
  INSURANCE_DETAIL = "/admin/insurance-detail",
  RESALE = "/admin/resale",
  DASHBOARD_CLICKED = "/#",
}

interface BreadCrumb {
  text: string;
  url: URLs;
}

interface Page {
  DASHBOARD: BreadCrumb;
  USER: BreadCrumb;
  INSURANCE: BreadCrumb;
  RESALE: BreadCrumb;
}

const PAGES: Page = {
  DASHBOARD: { text: "Dashboard", url: URLs.DASHBOARD },
  USER: { text: "User", url: URLs.USER },
  INSURANCE: { text: "Insurance", url: URLs.INSURANCE },
  RESALE: { text: "Resale", url: URLs.RESALE },
};

const breadcrumbList: {
  [key in URLs]: Array<BreadCrumb>;
} = {
  [URLs.DASHBOARD]: [PAGES.DASHBOARD],
  [URLs.DASHBOARD_CLICKED]: [PAGES.DASHBOARD],
  [URLs.USER]: [PAGES.DASHBOARD, PAGES.USER],
  [URLs.USER_DETAIL]: [PAGES.DASHBOARD, PAGES.USER],
  [URLs.INSURANCE]: [PAGES.DASHBOARD, PAGES.INSURANCE],
  [URLs.INSURANCE_DETAIL]: [PAGES.DASHBOARD, PAGES.INSURANCE],
  [URLs.RESALE]: [PAGES.DASHBOARD, PAGES.RESALE],
};

export default breadcrumbList;
export { PAGES, URLs };
export { type Page, type BreadCrumb };
