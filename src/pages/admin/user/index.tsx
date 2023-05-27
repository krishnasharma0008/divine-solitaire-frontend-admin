"use client";
import React from "react";
import { UserScreen } from "@/screens";
import { AppCommon } from "@/interface";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";
import { breadcrumbList, URLs } from "@/constants";

const User: React.FC<AppCommon> = ({ setBreadcrumbs }) => (
  <BreadcrumbWrapper
    breadcrumbs={breadcrumbList[URLs.USER]}
    setBreadcrumbs={setBreadcrumbs}
  >
    <UserScreen />
  </BreadcrumbWrapper>
);

export default User;
