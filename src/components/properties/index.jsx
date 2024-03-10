import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CardLayout from "./CardLayout";
import Card from "./Card";
import AddPropertyModal from "./AddPropertyModal";

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
    <>
      <h1>Properties</h1>
      <Link to="" onClick={changeAddProperty}>
        Add Property
      </Link>
      {addProperty && <AddPropertyModal cancel={changeAddProperty} />}
      <CardLayout>
        {tableData.map((data) => (
          <Card key={data._id} data={data} />
        ))}
        <p>{JSON.stringify(tableData)}</p>
      </CardLayout>
    </>
  );
};

export default Properties;
