'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { ResaleDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const ResaleDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.RESALE} setPageName={setPageName}>
    <ResaleDetailScreen />
  </BreadcrumbWrapper>
)

export default ResaleDetail
