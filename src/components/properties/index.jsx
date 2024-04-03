import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardLayout from "./PropertyCard/CardLayout";
import Card from "./PropertyCard/Card";
import AddPropertyModal from "./AddPropertyModal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./addButton.css";

const Properties = () => {
  const [tableData, setTableData] = useState([]);
  const [addProperty, setAddProperty] = useState(false);

  useEffect(() => {
    fetch("api/properties/get-properties")
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
      });
    console.log(JSON.stringify(tableData));
  }, []);

  const changeAddProperty = () => {
    setAddProperty(!addProperty);
  };

  return (
    <div className="properties-background">
      <h1
        style={{
          fontFamily: "Poppins",
          fontSize: "36px",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
        }}
      >
        Properties
      </h1>
      <span className="add-button">
        <Link to="" onClick={changeAddProperty}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      </span>
      {addProperty && <AddPropertyModal cancel={changeAddProperty} />}
      <div className="card-container">
        <CardLayout>
          {tableData.map((data) => (
            <Link to={`/property/${data._id}`}>
              <Card key={data._id} data={data} />
            </Link>
          ))}
        </CardLayout>
      </div>
    </div>
  );
};

export default Properties;
