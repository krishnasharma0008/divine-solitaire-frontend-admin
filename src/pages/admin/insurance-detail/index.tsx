"use client";
import React from "react";
import { InsuranceDetailScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { breadcrumbList, URLs } from "@/constants";

const InsuranceDetail: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.INSURANCE_DETAIL]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <InsuranceDetailScreen />
  </BreadcrumbWrapper>
);

export default InsuranceDetail;
