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
const StatisticLine=({text,value})=>{
  return(<>
    <table>
      <tr>
        <td width="50">{text}</td>
        <td>{value}</td>
      </tr>
    </table></>
  )
}
const Statisticks =({details})=>{
      if(details[0]+details[1]+details[2]>0){
          return(
          <>
            <Section text="statistics"/>
            <StatisticLine text="good" value ={details[0]} />
            <StatisticLine text="neutral" value ={details[1]} />
            <StatisticLine text="bad" value ={details[2]} />
            <StatisticLine text="all" value ={details[0]+details[1]+details[2]} />
            <StatisticLine text="average" value ={(details[0]-details[2])/(details[0]+details[1]+details[2])} />
            <StatisticLine text="positive" value ={(details[0]/(details[0]+details[1]+details[2]))*100 + " %"} />
            </>
          )
      }
      else{
        return(
          <>
          <Section text="statistics"/>
          <div>No feedback given</div>
          </>
        )
      }
}

//main app code compiles here
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
      <Statisticks details={[good,neutral,bad]}/>
    </div>
  )
}

export default App

