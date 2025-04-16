import styles from "./styles.module.css";

const Question = ({question, handleAnswer, currentChoice}) => {

    return (
        <div>
            <p> {question.prompt} </p>
            <div className={styles.choiceWrapper}>
                <p> {question.description[0]} </p>
                {question.choices.map((choice, index) => <button 
                                                            key={index} 
                                                            onClick={() => handleAnswer(choice)}
                                                            className={choice === currentChoice ? `${styles.selectedButton} ${styles.button}` : styles.button}>
                                                                {choice}
                                                            </button>)}
                <p> {question.description[1]} </p>
            </div>
        </div>
    )
}

export default Question;