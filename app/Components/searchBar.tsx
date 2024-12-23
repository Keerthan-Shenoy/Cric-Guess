'use client'

import { use, useEffect, useState } from "react"


const SearchBar: React.FC = ()  =>{

    const [name, setName] = useState('')
    const [count, setCount] = useState(1)
    const [placeholder, setPlaceholder] = useState("Guess any cricketer!")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if(name){
            setCount(count + 1)
            
            fetch(`http://localhost:5000?name=${encodeURIComponent(name)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response;
            })
            .catch(error => {
                console.error('Error:', error)
            })
            setName('')
        }
    }

    useEffect(() => {
        setPlaceholder(count === 1 ? "Guess any cricketer!" : `Guess ${count} of 8`)
    }, [count])
    
    return (
        <div className="flex justify-center items-center">
            <form className="m-20 w-1/3" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder={placeholder} 
                    onChange={handleChange} 
                    className="border-2 border-solid border-[#cc5147] p-6 text-justify text-[20px] font-bold text-[#9f9286] bg-white w-full"
                />
            </form>
        </div>
    )
}

export default SearchBar;