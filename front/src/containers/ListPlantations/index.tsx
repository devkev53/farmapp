import { useCallback, useEffect, useState } from "react"
import { useFetchAndLoad } from "../../hooks/useFetchAndLoad"
import { AsyncTable } from "../../components/AsyncTable"
import { getPlantations } from "../../services/plantations.service"
import { listPlantsColumns } from "./columns"
import CircleSpinner from "../../components/UI/spiners/CircleSpinner"

export const ListPlantations = () => {
  const [plantations, setPlantations] = useState([])
  const [loadingData, setLoadingData] = useState(false)
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

  useEffect(() => {
    const data = getData()
    data.then(data => setPlantations(data.data))
  },[])

  console.log(plantations)

  return (
    <div className="list_plants">
      <AsyncTable
        columns= {listPlantsColumns}
        data={plantations}
        isLoading={isLoading}
        // pageCount={0}
        // fetchData={fetchData}
        // pageSize={10}
      />
    </div>
  )
}
