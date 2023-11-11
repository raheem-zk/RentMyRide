import React, { useEffect, useState } from "react";
import Statistics from "./statusBar";
import { dashboardAPI } from "../../api/adminApi";
import Loading from "../loading";
import BarChart from "../chart/barChart";
import PieChart from "../chart/pieChart";
import { BarDataProps } from "../../models/models";

const DashboardPage = () => {
  const [status, setStatus] = useState<any>(null);
  const [load, setLoad] = useState(true);
  const [barData, setBarData] = useState<BarDataProps>({
    user: 0,
    blockedUser: 0,
    carOwnerData: 0,
    blockedCarOwnerData: 0,
    newOrders: 0,
    totalOrders: 0,
  });
  const getDashboardData = async () => {
    const { statusData, barData } = await dashboardAPI();
    setBarData(barData);
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

      <div className="w-full flex md:items-center md:justify-center min-h-screen bg-gray-100">
        <BarChart
          width={500}
          height={300}
          user={barData?.user}
          blockedUser={barData?.blockedUser}
          carOwnerData={barData?.carOwnerData}
          blockedCarOwnerData={barData?.blockedCarOwnerData}
          newOrders={barData?.newOrders}
          totalOrders={barData?.totalOrders}
        />
      </div>

      <div className="w-auto flex items-center justify-center  bg-gray-100">
        <PieChart
          width={300}
          height={300}
          totalRevenue={status?.totalRevenue}
          newOrder={status?.newOrder}
          totalCars={status?.totalCar}
        />
      </div>
    </div> 
  );
};

export default DashboardPage;
