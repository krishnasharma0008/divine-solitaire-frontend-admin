"use client";
import React from "react";
import { InsuranceScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { breadcrumbList, URLs } from "@/constants";

const Insurance: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.INSURANCE]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <InsuranceScreen />
  </BreadcrumbWrapper>
);

export default Insurance;
