'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { SpecialProductsDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const SpecialProductsDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.SPECIAL_PRODUCTS} setPageName={setPageName}>
    <SpecialProductsDetailScreen />
  </BreadcrumbWrapper>
)

export default SpecialProductsDetail
