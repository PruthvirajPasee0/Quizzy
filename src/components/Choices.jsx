import React from 'react';

export default function Choices(props) {

    const {choices} = props;
    const [currentAnswer, setCurrentAnswer] = React.useState(null)

    const checkAnswer = choice => {
        setCurrentAnswer(currentAnswer => {
          if (currentAnswer !== null) return currentAnswer;
          if (choice === props.correctAnswer) props.scoreSet();
          return choice;
        });
    }
    const randomizedChoices = React.useMemo(() => {
        const randomizedArray = [...choices];
        for (let i = randomizedArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [randomizedArray[i], randomizedArray[j]] = [randomizedArray[j], randomizedArray[i]];
        }
        return randomizedArray;
      }, [choices]);
    

    const displayChoices =  randomizedChoices.map((choice,index) => {
        return(
            <h1 
                key={index} 
                className={`choice ${currentAnswer === choice ? 'selected' : ''} ${currentAnswer && choice === props.correctAnswer ? 'correct' : ''}`}
                onClick={() => checkAnswer(choice)}
            >
                {choice}
            </h1>
        )
    })

    return(
        <div className="quiz">
            <h1>{props.question}</h1>
            <div className="choices">
                {displayChoices}
            </div>
            <hr />
        </div>
    )
}