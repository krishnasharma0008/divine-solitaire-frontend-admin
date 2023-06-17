'use client'
import React from 'react'

import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { UserDetailScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

const UserDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.USER} setPageName={setPageName}>
    <UserDetailScreen />
  </BreadcrumbWrapper>
)
export default UserDetail
