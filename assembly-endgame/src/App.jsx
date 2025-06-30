import { useState } from 'react'
import { languages } from './languages'
import clsx from "clsx"
export default function App() {
  const [currentWord, setCurrentWord] = useState("react") 
  const [guessedWord, setGuessedWord] = useState([])
  
  const wrongGuessCount = guessedWord.reduce((acc,curr) => {
    return currentWord.includes(curr) ? acc : acc+1;
  },0)

  const isGameLost = wrongGuessCount >= languages.length - 1
  const isGameWon = currentWord.split("").every(word => guessedWord.includes(word))
  const isGameOver = (isGameLost || isGameWon)

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
      className={clsx(
        {
          "guessed-correct": guessedWord.includes(letter) && currentWord.includes(letter),
          "guessed-wrong": guessedWord.includes(letter) && !currentWord.includes(letter)
        }
      )}>
      {letter.toUpperCase()}
    </button>
  ))

  function showGameStatus(){
    return(
      <section className={
        clsx(
          "game-status",
          {
            "game-win": isGameWon,
            "game-lost": isGameLost
          }
        )
      }>
        <h2>{
        isGameWon ? "You win!" : isGameLost ? "Game over!" :""
        }</h2>
        <p>{
          isGameWon ? "Well done!🎉" : isGameLost ? "You lose! Better start learning Assembly 😭": ""
          }</p>
      </section>
    )
  }

  
  return (
    <main>
      <header>
        <h1 className='title'>Assembly: Endgame</h1>
        <p className='description'>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      {showGameStatus()}
      <section className="languages">
        {languageElements}
      </section>
      <section className='word'>
        {currentWordElements}
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


