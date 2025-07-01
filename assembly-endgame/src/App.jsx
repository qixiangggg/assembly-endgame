import { useState } from 'react'
import { languages } from './languages'
import { getFarewellText } from './utils'
import clsx from "clsx"
export default function App() {
  //State value
  const [currentWord, setCurrentWord] = useState("react") 
  const [guessedWord, setGuessedWord] = useState([])
  
  //Derived values
  const wrongGuessCount = guessedWord.reduce((acc,curr) => {
    return currentWord.includes(curr) ? acc : acc+1;
  },0)

  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameWon = currentWord.split("").every(word => guessedWord.includes(word))
  const isGameOver = (isGameLost || isGameWon)
  const lastGuessedWord = guessedWord[guessedWord.length-1]
  const isLastGuessedWrong = !currentWord.includes(lastGuessedWord)
  const hasGuessedWrongly = wrongGuessCount > 0 
  const fareWellMessage = isLastGuessedWrong && hasGuessedWrongly ? getFarewellText(languages[wrongGuessCount - 1].name) : ""

  //Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  function addGuessedWord(word){
    setGuessedWord(prevGuessedWord => 
      prevGuessedWord.includes(word) ? prevGuessedWord : [...prevGuessedWord,word]
    )
    
  }

  const languageElements = languages.map((language,index) => (
      <span 
        style={{backgroundColor: language.backgroundColor,
          color: language.color
        }}
        key={language.name}
        className={index<wrongGuessCount ? "lost" : ""}>
        {language.name}
      </span>
    ))
  const currentWordElements = currentWord.split("").map((letter,index) =>
    {
      const isGuessed = guessedWord.includes(letter)
      return (<span key={index}>
        {isGuessed && letter.toUpperCase()}
      </span>)
    }
  )

  const alphabetElements = alphabet.split("").map(letter =>
  (
    <button 
      key={letter} 
      onClick={() => addGuessedWord(letter.toLowerCase())}
      disabled={isGameOver}
      aria-disabled={guessedWord.includes(letter)}
      aria-label={`Letter ${letter}`}
      className={clsx(
        {
          "guessed-correct": guessedWord.includes(letter) && currentWord.includes(letter),
          "guessed-wrong": guessedWord.includes(letter) && !currentWord.includes(letter)
        }
      )}>
      {letter.toUpperCase()}
    </button>
  ))

  const gameStatusClass = clsx(
          "game-status",
          {
            "game-win": isGameWon,
            "game-lost": isGameLost,
            "last-guessed-wrong": fareWellMessage !== ""
          }
        )

  function showGameStatus(){
    if (!isGameOver){
      return (<p>{fareWellMessage}</p>)
    }
    else if (isGameWon){
      return(
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      )
    }
    else{
      return(
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      )
    }
  }

  
  return (
    <main>
      <header>
        <h1 className='title'>Assembly: Endgame</h1>
        <p className='description'>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section aria-live="polite" role="status" className={gameStatusClass}>
        {showGameStatus()}
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className='word'>
        {currentWordElements}
      </section>
      <section 
        className='sr-only'
        aria-live='polite'
        role='status'
      >
        <p>Current Word: {currentWord.split("").map(letter => 
          guessedWord.includes(letter) ? letter + "." :"blank.").join(" ")}</p>
      </section>
      <section className='alphabet'>
        {alphabetElements}
      </section>
      {isGameOver && <button className='new-game'>
        New Game
      </button>}
    </main>
  )
}


