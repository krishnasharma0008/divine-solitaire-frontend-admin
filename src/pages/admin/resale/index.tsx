"use client";
import React from "react";
import { ResaleScreen } from "@/screens";
import { AppCommon } from "@/interface";
import { URLs } from "@/constants";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";

const Resale: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.RESALE} setPageName={setPageName}>
    <ResaleScreen />
  </BreadcrumbWrapper>
);

export default Resale;
