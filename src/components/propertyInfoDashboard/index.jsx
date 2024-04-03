import React, { useEffect, useState } from "react";
import { convertDateToString } from "../../utils/dateUtil";

const PropertyInfoDashboard = () => {
  const [occupancyChart, setOccupancyChart] = useState(null);
  const [financialPerformance, setFinancialPerformance] = useState(null);
  const [upcomingBills, setUpcomingBills] = useState(null);
  const [upcomingTasks, setUpcomingTasks] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/contracts/get-occupancy-chart")
        .then((res) => res.json())
        .then((data) => setOccupancyChart(data));
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/bills/get-financial-performance")
        .then((res) => res.json())
        .then((data) => setFinancialPerformance(data.totalAmount));
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/bills/get-upcoming-bills")
        .then((res) => res.json())
        .then((data) => setUpcomingBills(data));
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await fetch("/api/maintenanceTasks/get-upcoming-tasks")
        .then((res) => res.json())
        .then((data) => setUpcomingTasks(data));
    };
    getData();
  }, []);

  return (
    <div>
      <h2>Real Estate Portfolio</h2>
      {/* <h3>Occupancy Rate</h3>
      {"chartjs doesnt work!!!" + JSON.stringify(occupancyChart)} */}
      <h3>Financial Performace</h3>
      <h1>₱ {financialPerformance}</h1>
      from the past two weeks <br /> <br />
      <h3>Upcoming Due Dates</h3>
      <ul>
        {upcomingBills &&
          upcomingBills.slice(0, 5).map((data) => (
            <li key={data._id}>
              <div>
                {convertDateToString(data.date_due)} - {data.information},{" "}
                {data.tenant_contract.tenant.last_name}
              </div>
            </li>
          ))}
      </ul>
      <h3>Upcoming Maintenance Dates</h3>
    </div>
  );
};

export default PropertyInfoDashboard;
