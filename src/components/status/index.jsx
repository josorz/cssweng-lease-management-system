import React from "react";
// import { currentDate } from "../../utils/dateUtil";

const Status = ({ terminated, date }) => {
  const colors = {
    Terminated: "dark-red",
    Active: "green",
    Complete: "green",
  };
  const status = "idk";
  //   terminated
  //     ? "Terminated"
  //     : isCurrent(date)
  //     ? "Active"
  //     : "Completed";

  return <div>{status}</div>;
};

export default Status;
