import React from "react";

const Table = ({ data = null, columns = null, hover = true, striped = true }) => {

  const getCaps = (head, field) => {
    if (head) return head.toUpperCase();
    return field.toUpperCase();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>{columns && columns.map((head) => 
            <th>{getCaps(head.header, head.field)}</th>)}
          </tr>
        </thead>
        <tbody>
          {data && data.map &&
            data.map((row) => (
              <tr className={`${hover && "hover"} ${striped && "striped"}`}>
                {columns.map((col) => (
                  <td>{row[col.field]}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
      {data ? null : <div><br/><br/><p>No Row to show :)</p></div>}
    </div>
  );
};

export default Table;

/**
 * Usage of component eg:
 * const columns = [
    { field: "id", header: "#" },
    { field: "title", header: "Title" },
  ];
 * <Table data={dataFetch} columns={columns} hover={true} striped={true} />
 */