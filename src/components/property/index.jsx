import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MaintenanceTable from "./MaintenanceTable";
import ContractsTable from "./ContractsTable";
import AddContractModal from "./AddContractModal";
import "./property.css";

const deleteProperty = (propertyId, navigate) => {
  let result = confirm("Delete current property?");
  if (result === true) {
    fetch("/api/properties/delete-property", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: propertyId }),
    }).then(() => {
      navigate("/");
    });
  }
};

const Property = () => {
  const navigate = useNavigate();
  const [propertyInfo, setPropertyInfo] = useState([]);
  const [contractHistory, setContracts] = useState([]);

  const [inputMaintenanceDate, setInputMaintenanceDate] = useState("");
  const [inputMaintenanceDesc, setInputMaintenanceDesc] = useState("");

  const [tableData, setTableData] = useState([]);

  const [currContract, setCurrContract] = useState("");

  const { propertyId } = useParams();

  useEffect(() => {
    fetch(`/api/properties/get-property/${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        setPropertyInfo(data);
      });

    fetch(`/api/contracts/get-contracts/${propertyId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setContracts(data.contracts);
          setCurrContract(data.currContract);
        }
      });
  }, []);

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

  return contractHistory == [] ? null : (
    <div className="info-panel">
      <div className="property-name">
        <div className="property-name-heading">
          {propertyInfo.loc_number} {propertyInfo.loc_propertyname}
        </div>
        <div className="property-name-subheading">
          {propertyInfo.loc_street}, {propertyInfo.loc_barangay},{" "}
          {propertyInfo.loc_city}
        </div>
        <div></div>
      </div>
      <div className="property-hero">
        <div className="image">
          <img src={`/api/images/${propertyInfo.image_link}`} width={500} />
        </div>
        <div className="actions">
          <button
            id="property-buttons"
            onClick={() => deleteProperty(propertyId, navigate)}
          >
            Remove Property
          </button>
          {currContract ? (
            <button id="property-buttons">
              <Link to={`/contract/${currContract}`}>
                View Current Contract
              </Link>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>

      {!currContract ? <AddContractModal property={propertyId} /> : ""}

      {contractHistory && (
        <div>
          <h2>Contract History</h2>
          <ContractsTable data={contractHistory} />
        </div>
      )}
    </div>
  );
};

export default Property;
