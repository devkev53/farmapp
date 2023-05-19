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


  const getData = async() => await callEndpoint(getPlantations())


  useEffect(() => {
    const data = getData()
    data.then(data => setPlantations(data.data))
  },[])

  // console.log(plantations)

  return (
    <div className="list_plants">
      <AsyncTable
        columns= {listPlantsColumns}
        data={plantations}
        isLoading={isLoading}
      />
    </div>
  )
}
