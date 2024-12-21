'use client'

import { useState } from "react"

export default function SearchBar() {

    const [name, setName] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    return (
        <div className="flex justify-center items-center">
            <form className="m-20 w-1/3">
                <input 
                    type="text" 
                    placeholder="Guess any cricketer!" 
                    onChange={handleChange} 
                    className="border-2 border-solid border-[#cc5147] p-6 text-justify text-[20px] font-bold text-[#9f9286] bg-white w-full"
                />
            </form>
        </div>
    )
}