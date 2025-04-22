import styles from "./styles.module.css";

const Filter = ({question, toggleFilter}) => {

    return (
        <div>
            <label htmlFor={question.key}>{question.key}: </label>
            <select className={styles.dropDown} id={question.key} onChange={(e) => toggleFilter(e, question.key)}>
                <option value="all">all</option>
                {question.choices.map((choice, index) => (
                <option key={index} value={choice}>{choice}</option>
                ))}
            </select>
        </div>
    )
}

export default Filter;