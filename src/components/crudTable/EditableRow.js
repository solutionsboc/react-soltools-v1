import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr className="active-row">
      <td>
        <input
          className="input-crud"
          type="text"
          required="required"
          placeholder="Enter a name..."
          name="name"
          value={editFormData.name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          className="input-crud"
          type="text"
          required="required"
          placeholder="Enter an topic..."
          name="topic"
          value={editFormData.topic}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          className="input-crud"
          type="text"
          required="required"
          placeholder="Enter a description..."
          name="description"
          value={editFormData.description}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          className="input-crud"
          type="text"
          required="required"
          placeholder="Enter an input..."
          name="input"
          value={editFormData.input}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button className="btn-crud" type="submit">Save</button>
        <button className="btn-crud" type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;