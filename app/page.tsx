import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from "@/components";
import { fuels, yearsOfProduction } from "@/database";
import { fetchCars } from "@/services/fetchCars";

// next allows page to be async

export default async function Home({ searchParams }) {
  
  const allCars = await fetchCars({
    manufacturer: searchParams.manufacturer || '',
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || '',
    limit: searchParams.limit || 10,
    model: searchParams.model || ''
  })
  const isDataEmpty = !allCars || !Array.isArray(allCars) || allCars.length < 1

  // this works because all pages by default are server side rendered on next
  // console.log(allCars)

  return (
    <main className="overflow-hidden">
      <Hero />

      
      <div className="mt-12 padding-x padding-y max-width" id="discover">

        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalogue</h1>
          <p>Explore the cars you might like</p>
        </div>

        <div className="home__filters">
          <SearchBar />

          <div className="home__filter-container">
            <CustomFilter title="fuel" options={fuels} />
            <CustomFilter title="year" options={yearsOfProduction} />
          </div>
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car, idx) => (
                <CarCard key={idx} car={car} />
              ))}
            </div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            />

        </section>
        ) : (
            <div className="home__error-container">
              <h2 className="text-black text-xl font-bold" >Ooops, no results</h2>
              <p>{allCars?.message}</p>
            </div>
        )}


      </div>

    </main>
  )
}
