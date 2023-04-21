import { useEffect, useState } from 'react'
import {useAsyncDebounce} from 'react-table'

import styles from './serach.module.css'

export const GlobalFlter = ({
  preGlobalFilteredRows,
  globalFiter,
  setGlobalFilter
}) => {

  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState()
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 200)

  const onChange = async (value) => {
    await setGlobalFilter(value || undefined)
  }


  return (
    <div className={styles.container}>
      <input 
        value={value || ''}
        onChange={e => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder='Busca una planta o cultivo...'
      />
    </div>
  )
}
