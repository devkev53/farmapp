import axios from 'axios'
import { loadAbort } from '../utilities/load-abort-axios.utility'


export const testingService = () => {
  const controller = loadAbort()
  return {call: axios.get('https://rickandmortyapasdasdi.com/api/character/2', {signal: controller.signal}), controller}
}