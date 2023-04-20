import { useCallback, useState } from "react"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { AsyncTable } from "../../components/AsyncTable"
import { getPlantations } from "../../services/plantations.service"
import { listPlantsColumns } from "./columns"

export const ListPlantations = () => {
  const [plantations, setPlantations] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [pageCount, setPageCount] = useState(0)
  const {isLoading, callEndpoint} = useFetchAndLoad() 

  const getData = async(page:number) => await callEndpoint(getPlantations())

  const fetchData = useCallback(async (page:number) => {
    setLoadingData(true)
    const data = await getData(page + 1)
    setPlantations(data.data)
    setPageCount(data.total_pages)
    setLoadingData(false)
  }, [])

  return (
    <AsyncTable
      columns= {listPlantsColumns}
      data={plantations}
      pageCount={0}
      fetchData={fetchData}
    />
  )
}
