import Governance from "./Governance"
import Management from "./Management"
import Treasury from "./Treasury"

const DashboardCompany = () => {
  return (
    <div>
      <Governance />
      <Treasury />
      <Management />
    </div>
  );
};

export default DashboardCompany;