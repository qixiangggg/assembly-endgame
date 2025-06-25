import { useState } from 'react'
import { languages } from './languages'
export default function App() {
  const [currentWord, setCurrentWord] = useState("react") 

  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  const languageElements = languages.map(language => (
      <span 
        style={{backgroundColor: language.backgroundColor,
          color: language.color
        }}
        key={language.name}>
        {language.name}
      </span>
    ))
  const currentWordElements = currentWord.toUpperCase().split("").map((letter,index) =>
    (
      <span key={index}>
        {letter}
      </span>
    )
  )

  const alphabetElements = alphabet.toUpperCase().split("").map(letter =>
  (
    <button key={letter}>
      {letter}
    </button>
  ))
  return (
    <main>
      <header>
        <h1 className='title'>Assembly: Endgame</h1>
        <p className='description'>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
      </header>
      <section className='game-status'>
        <h2>You win!</h2>
        <p>Well done!🎉</p>
      </section>
      <section className="languages">
        {languageElements}
      </section>
      <section className='word'>
        {currentWordElements}
      </section>
      <section className='alphabet'>
        {alphabetElements}
      </section>
      <button className='new-game'>
        New Game
      </button>
    </main>
  )
}


