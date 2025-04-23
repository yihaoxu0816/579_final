import styles from "./styles.module.css";
import Button from 'react-bootstrap/Button';

// *
// * @param {object} question - the object of each question in questions.js util
// * @param {function} handleAnswer - The function that updates userAnswer according to user's response
// * @param {string/number} currentChoice - Keeps track of user's current choice and updates the style of the button accordingly
// *

const Question = ({question, handleAnswer, currentChoice}) => {

    return (
        <div>
            <p> {question.prompt} </p>
            <div className={styles.choiceWrapper}>
                <p> {question.description[0]} </p>
                {question.choices.map((choice, index) => 
                <Button 
                    key={index} 
                    onClick={() => handleAnswer(choice)}
                    className={styles.button}
                    variant={choice === currentChoice ? "primary" : "outline-primary"}>
                    {choice}
                </Button>)}
                <p> {question.description[1]} </p>
            </div>
        </div>
    )
}

export default Question;