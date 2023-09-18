
export const calculateCarRent = (city_mpg: number, year: number) => { 
  const basePricePerDay = 50 // Base rental price per day
  const milageFactor = 0.1 // Additional rate per mile
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * milageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}

export const updateSearchParams = (type: string, value: string) => {

  const searchParams = new URLSearchParams(window.location.search)

  searchParams.set(type, value)

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`

  return newPathname

}