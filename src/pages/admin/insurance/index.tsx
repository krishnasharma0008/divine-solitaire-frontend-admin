'use client'
import React from 'react'
import { InsuranceScreen } from '@/screens'
import { AppCommon } from '@/interface'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'
import { URLs } from '@/constants'

const Insurance: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.INSURANCE} setPageName={setPageName}>
    <InsuranceScreen />
  </BreadcrumbWrapper>
)

export default Insurance
