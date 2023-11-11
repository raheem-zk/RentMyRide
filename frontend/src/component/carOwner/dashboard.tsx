import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dashboardAPI } from "../../api/carOwnerApi";
import Statistics from "../adminComponent/statusBar";
import Loading from "../loading";
import PieChart from "../chart/pieChart";

const DashboardPage = () => {
  const { carOwner } = useSelector((state: any) => state.carOwnerAuth);
  const [load, setLoad] = useState(true);
  const [status, setStatus] = useState<any>(null);
  const getDashboardData = async () => {
    const { statusData } = await dashboardAPI(carOwner?._id);
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

      <div className="flex items-center justify-center  bg-gray-100">
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
