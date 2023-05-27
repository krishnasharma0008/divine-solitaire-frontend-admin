"use client";
import React from "react";
import { ResaleScreen } from "@/screens";
import { AppCommon } from "@/interface";
import { breadcrumbList, URLs } from "@/constants";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";

const Resale: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.RESALE]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <ResaleScreen />
  </BreadcrumbWrapper>
);

export default Resale;
