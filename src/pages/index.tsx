import { breadcrumbList, URLs } from "@/constants";
import { AppCommon } from "@/interface";
import { DashboardScreen } from "@/screens";
import BreadcrumbWrapper from "@/wrapper/breadcrumb-wrapper";

type HomepageProps = AppCommon;

const Homepage: React.FC<HomepageProps> = ({ setBreadcrumbs }) => {
  return (
    <BreadcrumbWrapper
      breadcrumbs={breadcrumbList[URLs.DASHBOARD]}
      setBreadcrumbs={setBreadcrumbs}
    >
      <div className="flex">
        <DashboardScreen />
      </div>
    </BreadcrumbWrapper>
  );
};

export default Homepage;
