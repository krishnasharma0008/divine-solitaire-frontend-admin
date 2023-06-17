'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { InsuranceScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const Insurance: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.INSURANCE} setPageName={setPageName}>
    <InsuranceScreen />
  </BreadcrumbWrapper>
)

export default Insurance
