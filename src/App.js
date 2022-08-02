import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

function App() {
  const [rowData, setRowData] = useState([]);
  function getData() {
    console.log("success");
    axios({
      method: "get",
      url: "https://s3.amazonaws.com/open-to-cors/assignment.json",
    }).then(function (response) {
      const productData = response.data.products;

      const arr = [];
      Object.keys(productData).forEach((x) => {
        const obj = { id: x, ...productData[x] };
        arr.push(obj);
      });
      setRowData(arr);
    });
  }
  const tableCols = [
    { field: "id", headerName: "ID" },
    { field: "subcategory", headerName: "Subcategory" },
    { field: "title", headerName: "Title" , width: 300}, 
    { field: "popularity", headerName: "Popularity" },
    { field: "price", headerName: "Mrp" },
  ];

  useEffect(() => {
    console.log("rowData", rowData);
    if (rowData.length === 0) {
      getData();
    }
  });

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <button onClick={getData}>Fetch Data</button>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={rowData}
          columns={tableCols}
          pageSize={25}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default App;
