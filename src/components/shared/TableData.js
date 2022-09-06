import React from 'react'

const TableData = ({ data = null, columns = null, hover = true, striped = true }) => {

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            {columns && columns.map(c => (
              <th key={c.key}>{c.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data && data.map((r, i) => (
            <tr className={`${hover && "hover"} ${striped && "striped"}`} key={i}>
              {columns && columns.map(c => (
                <td key={c.key}>{r[c.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableData