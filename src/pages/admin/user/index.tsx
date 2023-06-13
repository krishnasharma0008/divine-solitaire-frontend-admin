'use client'
import React from 'react'
import { UserScreen } from '@/screens'
import { AppCommon } from '@/interface'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'
import { URLs } from '@/constants'

const User: React.FC<AppCommon> = ({ setPageName }) => (
  <BreadcrumbWrapper pageName={URLs.USER} setPageName={setPageName}>
    <UserScreen />
  </BreadcrumbWrapper>
)

export default User
