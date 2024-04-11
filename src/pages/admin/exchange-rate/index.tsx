'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { ExchangeRateScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const ExchangeRate: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.EXCHANGE_RATE} setPageName={setPageName}>
    <ExchangeRateScreen />
  </BreadcrumbWrapper>
)

export default ExchangeRate
