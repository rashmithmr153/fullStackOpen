import { useState } from 'react'


  const Button=({onClick,text})=>{
     
    return(
      <button onClick={onClick}>{text}</button>
    )
  }
const Section=({text})=>{
  
  return(
    <div><h2>{text}</h2></div>
  )
}
const Detail=({details})=>{
  return(<>
      <Section text="statistics"/>
      <div>good {details[0]}</div>
      <div>netural {details[1]}</div>
      <div>bad {details[2]}</div>
      <div>all {details[0]+details[1]+details[2]}</div>
      <div>average {(details[0]-details[2])/(details[0]+details[1]+details[2])}</div>
      <div>positive {details[0]*100/(details[0]+details[1]+details[2])}%</div>
      </>)
}
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

   const handlegoodClick = () =>{setGood(good + 1)}
   const handlenetrualClick = () =>setNeutral(neutral + 1)
   const handlebadClick = () =>setBad(bad + 1)

  return (
    <div>
      <Section text="give feedback"/>
      <Button onClick={handlegoodClick} text="Good"/>
      <Button onClick={handlenetrualClick} text="netural"/>
      <Button onClick={handlebadClick} text="Bad"/>
      <Detail details={[good,neutral,bad]}/>
    </div>
  )
}

export default App

