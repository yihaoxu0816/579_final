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
  // {number} Tracks the current question the user is at
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // {object} Tracks the choices the user has been made for each question
  const [userAnswer, setUserAnswer] = useState({region: null, quietness: null, lighting: null});
  // {array} Stores an array of study space objects that has been filtered out based on userAnswer
  const [filteredSpace, setfilteredSpace] = useState(studySpaces);
  // {boolean} Decides whether the page should display the results from the questions
  const [showResults, setShowResults] = useState(false);
  // {boolean} Decides whether the page should display all study spaces when user clicks "All study spaces"
  const [displayAllSpaces, setDisplayAllSpaces] = useState(false);
  // {object} Stores the user's filter options at the "Show All Study Spaces" status
  const [userFilter, setUserFilter] = useState({region: "all", quietness: "all", lighting: "all"});
  // {array} Stores the name strings of user's favorited study spaces
  const [userFavorite, setUserFavorite] = useState(localStorage.getItem('userFavorite') ? JSON.parse(localStorage.getItem('userFavorite')) : []);

  // The handleAnswer function changes the userAnswer state
  // whenever the user makes a chioce on each question. 
  //
  // - It grabs the current question's "key" property
  //   to be used as the key of the corresponding answer's property
  //   when updating the userAnswer state. 
  //
  // - It will be passed into the <Question /> component
  //   in the onClick event handler of each choice button. 
  //
  // * @param {string/number} answer - the value of the choice user made for each question
  //
  const handleAnswer = (answer) => {
    const key = questionsList[currentQuestion].key;
    setUserAnswer((previousValue) => ({
      ...previousValue, [key]: answer
    }));
  }

  // The nextQuestion function changes the currentQuestion/showResults/filteredSpace states
  // whenever the user decides to move on to the next question. 
  //
  // - If the value(number) of currentQuestion is less than the total length of the questionsList, 
  //   then currentQuestion increment by 1. 
  //
  // - Else, it toggles showResults to true, and then the results will be filtered out
  //   based on userAnswer. 
  //
  // It will be passed into the <Question /> component
  // in the onClick event handler of each choice button. 
  //
  // * @param {string/number} answer - the value of the choice user made for each question
  //
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

  // The toggleAllResults function changes the showResults/displayAllSpaces/filteredSpace states
  // whenever the user chooses to show all the study spaces. 
  //
  // - It is passed into the onClick event handler in the "Show all study spaces" button
  //
  const toggleAllResults = () => {
    setShowResults(false);
    setDisplayAllSpaces(true);
    setfilteredSpace(studySpaces);
  }

  // The toggleFilter function changes the userFilter/filteredSpace states
  // whenever the user makes a change on one of the filter option dropdowns. 
  //
  // - It updates the userFilter state by grabbing the "key" property 
  //   of each question object in the questionsList array, similar to the handleAnswer function. 
  //   Then, the study spaces gets filters out and re-renders based on the filter options. 
  //
  // - It will be passed into the <Filter /> component
  //   in the onChance event handler of each dropdown. 
  //
  // * @param {event object} e - the event object used to track the target.value of each dropdown
  // * @param {string} - used as the key of the specific property when updating userFilter
  //
  const toggleFilter = (e, key) => {
    const newFilter = {...userFilter, [key]: e.target.value};
    setUserFilter(newFilter);
    setfilteredSpace(studySpaces.filter((space) => 
      (newFilter.region === space.region || newFilter.region === "doesn't matter" || newFilter.region === "all") && 
      (Number(newFilter.quietness) === space.quietness || newFilter.quietness === "all") &&
      (Number(newFilter.lighting) === space.lighting  || newFilter.lighting === "all")
    ))
  }

  // The startOver function resets all states to its default value
  // and lets users to start over the questions again. 
  //
  // - It is passed into the onClick event handler of the "start over" button. 
  //
  const startOver = () => {
    setCurrentQuestion(0);
    setUserAnswer({region: null, quietness: null, lighting: null});
    setfilteredSpace(studySpaces);
    setShowResults(false);
    setDisplayAllSpaces(false);
    setUserFilter({region: "all", quietness: "all", lighting: "all"});
  }

  // The toggleFavorite function changes the userFavorite state
  // whenever the user tries to add or remove a study space from favorites. 
  //
  // - If the name of the target study space already exists in the userFavorit array, 
  //   then the array updates by filtering the study space out. 
  // - Else, it will add the study space to the end of the array. 
  // 
  // - It will be passed into the <StudySpace /> component
  //   in the onClick event handler of the "Like" button in each study space. 
  //
  // * @param {string} name - the value of the "name" property of each study space object
  //
  const toggleFavorite = (name) => {
    const updatedFavorite = userFavorite.includes(name) ? userFavorite.filter(favorite => favorite !== name) : [...userFavorite, name];
    setUserFavorite(updatedFavorite);
    localStorage.setItem('userFavorite', JSON.stringify(updatedFavorite));
  };



  return (
    <>
      <h1>{displayAllSpaces ? 'All study spaces' : 'Find the best study space for you'}</h1>

      {/*  --- The Quiz Questions ---  
      
      - Shows the question using the <Question /> Component
      - Renders question content according to the questionsList array (from questions.js util)
      - Only renders if showResults and displayAllSpaces are both false
      
      */}

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

      {/*  --- Showing Quiz Results ---  
      
        - Shows the matching study spaces based on user responce
        - Renders study space card components using loops according to the filteredSpace array
        - Only renders after the user completes all questions

      */}

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


      {/*  --- Displaying All Study Spaces ---
      
        - Shows all the study spaces in the study.js util
        - Renders study space card components using loops
        - Only renders after the user clicks the "Show all study spaces" button

      */}

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

      {/*  --- Your Favorite Spaces ---
        - Shows the study spaces based on saved user favorites
        - Renders study space components by filtering the names of the study spaces in the userFavorite array
        - Only renders after the user completes all questions
      */}

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