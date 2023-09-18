"use client";

import React, {useState, Fragment} from 'react'
import Image from 'next/image';
import { Combobox, Transition } from '@headlessui/react'
import { SearchManufacturerProps } from '@/types'

import { manufacturers } from '@/database';

function SearchManufacturer({ manufacturer, setManufacturer }: SearchManufacturerProps) {
  const [query, setQuery] = useState('')

  const filterQuery = (manufacturer: string) => { 
    const adjManufacturer = manufacturer
      .toLowerCase()
      .replace(/\s+/g, '')
    
    const adjQuery = query
    .toLowerCase()
    .replace(/\s+/g, '')

    return adjManufacturer.includes(adjQuery)
  }

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((manufacturer) => (
        filterQuery(manufacturer)
  ))

  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange={setManufacturer}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image src="/car-logo.svg" width={20} height={20} className="ml-4" alt="Car Logo" />
          </Combobox.Button>
          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            afterLeave={() => setQuery('')}
          >

            <Combobox.Options>
              {/* No manufacturers found */}
              {filteredManufacturers.length === 0 && query !== '' ? (
                <Combobox.Option value={query} className="search-manufacturer__option">
                  No matches for "{query}"
                </Combobox.Option>
              ) : (
                  filteredManufacturers.map((manufacturer, idx) => (
                    <Combobox.Option
                      key={idx}
                      value={manufacturer}
                      className={({ active }) => `
                        relative search-manufacturer__option
                        ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}
                      `}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {manufacturer}
                          </span>
                          {/* Show an active blue background color if the option is selected */}
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white': 'text-teal-600'}`}>
                            </span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
              )}
            </Combobox.Options>

          </Transition>
          

        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer