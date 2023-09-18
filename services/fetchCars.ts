import { FilterProps } from "@/types"

export const fetchCars = async (filters: FilterProps) => {
  const { year, model, fuel, limit, manufacturer } = filters

  const headers = {
    'X-RapidAPI-Key': 'b1dbf407a9mshe591bd237325bb5p1e654cjsnc419adc54761',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
  }

  let url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`

  const response = await fetch(url, {headers})

  const result = await response.json()

  return result
}