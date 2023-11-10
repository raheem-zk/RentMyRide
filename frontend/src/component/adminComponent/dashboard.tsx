import React, { useEffect, useState } from "react";
import Statistics from "./statusBar";
import { dashboardAPI } from "../../api/adminApi";
import Loading from "../loading";

const DashboardPage = () => {
  const [status, setStatus] = useState<any>(null);
  const [load, setLoad] = useState(true);
  const getDashboardData = async () => {
    const { statusData } = await dashboardAPI();
    setStatus(statusData);
    setLoad(false);
  };
  useEffect(() => {
    getDashboardData();
  }, []);

  return load ? (
    <Loading />
  ) : (
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
