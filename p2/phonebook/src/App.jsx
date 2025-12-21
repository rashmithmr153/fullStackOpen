import {useEffect, useState } from 'react'
import personService from './services/Person'

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
const Persons=({personToShow, deletePerson})=>{
  return(
    <>
      {personToShow.map(person => (
        <div key={person.id}>
          <Detalis person={person} />
          <button onClick={() => deletePerson(person.id)}>delete</button>

        </div>
      ))}
    </>
  )
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNo,setNewNo]=useState('')
  const [search,setSearch]=useState('')
  

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])
  const addDetails = (event) => {
    event.preventDefault()
    const nameExists=persons.some(person=>person.name===newName)
    const noExists=persons.some(person=>person.number===newNo)

    if (nameExists && window.confirm(`${newName} is already added to phonebook,replace the old number with a new one?`)){
      const person=persons.find(p=>p.name===newName)//CAN REPLACVE WITH nAMEeXIATS IF MADE IT RETUENING THE PERSON OBJECT
      const updatedPerson={...person, number:newNo}
      personService
        .update(person.id, updatedPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(p=>p.id!==person.id ? p : returnedPerson))
          setNewName('')
          setNewNo('')
        })
      return
    }
    if (noExists){
      alert(`${newNo} is already added to phonebook`)
      return
    }
    const newObject = { name: newName , number: newNo}
    personService
      .create(newObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNo('')
      })
   
  }


  const deletePerson = (id) => {
  const person = persons.find(p => p.id === id)

  if (window.confirm(`Delete ${person.name}?`)) {
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
  }
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
      <Persons personToShow={personToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App