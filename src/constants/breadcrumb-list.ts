//import { url } from "inspector"

enum URLs {
  DASHBOARD = '/',
  USER = '/admin/user',
  USER_DETAIL = '/admin/user-detail',
  INSURANCE = '/admin/insurance',
  INSURANCE_DETAIL = '/admin/insurance-detail',
  SPECIAL_PRODUCTS = '/admin/special-products',
  RESALE = '/admin/resale',
  SPECIAL_PRODUCTS_DETAIL = '/admin/specialproducts-detail',
  STORE_LOCATOR = '/admin/storelocator',
  STORE_LOCATOR_DETAIL = '/admin/storelocator-details',
  DASHBOARD_CLICKED = '/#',
}

interface BreadCrumb {
  text: string
  url: URLs
}

interface Page {
  DASHBOARD: BreadCrumb
  USER: BreadCrumb
  INSURANCE: BreadCrumb
  RESALE: BreadCrumb
  SPECIALPRODUCTS: BreadCrumb
  STORELOCATOR: BreadCrumb
}

const PAGES: Page = {
  DASHBOARD: { text: 'Dashboard', url: URLs.DASHBOARD },
  USER: { text: 'User', url: URLs.USER },
  INSURANCE: { text: 'Insurance', url: URLs.INSURANCE },
  RESALE: { text: 'Resale', url: URLs.RESALE },
  SPECIALPRODUCTS: { text: 'Special Products', url: URLs.SPECIAL_PRODUCTS },
  STORELOCATOR: { text: 'Store Locator', url: URLs.STORE_LOCATOR },
}

const breadcrumbList: {
  [key in URLs]: Array<BreadCrumb>
} = {
  [URLs.DASHBOARD]: [PAGES.DASHBOARD],
  [URLs.DASHBOARD_CLICKED]: [PAGES.DASHBOARD],
  [URLs.USER]: [PAGES.DASHBOARD, PAGES.USER],
  [URLs.USER_DETAIL]: [PAGES.DASHBOARD, PAGES.USER],
  [URLs.INSURANCE]: [PAGES.DASHBOARD, PAGES.INSURANCE],
  [URLs.INSURANCE_DETAIL]: [PAGES.DASHBOARD, PAGES.INSURANCE],
  [URLs.RESALE]: [PAGES.DASHBOARD, PAGES.RESALE],
  [URLs.SPECIAL_PRODUCTS]: [PAGES.DASHBOARD, PAGES.SPECIALPRODUCTS],
  [URLs.SPECIAL_PRODUCTS_DETAIL]: [PAGES.DASHBOARD, PAGES.SPECIALPRODUCTS],
  [URLs.STORE_LOCATOR]: [PAGES.DASHBOARD, PAGES.STORELOCATOR],
  [URLs.STORE_LOCATOR_DETAIL]: [PAGES.DASHBOARD, PAGES.STORELOCATOR],
}

export default breadcrumbList
export { PAGES, URLs }
export { type Page, type BreadCrumb }
