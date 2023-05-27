"use client";
import React from "react";
import { ResaleDetailScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { URLs } from "@/constants";

const ResaleDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.RESALE} setPageName={setPageName}>
    <ResaleDetailScreen />
  </BreadcrumbWrapper>
);

export default ResaleDetail;
