import { useState } from 'react'
import { languages } from './languages'
export default function App() {
  const languageElements = languages.map(language => (
      <span 
        style={{backgroundColor: language.backgroundColor,
          color: language.color
        }}
        key={language.name}>
        {language.name}
      </span>
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
    </main>
  )
}


