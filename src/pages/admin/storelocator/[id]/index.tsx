'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { StoreLocatorDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const StoreLocatorDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.STORE_LOCATOR} setPageName={setPageName}>
    <StoreLocatorDetailScreen />
  </BreadcrumbWrapper>
)

export default StoreLocatorDetail
