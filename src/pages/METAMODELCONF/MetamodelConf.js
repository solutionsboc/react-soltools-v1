import React from 'react';
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";
import Card from '../../components/shared/Card';
import Button from '../../components/shared/Button';
import FilePicker from '../../components/shared/FilePicker';


function MetamodelConf() {
  const [text, setText] = useState('text');
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: [".xls", ".xlsx"],
    multiple: false,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 20 // in megabytes
  });

  if (errors.length) {
    console.log('FilePicker: ' + errors);
  }
  
  return (
    <div className='metamodelconf'>
        <h1>Metamodel Configurator</h1>
        <p>Todos:</p>

        <Card reverse={true}>
          <p>Import Excel file</p>
          {/* <FilePicker/> */}
          <Button onClick={() => openFileSelector()}>{loading ? "Loading…" : "Select File"}</Button>
          {errors && <div className="message">{errors}</div>}
          

          {filesContent.map((file, index) => (
            <div className="message" key={index}>
              <p>{file.name}</p>
            </div>
          ))}
          <button className='btn btn-primary'>Import</button>
        </Card>
        <Card reverse={true}>
          <p>Todo</p>
        </Card>
      </div>
  );
}

export default MetamodelConf;
