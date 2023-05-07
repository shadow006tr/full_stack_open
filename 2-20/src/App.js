import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState(null)
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags`)
      .then(response => {
        setCountries(response.data.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
      })
    if (countries.length === 1) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}
        &units=metric&appid=${process.env.REACT_APP_API_KEY}`)
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [countries, filter])

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
                {countries.map(country => <li key={country.name.common}>{country.name.common}
                  <button onClick={() => setFilter(country.name.common)}>show</button>
                </li>)}
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
                  <h1>Weather in {countries[0].capital}</h1>
                  {weather && (
                    <>
                      <p>temperature {weather.main.temp} Celcius</p>
                      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
                      <p>wind {weather.wind.speed} m/s</p>
                    </>
                  )}
                </>
              )}
        </>
      )}
    </div>
  )
}

export default App;
