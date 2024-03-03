import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, doc, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import CardLayout from "./CardLayout";
import Card from "./Card";

const Properties = () => {
  const [properties, setProperties] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(firestore, "Properties"));
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        setTableData([...tableData, { id, ...doc.data() }]);
      });
    }
    fetchData();
  }, [refresh]);

  return (
    <>
      <CardLayout>
        {tableData.map((data) => (
          <Card key={data.id} data={data} />
        ))}
      </CardLayout>
    </>
  );
};

export default Properties;
