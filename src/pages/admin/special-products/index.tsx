'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { SpecialProductsScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const SpecialProducts: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.SPECIAL_PRODUCTS} setPageName={setPageName}>
    <SpecialProductsScreen />
  </BreadcrumbWrapper>
)

export default SpecialProducts
