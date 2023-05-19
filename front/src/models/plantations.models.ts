export interface createdByI {
  addres: string,
  birthday: string,
  email: string,
  id: number,
  image:string,
  last_name:string,
  name: string,
  phone: string,
  url_img:string,
  username:string,
}

export interface daysForHarverstI {
  days: number,
  porcent: number
}

export interface irrigationI {
  end_time: string,
  id: number,
  is_active: boolean,
  plantation: number,
  start_time: string,
  on_irrigation: boolean
}

export interface plantationI {
  ability: number,
  area: number,
  created: string,
  created_by: createdByI,
  description: string,
  duration: number,
  estimated_date_for_harvest: string,
  estimated_days_for_harvest: daysForHarverstI,
  function_Kc: number,
  id: number,
  irrigation: irrigationI[],
  is_active: boolean,
  name: string,
  perimeter: number,
  thscm:string,
  used_water: number,
  wilting_point: number,
  total_water: number
}