import { useState } from "react"; 
import Question from "./Question.js";
import StudySpace from "./StudySpace.js";
import {studySpaces} from "../util/study.js";
import {questionsList} from "../util/questions.js";
import styles from "./styles.module.css";

const MainScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState({region: null, quietness: null, lighting: null});
  const [filteredSpace, setfilteredSpace] = useState(studySpaces);
  const [showResults, setShowResults] = useState(false);
  const [displayAllSpaces, setDisplayAllSpaces] = useState(false);

  const handleAnswer = (answer) => {
    const key = questionsList[currentQuestion].key;
    setUserAnswer((previousValue) => ({
      ...previousValue, [key]: answer
    }));
  }

  const nextQuestion = () => {
    currentQuestion < 2 ? setCurrentQuestion((previousValue) => previousValue + 1) : setShowResults(true);
    if (currentQuestion === 2) {
      setfilteredSpace((previousValue) => previousValue.filter((space) => 
                                                                  (userAnswer.region === space.region || userAnswer.region === "doesn't matter") && 
                                                                  userAnswer.quietness === space.quietness &&
                                                                  userAnswer.lighting === space.lighting
                                                              ))
    }
  }

  const toggleAllResults = () => {
    setShowResults(false);
    setDisplayAllSpaces(true);
  }

  return (
    <>
      <h1>Find the best study space for you</h1>
      {(!showResults && !displayAllSpaces) &&
        <>
          <Question question={questionsList[currentQuestion]} 
                    handleAnswer={handleAnswer} 
                    currentChoice={userAnswer[questionsList[currentQuestion].key]}>
          </Question> 
          <button 
            onClick={nextQuestion} 
            disabled={userAnswer[questionsList[currentQuestion].key] === null}
            className={currentQuestion < 2 ? styles.nextButton : `${styles.nextButton} ${styles.showResultButton}`}>
              { currentQuestion < 2 ? "Next" : "Show Results" }
          </button>
        </>
      }

      <p>{JSON.stringify(userAnswer)}</p>

      <div className={styles.spaceContainer}>
        {showResults && filteredSpace.map((space, index) => <StudySpace key={index} spaceInfo={space}></StudySpace>)}
        {displayAllSpaces && studySpaces.map((space, index) => <StudySpace key={index} spaceInfo={space}></StudySpace>)}
        {(showResults && filteredSpace.length === 0) && <h2>Sorry, we couldn't find you a match :(</h2>}
      </div>

      {(!displayAllSpaces && showResults) && <button className={styles.nextButton} onClick={toggleAllResults}>Show All Study Spaces</button>}
    </>
  );
}
  
  export default MainScreen;