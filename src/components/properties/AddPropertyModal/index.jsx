import React from "react";

/* Straight Out of Chat GPT

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig'; // Assuming you have a firebaseConfig.js file where you initialize Firebase

const AddDataForm = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'your_collection_name'), formData);
      console.log('Document written with ID: ', docRef.id);
      setFormData({});
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

*/

const AddPropertyModal = ({ cancel }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form>
        <label>Property Name</label>
        <input type="text" onChange={handleChange} />
        <br />
        <label>Location</label>
        <input type="text" onChange={handleChange} />
        <br />
        <label>Tenant</label>
        <input type="text" onChange={handleChange} />
        <br />
        <label>Contract Start Date</label>
        <input type="date" onChange={handleChange} />
        <br />
        <label>Contract End Date</label>
        <input type="date" onChange={handleChange} />
        <br />
        <label>Remarks</label>
        <input type="text" onChange={handleChange} />
        <br />
        <input type="button" onClick={cancel} value="Cancel" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default AddPropertyModal;
