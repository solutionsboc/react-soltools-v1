import React from "react";

const ReadOnlyRow = ({ dataSetTable, handleEditClick, handleDeleteClick }) => {
  return (
    <tr className="active-row">
      <td>{dataSetTable.name}</td>
      <td>{dataSetTable.topic}</td>
      <td>{dataSetTable.description}</td>
      <td>{dataSetTable.input}</td>
      <td>
        <button className="btn-crud"
          type="button"
          onClick={(event) => handleEditClick(event, dataSetTable)}
        >
          Edit
        </button>
        <button className="btn-crud" type="button" onClick={() => handleDeleteClick(dataSetTable.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;