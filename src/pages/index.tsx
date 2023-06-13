import { URLs } from '@/constants'
import { AppCommon } from '@/interface'
import { DashboardScreen } from '@/screens'
import BreadcrumbWrapper from '@/wrapper/breadcrumb-wrapper'

type HomepageProps = AppCommon

const Homepage: React.FC<HomepageProps> = ({ setPageName }) => {
  return (
    <BreadcrumbWrapper pageName={URLs.DASHBOARD} setPageName={setPageName}>
      <div className="flex">
        <DashboardScreen />
      </div>
    </BreadcrumbWrapper>
  )
}

export default Homepage
