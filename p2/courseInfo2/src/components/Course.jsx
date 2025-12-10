const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => (
  <div>
    {parts.map((part)=>{
      return <Part key={part.id} part={part}/>
    })}
  </div>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => 
<p>
  <b>
    total of {parts.reduce((sum,part)=> sum+part.exercises,0)} exercises
  </b> 
</p>


const Course =({course})=>{
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )

}
export default Course;