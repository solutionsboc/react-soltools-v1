import React from "react";
import { useFilePicker } from "use-file-picker";
import Button from '../../components/shared/Button';

export default function FilePicker() {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: [".xls", ".xlsx"],
    multiple: false,
    limitFilesConfig: { max: 2 },
    // minFileSize: 1,
    maxFileSize: 20 // in megabytes
  });

  if (loading) {
    // return <div>Loading...</div>;
  }

  if (errors.length) {
    console.log('FilePicker: ' + errors);
    return <div>Error...</div>;
  }

  return (
    <>
      <Button onClick={() => openFileSelector()}>{loading ? "Loading…" : "Select File"}</Button>

      {filesContent.map((file, index) => (
        <div className="message" key={index}>
          <p>{file.name}</p>
          {/* <img alt={file.name} src={file.content}></img> */}
        </div>
      ))}
    </>
  );
}