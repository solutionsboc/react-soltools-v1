import './table.css'


const DynamicTable = ({ data, column, hover = true, striped = true }) => {

  return (
    <table>
      <thead>
        <tr>
          {column.map((item, index) => <TableHeadItem item={item} />)}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => <TableRow item={item} column={column} hover={hover} striped={striped}/>)}
      </tbody>
    </table>
  )
}

const getCaps = (heading, value) => {
  if (heading) return heading.toUpperCase();
  return value.toUpperCase();
};

const TableHeadItem = ({ item }) => <th>{getCaps(item.heading)}</th>
const TableRow = ({ item, column, hover, striped }) => (
  <tr className={`${hover && "hover"} ${striped && "striped"}`}>
    {column.map((columnItem, index) => {

      if(columnItem.value.includes('.')) {
        const itemSplit = columnItem.value.split('.') //['address', 'city']
        return <td>{item[itemSplit[0]][itemSplit[1]]}</td>
      }

      return <td>{item[`${columnItem.value}`]}</td>
    })}
  </tr>
)

export default DynamicTable

/**
 * usage of Component:
const data = [
  {
    id: "0",
    description: "zero",
    contributer: "contributer",
    input: "input",
  },
  {
    id: "1",
    description: "first first",
    contributer: "contributer",
    input: "input",
  },
];
const column = [
  { heading: '#', value: 'id' },
  { heading: 'Description', value: 'description' },
  { heading: 'Contributer', value: 'contributer' },
  { heading: 'Input', value: 'input' },
];

<DynamicTable data={data} column={column} />
 */