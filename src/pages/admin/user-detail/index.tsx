'use client'
import React from 'react'
import { UserDetailScreen } from '@/screens'
import { AppCommon } from '@/interface'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'
import { URLs } from '@/constants'

const UserDetail: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.USER} setPageName={setPageName}>
    <UserDetailScreen />
  </BreadcrumbWrapper>
)
export default UserDetail
