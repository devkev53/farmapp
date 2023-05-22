import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { getPlantationReport } from "../../services/reports.service"
import { PageLoading } from "../UI/PageLoading"
import { PrinterIcon } from "../UI/icons/PrinterIcon"

import styles from './styles.module.css'

export const DownloadReportBtn = ({id}:{id:number}) => {

  const {isLoading, callEndpoint} = useFetchAndLoad()

  const getReport = async() => {
    let response = await callEndpoint(getPlantationReport(id))
    console.log(response)
    const blob = response.data
    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.target = '_blank'
    alink.click()
  }

  return (
    <>
      {isLoading && <PageLoading/>}
      <button className={styles.report_link} onClick={getReport}>
        <span>
          <PrinterIcon/>
          <p>
            Report
          </p>
        </span>
      </button>
    </>
  );
}
