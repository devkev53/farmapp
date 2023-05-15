import { useEffect, useState } from 'react'

import styles from './serach.module.css'

export const GlobalFlter = ({
  preGlobalFilteredRows,
  globalFiter,
  setGlobalFilter
}:{
  preGlobalFilteredRows:any,
  globalFiter:any,
  setGlobalFilter:any
}) => {

  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState('')
  // const onChange = useAsyncDebounce(value => {
  //   setGlobalFilter(value || undefined)
  // }, 200)

  const onChange = async (value:string) => {
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
