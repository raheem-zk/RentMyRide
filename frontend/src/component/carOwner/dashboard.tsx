import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dashboardAPI } from "../../api/carOwnerApi";
import Statistics from "../adminComponent/statusBar";

const DashboardPage = () => {
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);

  const [status, setStatus] = useState<any>(null);
  const getDashboardData = async () => {
    const { statusData } = await dashboardAPI(carOwner?._id);
    setStatus(statusData);
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <Statistics
        totalRevenue={status?.totalRevenue}
        totalUser={status?.totalUser}
        totalCar={status?.totalCar}
        totalCarOwner={status?.totalCarOwner}
        newOrder={status?.newOrder}
      />
    </div>
  );
};

export default DashboardPage;
