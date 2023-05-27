"use client";
import React from "react";
import { ResaleDetailScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { breadcrumbList, URLs } from "@/constants";

const ResaleDetail: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.RESALE]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <ResaleDetailScreen />
  </BreadcrumbWrapper>
);

export default ResaleDetail;
