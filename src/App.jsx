import { useState, useEffect } from 'react'
import './App.css'
import Choices from './components/Choices'

function App() {
  const [quizes, setQuizes] = useState([])
  const [score, setScore] = useState(0)
  
  useEffect(() =>{
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())  
    .then(data => setQuizes(data.results))
  }, [])

  const scoreSet = () => {
    setScore(score => score + 1)
  }

  const displayQuizes = quizes.map((quiz,index) => {
    return(
      <Choices 
        key={index}
        question={quiz.question}
        correctAnswer={quiz.correct_answer} 
        choices={[...quiz.incorrect_answers, quiz.correct_answer]}
        index={index}
        scoreSet={scoreSet}
      />
    )
  })


  return (
    <div className="App">
      { quizes.length > 0 &&
        displayQuizes
      }
      <h1>Score: {score} / {quizes.length}</h1>
      <div className="buttonContainer"><button onClick={()=> window.location.reload()} className="reloadButton">Play Again</button></div>
    </div>
  )
}

export default App
