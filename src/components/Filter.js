import styles from "./styles.module.css";
// *
// * @param {object} question - the question that corresponds to each filter option
// * @param {function} toggleFilter - The function that updates the userFilter state
// *
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