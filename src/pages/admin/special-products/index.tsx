'use client'
import React from 'react'
import { SpecialProductsScreen } from '@/screens'
import { AppCommon } from '@/interface'
import { URLs } from '@/constants'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const SpecialProducts: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.SPECIAL_PRODUCTS} setPageName={setPageName}>
    <SpecialProductsScreen />
  </BreadcrumbWrapper>
)

export default SpecialProducts
