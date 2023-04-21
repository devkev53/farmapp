import styles from './pagination.module.css'

import { ChevronLeft } from '../UI/icons/Chevron-left';
import { ChevronsLeft } from '../UI/icons/Chevrons-left';
import { ChevronRight } from '../UI/icons/Chevron-right';
import { ChevronsRight } from '../UI/icons/Chevrons-right';

export const Paginacion = ({
  gotoPage, previousPage, nextPage, pageIndex,
  pageOptions, pageSize, setPageSize, pageCount,
  canPreviousPage, canNextPage
}) => {
  return (
    <div className={styles.container}>
        <div className={styles.show_for_page}>
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
            }} 
          >{[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}</select>
        </div>
        <span>
          page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <div className={styles.goto}>
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
        </div>
      <div className={styles.list_buttons}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}><ChevronsLeft /></button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}><ChevronLeft /></button>
        <button onClick={() => nextPage()} disabled={!canNextPage}><ChevronRight /></button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}><ChevronsRight /></button>
      </div>
      </div>
  )
}
