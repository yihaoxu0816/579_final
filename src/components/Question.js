import styles from "./styles.module.css";
import Button from 'react-bootstrap/Button';


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