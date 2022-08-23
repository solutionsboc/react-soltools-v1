import React from 'react';
// import './Moi.css'; // copied from bootstrap.css (We can use Bootstrap.css -> minified)
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.css';
// import AddDeleteTableRows from "./components/AddDeleteTableRows";
import DisplayFormDataInTable from "./components/DisplayFormDataInTable";

function Moi() {
  return (
    <div className='moi'>
      <h1>MOI</h1>
      <p>Configure MOI sync to ext_connect JSON</p>
      <p>Version: 1.0.0</p>

        {/* <AddDeleteTableRows /> */}

        {/* <DisplayFormDataInTable /> */}

    </div>
  );
}

export default Moi;
