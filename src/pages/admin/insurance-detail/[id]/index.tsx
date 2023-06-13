'use client'
import React from 'react'
import { InsuranceDetailScreen } from '@/screens'
import { AppCommon } from '@/interface'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'
import { URLs } from '@/constants'

const InsuranceDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.INSURANCE} setPageName={setPageName}>
    <InsuranceDetailScreen />
  </BreadcrumbWrapper>
)

export default InsuranceDetail
