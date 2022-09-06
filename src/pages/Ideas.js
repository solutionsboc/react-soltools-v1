import React from 'react';
import { Fragment, useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Card from '../components/shared/Card';
import EditableRow from '../components/crudTable/EditableRow';
import ReadOnlyRow from '../components/crudTable/ReadOnlyRow';
import data from "../backend/data/mock-data.json";
import { db } from "../backend/database/firebase-config.js";
import { collection, getDocs, addDoc, setDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
// import { async } from '@firebase/util';


function Ideas() {
  // const [dataTable, setDataTables] = useState(data); // mocked data
  // firebase get data
  const [dataTable, setDataTables] = useState([]);
  const ideasCollectionRef = collection(db, "ideas");

  /**
   * database functionalities:
   * CRUD
   */
  // fetch from firebase db and set
  useEffect(() => {
    const getIdeas = async () => {
      const dbData = await getDocs(ideasCollectionRef);
      // console.log("dbData.docs:" + JSON.stringify(dbData.docs,null,2));
      setDataTables(dbData.docs.map((doc) => ({ ...doc.data() })));
      // setDataTables(dbData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    // call async
    getIdeas();
  }, []);

  // console.log("dataTable" + JSON.stringify(dataTable,null,2));

  // add new data to db
  // const createIdea =  async (newDataTable) => {
  //   await addDoc(ideasCollectionRef, newDataTable);
  // };
  // add new data to db with custom ID - nanoid generated
  const createIdea =  async (newDataTable) => {
    const CreateDocRef = doc(db, "ideas", newDataTable.id );
    await setDoc(CreateDocRef, newDataTable)
    .catch(error => {
      console.log(error);
    })
  };

  // update data row to db
  const updateIdea =  async (id, editedDataTable) => {
    if (id === editedDataTable.id) {
      const updateDocRef = doc(db, "ideas", editedDataTable.id);
      await updateDoc(updateDocRef, editedDataTable)
      .catch(error => {
        console.log(error);
      })
    } else console.log('updateIdea: The table data IDs do not match!');
  };

  // delete data row from db
  const deleteIdea =  async (id) => {
    if (id) {
      const deleteDocRef = doc(db, "ideas", id);
      await deleteDoc(deleteDocRef)
      .catch(error => {
        console.log(error);
      })
    } else console.log('deleteIdea: No ID from table data!');
  };

  const [addFormData, setAddFormData] = useState({
    name: "",
    topic: "",
    description: "",
    input: "",
    additional: "",
  });
  const [editFormData, setEditFormData] = useState({
    name: "",
    topic: "",
    description: "",
    input: "",
    additional: "",
  });
  const [editDataTableID, setEditDataTableID] = useState(null);

  // Forms handler
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDataTable = {
      // generate ID
      id: nanoid(),
      name: addFormData.name,
      topic: addFormData.topic,
      description: addFormData.description,
      input: addFormData.input,
      additional: "",
    };

    // set and instantiate for new data
    const newDataTables = [...dataTable, newDataTable];
    setDataTables(newDataTables);
    // add new row to db
    createIdea(newDataTable);
    // clear form after submit
    event.target.reset();
  };

  // Submit handler - set new table data
  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedDataTable = {
      id: editDataTableID,
      name: editFormData.name,
      topic: editFormData.topic,
      description: editFormData.description,
      input: editFormData.input,
      additional: "",
    };

    const newDataTables = [...dataTable];

    // find with index -> or consider to map with id
    const index = dataTable.findIndex((dataSetTable) => dataSetTable.id === editDataTableID);

    newDataTables[index] = editedDataTable;

    setDataTables(newDataTables);
    setEditDataTableID(null);
    // update edited row to db doc
    updateIdea(editDataTableID, editedDataTable);
  };

  // handler to edit row entry
  const handleEditClick = (event, dataSetTable) => {
    event.preventDefault();
    setEditDataTableID(dataSetTable.id);

    const formValues = {
      id: dataSetTable.id,
      name: dataSetTable.name,
      topic: dataSetTable.topic,
      description: dataSetTable.description,
      input: dataSetTable.input,
      additional: "",
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditDataTableID(null);
  };

  // handler to remove row entry
  const handleDeleteClick = (dataSetTableID) => {
    const newDataTables = [...dataTable];

    const index = dataTable.findIndex((dataSetTable) => dataSetTable.id === dataSetTableID);

    newDataTables.splice(index, 1);

    setDataTables(newDataTables);
    // delete data row from db
    deleteIdea(dataSetTableID);
  };

  /**
   * render page
   */
  return (
    <div className='ideas'>
        <h1>Ideas</h1>
        <p>Todos:</p>
    
      <Card reverse={true}>
        <div className="content-table">
          <form onSubmit={handleEditFormSubmit}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Topic</th>
                  <th>Description</th>
                  <th>Input</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataTable.map((dataSetTable) => (
                  <Fragment>
                    {editDataTableID === dataSetTable.id ? (
                      <EditableRow
                        editFormData={editFormData}
                        handleEditFormChange={handleEditFormChange}
                        handleCancelClick={handleCancelClick}
                      />
                    ) : (
                      <ReadOnlyRow
                        dataSetTable={dataSetTable}
                        handleEditClick={handleEditClick}
                        handleDeleteClick={handleDeleteClick}
                      />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </form>

          <h4>Add your idea</h4>
          <form onSubmit={handleAddFormSubmit}>
            <input
              type="text"
              name="name"
              required="required"
              placeholder="Enter a name..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="topic"
              required="required"
              placeholder="Enter an topic..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="description"
              required="required"
              placeholder="Enter a description..."
              onChange={handleAddFormChange}
            />
            <input
              type="text"
              name="input"
              required="required"
              placeholder="Enter an input..."
              onChange={handleAddFormChange}
            />
            <button className="btn-crud" type="submit">Add</button>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Ideas;
