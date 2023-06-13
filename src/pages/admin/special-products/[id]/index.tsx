'use client'
import React from 'react'
import { SpecialProductsDetailScreen } from '@/screens'
import { AppCommon } from '@/interface'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'
import { URLs } from '@/constants'

const SpecialProductsDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.SPECIAL_PRODUCTS} setPageName={setPageName}>
    <SpecialProductsDetailScreen />
  </BreadcrumbWrapper>
)

export default SpecialProductsDetail
