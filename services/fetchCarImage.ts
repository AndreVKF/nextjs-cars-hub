import { CarProps } from "@/types";


export const generateCarImageUrl = (car: CarProps, angle?: string) => { 
  const url = new URL('https://cdn.imagin.studio/getimage')

  const {make, year, model} = car

  url.searchParams.append('customer', '')
  url.searchParams.append('make', make)
  url.searchParams.append('modelFamily', model.split(' ')[0])
  url.searchParams.append('zoomType', 'fullscreen')
  url.searchParams.append('modelYear', `${year}`)
  url.searchParams.append('angle', `${angle}`)

  return `${url}`
}