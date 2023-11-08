import React, { useEffect, useState } from "react";
import Statistics from "./statusBar";
import { dashboardAPI } from "../../api/adminApi";

const DashboardPage = () => {
    const [status, setStatus] = useState(null);
  const getDashboardData = async () => {
      const {statusData} = await dashboardAPI();
      setStatus(statusData)
      console.log(statusData)
  };
  useEffect(()=>{
    getDashboardData()
  },[])

  return (
    <div>
      <Statistics
        totalRevenue={status?.totalRevenue}
        totalUser={status?.totalUser}
        totalCar={status?.totalCar}
        totalCarOwner={status?.totalCarOwner}
      />
    </div>
  );
};

export default DashboardPage;
