import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MaintenanceTable from "./MaintenanceTable";
import ContractsTable from "./ContractsTable";

const deleteProperty = (propertyId) => {
  fetch("/api/properties/delete-property", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: propertyId }),
  }).then(() => {
    const navigate = useNavigate();
    navigate("/");
  });
};

const Property = () => {
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [contractHistory, setContracts] = useState([]);

  const [inputMaintenanceDate, setInputMaintenanceDate] = useState("");
  const [inputMaintenanceDesc, setInputMaintenanceDesc] = useState("");

  const [tableData, setTableData] = useState([]);

  const { propertyId } = useParams();

  useEffect(() => {
    const url = `/api/properties/get-property/${propertyId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPropertyInfo(data);
        setTableData(data.maintenance_history);
        setContracts(data.contract_history);
      });
  }, []);

  // the backend part of this works but idk where to place it yet
  // const addContract = async (e) => {
  //   e.preventDefault();
  //   fetch("http://localhost:5050/api/contracts/create-contract", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       property: "65f49969df7b8282fc6b3fc1",
  //       date_start: "2024-03-14",
  //       date_end: "2025-03-14",
  //       tenant: "65f530f5df7b8282fced41fe",
  //       isTerminated: false,
  //     }),
  //   });
  // };

  const addMaintenanceRow = async (e) => {
    e.preventDefault();
    fetch("/api/properties/add-maintenance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: propertyId,
        date: inputMaintenanceDate,
        description: inputMaintenanceDesc,
      }),
    }).then(() => {
      const newRowData = {
        date: inputMaintenanceDate,
        description: inputMaintenanceDesc,
      };
      setTableData([...tableData, newRowData]);
    });
  };

  const deleteMaintenanceRow = (index, data) => {
    const deleteData = data[index];
    fetch("/api/properties/delete-maintenance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: propertyId, data: deleteData }),
    }).then(() => {
      setTableData((prev) => prev.filter((_, i) => i !== index));
    });
  };

  return (
    <div>
      <div>{propertyInfo.loc_street}</div>
      <div>{propertyInfo.loc_barangay}</div>
      <div>{propertyInfo.loc_city}</div>
      <div>Edit Details</div>
      <Link to="" onClick={() => deleteProperty(propertyId)}>
        Remove Property
      </Link>
      <div>View Current Contract</div>
      <div>Contract History</div>
      <ContractsTable data={contractHistory} />
      <div>Maintenance Info</div>
      <form onSubmit={addMaintenanceRow}>
        <input
          type="date"
          onChange={(e) => setInputMaintenanceDate(e.target.value)}
          required
        />{" "}
        <br />
        <input
          placeholder="Description"
          onChange={(e) => setInputMaintenanceDesc(e.target.value)}
          required
        />{" "}
        <br />
        <button>Add New Maintenance</button>
      </form>
      <MaintenanceTable
        data={tableData}
        deleteMaintenanceRow={deleteMaintenanceRow}
      />
    </div>
  );
};

export default Property;
