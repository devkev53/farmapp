import { useEffect } from 'react'
import {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} from 'react-table'
import { GlobalFlter } from './GlobalFlter'
import { Paginacion } from './Paginacion'
import CircleSpinner from '../UI/spiners/CircleSpinner'
import { ArrowUp } from '../UI/icons/Arrow-up'

type Props = {
  data: any[],
  fetchData?: (pageIndex:number) => Promise<any>
  columns: any[],
  pageCount?: number,
  pageSize?: number
  isLoading?: boolean
}

export const AsyncTable = ({
  data, fetchData, columns, pageCount: controlledPageCount, isLoading
}: Props) => {
  const tableInstance = useTable(
    { columns,
      data,
      initialState: {pageIndex: 0},
      // manualPagination: false,
      // pageCount: controlledPageCount
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    preGlobalFilteredRows,
    setGlobalFilter,
    canPreviousPage,
    pageOptions,
    canNextPage,
    nextPage,
    pageCount,
    gotoPage,
    previousPage,
    setPageSize,
    state: {pageIndex, pageSize, globalFiter},
  } = tableInstance


  return (
    <div className="table_container">
      {/* <pre>
        <code>
          {JSON.stringify({
            pageIndex,
            pageSize,
            pageCount,
            canNextPage,
            canPreviousPage
          }, null, 2)}
        </code>
      </pre> */}

      <GlobalFlter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFiter={globalFiter}
        setGlobalFilter={setGlobalFilter}
      />
      {isLoading 
        ? <CircleSpinner/>
        : <table className="" {...getTableBodyProps()}>
          
          {/* HEAD TABLE */}
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ?<ArrowUp />
                          :"⬇️"
                        : ""
                      }
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* BODY TABLE */}
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
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
      }
        
      {/* PAGINATION */}
      <Paginacion
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageOptions={pageOptions}
        pageSize={pageSize}
        setPageSize={setPageSize}
        pageCount={pageCount}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
      {/* <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>{'<'}</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>{'>'}</button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>{'>>'}</button>
        <span>
          page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input 
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page)
            }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }} 
        >{[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            show {pageSize}
          </option>
        ))}</select>
      </div> */}

    </div>
  )
}
