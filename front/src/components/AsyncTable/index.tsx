import { useEffect } from 'react'
import {useTable, useSortBy, usePagination, useFilters, useGlobalFilter} from 'react-table'
import { GlobalFlter } from './GlobalFlter'
import { Paginacion } from './Paginacion'
import CircleSpinner from '../UI/spiners/CircleSpinner'
import { ArrowUp } from '../UI/icons/Arrow-up'

import styles from './styles.module.css'
import { ArrowDown } from '../UI/icons/Arrow-down'
import { Link } from 'react-router-dom'
import { EyeShow } from '../UI/icons/EyeShowIcon'

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
    <>
      <GlobalFlter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFiter={globalFiter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className={styles.table_container}>
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

        <table className={styles.table} {...getTableBodyProps()}>            
          {/* HEAD TABLE */}
          <thead className={styles.header}>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th scope='col' key={column.id} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    <div>
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ?<ArrowUp />
                            :<ArrowDown />
                          : ""
                        }
                      </span>
                    </div>
                  </th>
                ))}
                <th className={styles.actions}>Acciones</th>
              </tr>
            ))}
          </thead>

          {isLoading
            ? (
              <tbody>
                <tr>
                  <td colSpan={columns.length + 1}>
                    <div className={styles.spiner_container}>
                      <CircleSpinner/>
                    </div>
                  </td>
                </tr>
              </tbody>
            )
            :  <tbody {...getTableBodyProps()}>
              {page.length < 1 && (
                <tr className={styles.no_register}>
                  <td colSpan={columns.length + 1}>
                    <div>
                      No se encontro ningun registro
                    </div>
                  </td>
                </tr>
              )}
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={row.id} {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <td data-label={cell.column.Header} {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    })}
                    <td className={styles.actions}>
                      <Link className={styles.show} to={`/plantations-detail/${row.original.id}`}>
                        <span>
                          <EyeShow/>
                          Ver
                        </span>
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          }

              
        </table>
      </div>
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
    </>
  )
}
