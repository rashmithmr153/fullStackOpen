import { useState ,useEffect } from 'react'
import countrySevice from './services/countries.js'


const Counry=({countryToShow, setCountry})=>{
  if(countryToShow.length>10){
    return(
      <p>Too many matches,specify another filter</p>
    )
  }
  if(countryToShow.length===1){
    const country=countryToShow[0]
    return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language)=> 
          <li key={language}>{language}</li>
        )}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
    </div>
    )
  }
  else{
    return(
      <div>
      {countryToShow.map((country)=> 
        <div key={country.name.common}>
          {country.name.common}
        </div>
      )}   
      </div>
    )}
  }  



const App=()=> {
  const [country , setCountry] = useState([])
  const [word , setWord] = useState('')

const handleSearchChange = (event) => {
  setWord(event.target.value)
}
useEffect(() => {
  countrySevice
    .getAll()
    .then(initialCountries => {
      setCountry(initialCountries)
    })
}, [])


const countryToShow= country.filter(country =>
  country.name.common.toLowerCase().includes(word.toLowerCase())
)

  return (
    <div>find countiries 
      <input value={word} onChange={handleSearchChange} />
      
      <Counry countryToShow={countryToShow} setCountry={setCountry} />
    </div>
  )
}

export default App
