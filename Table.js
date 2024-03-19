import React, { useEffect, useRef, useState } from "react";

const Table = ({ updateOneData }) => {
  const [data, setData] = useState([]);
  function fetchData() {
    fetch("http://localhost:5000/list")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
      
        setData(result);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const deleteData = (id) => {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      })
      .catch((error) => {
        console.error("There was a problem with the delete operation:", error);
      });
  };

 

  return (
    <div className="sample-table-container">
      <h2 className="table-title">Sample Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Age</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.contact}</td>
              <td>{item.email}</td>
              <td>{item.age}</td>
              <td
                className="text-green-800"
                onClick={() => updateOneData(item._id,data)}
              >
                Update
              </td>
              <td className="text-red-800" onClick={() => deleteData(item._id)}>
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
