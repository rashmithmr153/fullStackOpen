import { useState } from 'react'


const Filter = ({search,handleSearch})=>{
  return(
    <div>
      Filter shown with:<input value={search} onChange={handleSearch} />
    </div>
  )
}

const PersonForm=(props)=>{
  return(
    <form onSubmit={props.addDetails}>
      <div >
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>number: <input value={props.newNo} onChange={props.handleNoChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}


const Detalis = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}
const Persons=({personToShow})=>{
  return(
    <>
      {personToShow.map(person => (
        <Detalis key={person.name} person={person} />
      ))}
    </>
  )
}



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNo,setNewNo]=useState('')
  const [search,setSearch]=useState('')

  const addDetails = (event) => {
    event.preventDefault()
    const nameExists=persons.some(person=>person.name===newName)
    const noExists=persons.some(person=>person.number===newNo)

    if (nameExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    if (noExists){
      alert(`${newNo} is already added to phonebook`)
      return
    }
    const newObject = { name: newName , number: newNo}
    
    setPersons(persons.concat(newObject))
    setNewName('')
    setNewNo('')
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNoChange=(event)=>{
    setNewNo(event.target.value)
  }
  const handleSearch=(event)=>{
    setSearch(event.target.value)
  }

  const personToShow=persons.filter(person=>person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add new</h2>
      <PersonForm addDetails={addDetails} newName={newName} handleNameChange={handleNameChange} newNo={newNo} handleNoChange={handleNoChange}/>
      <h2>Numbers</h2>
      <Persons personToShow={personToShow} />
    </div>
  )
}

export default App