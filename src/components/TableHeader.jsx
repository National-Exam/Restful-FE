
const TableHeader = ({fields}) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {
                fields?.map(field=>(
<th scope="col" key={field} className="px-6 py-3">
              {field}
            </th>
                ))
            }                        
          </tr>
        </thead>
  )
}

export default TableHeader