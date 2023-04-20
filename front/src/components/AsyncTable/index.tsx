import { useEffect } from 'react'
import {useTable, useSortBy, usePagination} from 'react-table'

type Props = {
  data: any[],
  fetchData: (pageIndex:number) => Promise<any>
  columns: any[],
  pageCount: number
}

export const AsyncTable = ({
  data, fetchData, columns, pageCount: controlledPageCount
}: Props) => {
  const tableInstance = useTable(
    { columns,
      data,
      initialState: {pageIndex: 0},
      manualPagination: false,
      pageCount: controlledPageCount
    },
    useSortBy,
    usePagination,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: {pageIndex},
  } = tableInstance

  useEffect(()=>{
    fetchData(pageIndex)
  },[fetchData, pageIndex])

  console.log(data)

  return (
    <div>
      <table className="" {...getTableBodyProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ?"⬆️"
                        :"⬇️"
                      : ""
                    }
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
