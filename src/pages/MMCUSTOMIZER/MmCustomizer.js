import React from 'react';
import * as XLSX from 'xlsx';
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import TableData from '../../components/shared/TableData';
import { Modal } from '../../components/shared/Modal';
import Table from '../../components/shared/Table';
import FilePicker from '../../components/shared/FilePicker';

function refreshPage() {
  window.location.reload(false);
}


function MmCustomizer() {
  const [text, setText] = useState('text');
  const [selectedExcelName, setSelectedExcelName] = useState('');
  const [selectedLibraryName, setSelectedLibraryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [openFileSelector, { filesContent, loading, errors, plainFiles }] = useFilePicker({
    // readAs: "DataURL",
    readAs: "BinaryString",
    accept: [".xls", ".xlsx"],
    multiple: false,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 20 // in megabytes
  });

  const openModal = () => {
    setShowModal(prev => !prev);
  };

  if (errors.length) {
    console.log('FilePicker: ' + errors);
  }

  // ************************
  function handleFileProcess(e) {
    let t = 0;
    if (plainFiles && plainFiles.length > 0) handleFile(plainFiles[0]);
  }






  /* generate an array of column objects */
  const make_cols = refstr => {
      let o = [],
        C = XLSX.utils.decode_range(refstr).e.c + 1;
      for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
      return o;
    };

  // ************************
  function handleChange(e) {
    const files = e.target.files;
    setSelectedExcelName(files[0].name);
    if (files && files[0]) handleFile(files[0]);
  }
  // ************************
  function handleLibraryChange(e) {
    const files = e.target.files;
    setSelectedLibraryName(files[0].name);
    if (files && files[0]) {
      handleLibraryFile(files[0]);
    }
  }


  function handleFile(file) {
    /* set up FileReader */
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    // const rABS = false;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log("handleFile");
      console.log(rABS, wb);
      /* Convert array of arrays */
      const dataXlsx = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(dataXlsx);
      setColumns(make_cols(ws["!ref"]));
      // this.setState({ data: dataXlsx, cols: make_cols(ws["!ref"]) });
    };
    if (file) {
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    } else {
      console.log('No file to read!');
    }
  }

  function handleLibraryFile(file) {
    /* set up FileReader */
    const reader = new FileReader();
    
    const rABS = !!reader.readAsBinaryString;
    // const rABS = false;
    reader.onload = e => {
      /* Parse data */
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log("handleFile");
      console.log(rABS, wb);
      /* Convert array of arrays */
      const dataXlsx = XLSX.utils.sheet_to_json(ws, { header: 1 });
      /* Update state */
      setData(dataXlsx);
      setColumns(make_cols(ws["!ref"]));
      // this.setState({ data: dataXlsx, cols: make_cols(ws["!ref"]) });
    };
    if (file) {
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    } else {
      console.log('No file to read!');
    }
  }

  
  return (
    <div className='mmcustomizer'>
        <h1>Metamodel Customizer</h1>
        <p>Todos:</p>

        <Card reverse={true}>
          <p>Import Excel file</p>
          {/* <FilePicker/> */}
          <Button version="secondary" onClick={() => openFileSelector()}>{loading ? "Loading…" : "Select File"}</Button>
          {errors && <div className="message">{errors}</div>}
          

          {filesContent.map((fileContent, index) => (
            <div className="message" key={index}>
              <p>{fileContent.name}</p>
            </div>
          ))}

          <Button version="secondary" onClick={() => handleFileProcess()}>Process File</Button>
        </Card>

        
        <Card reverse={true}>
          {/* align in one row with box*/}
          <div id="row" className="content-box">
            {/* load excel file */}
            <div className="box-rev">
              <label htmlFor="file-upload" className="custom-file-upload-reverse">
                  Select Excel
                <input
                    type="file"
                    className="form-control-file"
                    id="file-upload"
                    accept={[".xls", ".xlsx"]}
                    onChange={handleChange}
                  />
              </label>
            </div>
            {selectedExcelName && <div className="box-rev">{selectedExcelName}</div>}

            {/* load library file */}
            <div className="box-rev">
              <label htmlFor="library-upload" className="custom-file-upload-reverse">
                  Select Library
                <input
                    type="file"
                    className="form-control-file"
                    id="library-upload"
                    accept={[".axl"]}
                    onChange={handleLibraryChange}
                  />
              </label>
            </div>
            {selectedExcelName && <div className="box-rev">{selectedExcelName}</div>}
          </div>

          {/* display Excel sheet in table */}
          {data && columns &&
          <>
            <div className="box-rev"><h4>Excel Sheet 0:</h4></div>
            <TableData data={data} columns={columns} hover={true} striped={true} />
            <Button onClick={openModal}>Show result</Button>
            <Modal showModal={showModal} setShowModal={setShowModal} data={data} columns={columns} table={false} />
          </>
          }
        </Card>


        <Card>
          {/* <p>Refresh.</p> */}
          <button className='btn btn-primary' onClick={refreshPage}>Reload Page!</button>
        </Card>
      </div>
  );
}

export default MmCustomizer;
