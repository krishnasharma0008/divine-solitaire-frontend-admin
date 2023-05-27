"use client";
import React from "react";
import { UserDetailScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { breadcrumbList, URLs } from "@/constants";

const UserDetail: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.USER_DETAIL]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <UserDetailScreen />
  </BreadcrumbWrapper>
);
export default UserDetail;
