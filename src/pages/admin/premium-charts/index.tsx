'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { PremiumChartsScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const PremiumCharts: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.PREMIUM_CHARTS} setPageName={setPageName}>
    <PremiumChartsScreen />
  </BreadcrumbWrapper>
)

export default PremiumCharts
