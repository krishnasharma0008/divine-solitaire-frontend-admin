'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { InsuranceDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const InsuranceDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.INSURANCE} setPageName={setPageName}>
    <InsuranceDetailScreen />
  </BreadcrumbWrapper>
)

export default InsuranceDetail
