function Table({tableData}){
  return(
      <table className="table">
          <thead>
              <tr>
                  <th>S.N</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                  <th>Description</th>
              </tr>
          </thead>
          <tbody>
          {
              tableData.map((data, index)=>{
                  return(
                      <tr key={index}>
                          <td>{index+1}</td>
                          <td>{data.fullName}</td>
                          <td>{data.emailAddress}</td>
                          <td>{data.description}</td>
                      </tr>
                  )
              })
          }
          </tbody>
      </table>
  )
}

export default Table;