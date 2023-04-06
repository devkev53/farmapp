import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { AxiosCall } from "../models/axios-call.model"


export const useFetchAndLoad = () => {

  const [isLoading, setLoading] = useState(false)
  let controller: AbortController // Generate a end controller

  // Call Edpoint async function
  const callEndpoint = async(axiosCall: AxiosCall<any>) => {

    if (axiosCall.controller) controller = axiosCall.controller // validate send controller
    setLoading(true)

    let result = {} as AxiosResponse<any> // End variable for result

    try {
      result = await axiosCall.call
    } catch (error: any) {
      setLoading(false)
      throw error
    }
    setLoading(false)
    return result
  }

  // Cancel Endpoint call
  const cancelEndpoint = () => {
    setLoading(false)
    controller && controller.abort()
  }

  useEffect(()=>{
    return () => {
      cancelEndpoint()
    }
  },[])

  return {isLoading, callEndpoint}
}