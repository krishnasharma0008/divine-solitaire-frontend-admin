'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { ExchangeRateDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const ExchangeRateDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.EXCHANGE_RATE} setPageName={setPageName}>
    <ExchangeRateDetailScreen />
  </BreadcrumbWrapper>
)

export default ExchangeRateDetail
