import { AxiosResponse } from "axios";
import { useEffect } from "react";

export const useAsync = (
  asyncFn: () => Promise<AxiosResponse<any, any>>,
  successFunction: Function,
  returnFunction: Function,
  dependencies: any[] = []
) => {
  useEffect(()=>{
    let isActive = true // Iinitation of component
    asyncFn().then((result) => {// Send a petition
      if (isActive) successFunction(result.data) // Validate component is active
    })
    return () => {
      returnFunction && returnFunction() // exist return fucntion execute this
      isActive = false // asigned component is dismount
    }
  }, dependencies)
}