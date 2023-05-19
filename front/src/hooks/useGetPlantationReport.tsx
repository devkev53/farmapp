import { getPlantationReport } from "../services/reports.service"
import { useFetchAndLoad } from "./useFetchAndLoad"

export const useGetPlantationReport = () => {

  const {callEndpoint} = useFetchAndLoad()

  const getReport = async(id:number) => {
    let response = await callEndpoint(getPlantationReport(id))
    console.log(response)
    const blob = response.data
    const fileURL = window.URL.createObjectURL(blob)
    let alink = document.createElement('a')
    alink.href = fileURL
    alink.target = '_blank'
    alink.click() 
  }

  return {getReport}
}