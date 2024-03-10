import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import CardLayout from "./CardLayout";
import Card from "./Card";
import AddPropertyModal from "./AddPropertyModal";

const Properties = () => {
  const [properties, setProperties] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [addProperty, setAddProperty] = useState(false);

  useEffect(() => {
    fetch("api/properties/get-properties")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        data.forEach((doc) => {
          const id = doc.id;
          setTableData([...tableData, { id, ...doc }]);
        });
      });
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
          <Card key={data.id} data={data} />
        ))}
      </CardLayout>
    </>
  );
};

export default Properties;
