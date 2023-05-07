import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags`)
      .then(response => {
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
      })
  }, [filter])

  const handleChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <form>
        find countries<input value={filter} onChange={handleChange} />
      </form>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <>
          {countries.length !== 1 ?
              (
                <ul>
                {countries.map(country => <li key={country.name.common}>{country.name.common}</li>)}
                </ul>
              ) :
              (
                <>
                  <h1>{countries[0].name.common}</h1>
                  <p>Capital: {countries[0].capital}</p>
                  <p>Area: {countries[0].area}</p>
                  <br />
                  <h3>Languages:</h3>
                  <ul>
                  {Object.values(countries[0].languages)
                    .map(language => <li key={language}>{language}</li>)}
                  </ul>
                  <br />
                  <img src={countries[0].flags.png} alt={countries[0].flags.alt}/>
                </>
              )}
        </>
      )}
    </div>
  )
}

export default App;
