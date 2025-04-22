import { useState } from "react"; 
// Util
import {studySpaces} from "../util/study.js";
import {questionsList} from "../util/questions.js";
// Components
import Question from "./Question.js";
import StudySpace from "./StudySpace.js";
import Filter from "./Filter.js";
// Bootstrap components
import styles from "./styles.module.css";
import Button from 'react-bootstrap/Button';


const MainScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState({region: null, quietness: null, lighting: null});
  const [filteredSpace, setfilteredSpace] = useState(studySpaces);
  const [showResults, setShowResults] = useState(false);
  const [displayAllSpaces, setDisplayAllSpaces] = useState(false);
  const [userFilter, setUserFilter] = useState({region: "all", quietness: "all", lighting: "all"});

  const [userFavorite, setUserFavorite] = useState(localStorage.getItem('userFavorite') ? JSON.parse(localStorage.getItem('userFavorite')) : []);

  const handleAnswer = (answer) => {
    const key = questionsList[currentQuestion].key;
    setUserAnswer((previousValue) => ({
      ...previousValue, [key]: answer
    }));
  }

  const nextQuestion = () => {
    currentQuestion < questionsList.length - 1 ? setCurrentQuestion((previousValue) => previousValue + 1) : setShowResults(true);
    if (currentQuestion >= questionsList.length - 1) {
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
    setfilteredSpace(studySpaces);
  }

  const toggleFilter = (e, key) => {
    const newFilter = {...userFilter, [key]: e.target.value};
    setUserFilter(newFilter);
    setfilteredSpace(studySpaces.filter((space) => 
      (newFilter.region === space.region || newFilter.region === "doesn't matter" || newFilter.region === "all") && 
      (Number(newFilter.quietness) === space.quietness || newFilter.quietness === "all") &&
      (Number(newFilter.lighting) === space.lighting  || newFilter.lighting === "all")
    ))
  }

  const startOver = () => {
    setCurrentQuestion(0);
    setUserAnswer({region: null, quietness: null, lighting: null});
    setfilteredSpace(studySpaces);
    setShowResults(false);
    setDisplayAllSpaces(false);
    setUserFilter({region: "all", quietness: "all", lighting: "all"});
  }

  const toggleFavorite = (name) => {
    const updatedFavorite = userFavorite.includes(name) ? userFavorite.filter(favorite => favorite !== name) : [...userFavorite, name];
    setUserFavorite(updatedFavorite);
    localStorage.setItem('userFavorite', JSON.stringify(updatedFavorite));
  };



  return (
    <>
      <h1>{displayAllSpaces ? 'All study spaces' : 'Find the best study space for you'}</h1>

      {/* { --- The Quiz Questions --- } */}

      {(!showResults && !displayAllSpaces) &&
        <>
          <Question question={questionsList[currentQuestion]}
                    handleAnswer={handleAnswer}
                    currentChoice={userAnswer[questionsList[currentQuestion].key]}>
          </Question> 
          <Button 
            onClick={nextQuestion} 
            disabled={userAnswer[questionsList[currentQuestion].key] === null}
            className={styles.nextButton}
            variant={currentQuestion < questionsList.length - 1 ? "primary" : "success"}>
              { currentQuestion < questionsList.length - 1 ? "Next" : "Show Results" }
          </Button>
        </>
      }

      {/* { --- Showing Quiz Results --- } */}

      {(showResults && filteredSpace.length === 0) && <h2>Sorry, we couldn't find you a match :(</h2>}

      {showResults &&
        <div className={styles.spaceContainer}>
          {filteredSpace.map((space, index) => 
            <StudySpace
              key={index}
              spaceInfo={space}
              userFavorite={userFavorite}
              toggleFavorite={toggleFavorite}
            />
          )}
        </div>
      }

      {(!displayAllSpaces && showResults) && 
        <Button className={styles.nextButton} onClick={toggleAllResults}>Show All Study Spaces</Button>}

      {/* { --- Displaying All Study Spaces --- } */}

      {displayAllSpaces &&
        <>
          <div className={styles.topBarContainer}>
            <div className={styles.filtersContainer}>
              {questionsList.map((question, index) => (
                <Filter key={index} question={question} toggleFilter={toggleFilter}></Filter>

              ))}
            </div>
            <Button onClick={startOver}>Start Another Quiz</Button>
          </div>

          <div className={styles.spaceContainer}>
            {filteredSpace.map((space, index) => 
              <StudySpace
                key={index}
                spaceInfo={space}
                userFavorite={userFavorite}
                toggleFavorite={toggleFavorite}
              />
            )}
          </div>
        </>
      }

      {/* { --- Your Favorite Spaces --- } */}

      {(showResults || displayAllSpaces) &&
        <>
          <div className={styles.break}></div>
          <h2>My Favorites</h2>
          <div className={styles.spaceContainer}>
            {studySpaces.filter(space => userFavorite.includes(space.name)).map((space, index) => (
              <StudySpace
                key={index}
                spaceInfo={space}
                userFavorite={userFavorite}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      }

    </>
  );
}
  
  export default MainScreen;