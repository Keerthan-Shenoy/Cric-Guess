'use client'

import { useState } from "react";
import SearchBar from "./Components/searchBar";
import Guess from "./Components/Guess";

export default function Home() {

  const [guess, setGuess] = useState<any[]>([])
  
  const addData = (data: any) => {
    const newGuess = [...guess, data]
    setGuess(newGuess)
    localStorage.setItem('guess', JSON.stringify(newGuess))
  }


  return (
    <div>
      <SearchBar add={addData} />
      {
        guess.map((i, index) => (
          <Guess key={index} data={i} />
        ))
      }
    </div>
  );
}
