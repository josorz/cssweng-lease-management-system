import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

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
  const { propertyId } = useParams();
  useEffect(() => {
    const url = `/api/properties/get-property/${propertyId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPropertyInfo(data));
  }, []);

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
      <div>Contract Info</div>
      <table>
        <tr>
          <th>Contract Start</th>
          <th>Contract End</th>
          <th>Tenant Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
        <tr>
          <td>3/15/2024</td>
          <td>3/15/2025</td>
          <td>Soriano, Maricel</td>
          <td>Active</td>
          <td>
            <button>View Contract</button>
          </td>
        </tr>
        <tr>
          <td>3/15/2024</td>
          <td>3/15/2023</td>
          <td>Santos, Erik</td>
          <td>Completed</td>
          <td>
            <button>View Contract</button>
          </td>
        </tr>
      </table>
      <div>Maintenance Info</div>
      <button>Add New Maintenance</button>
      <table>
        <tr>
          <th>Date</th>
        </tr>
      </table>
    </div>
  );
};

export default Property;
