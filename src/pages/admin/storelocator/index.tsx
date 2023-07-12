'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { StoreLocatorScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const StoreLocator: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.STORE_LOCATOR} setPageName={setPageName}>
    <StoreLocatorScreen />
  </BreadcrumbWrapper>
)

export default StoreLocator