import { useState, useCallback } from "react"

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordGenerator = useCallback(() => {
    
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length))
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed])

  const copyPassword = () => {
    navigator.clipboard.writeText(password)
    alert("Password copied!")
  }

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 my-8 text-orange-500 bg-gray-500'>

        <h1 className='text-center text-2xl font-bold mb-4'>
          Password Generator
        </h1>

        <div className='mb-4'>
          <label className='block mb-2'>
            Password Length: {length}
          </label>

          <input
            type="range"
            min="4"
            max="20"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className='w-full cursor-pointer'
          />
        </div>

        <div className='mb-4'>

          <label className='block mb-2'>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={(e) => setNumberAllowed(e.target.checked)}
              className='mr-2'
            />
            Include Numbers
          </label>

          <label className='block mb-2'>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={(e) => setCharAllowed(e.target.checked)}
              className='mr-2'
            />
            Include Special Characters
          </label>

        </div>

        <button
          onClick={passwordGenerator}
          className='w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300'
        >
          Generate Password
        </button>

        {password && (
          <div className='mt-4 p-4 bg-gray-700 text-white rounded break-all'>

            <strong>Generated Password:</strong>

            <div className='mt-2 flex items-center justify-between gap-2'>

              <span>{password}</span>

              <button
                onClick={copyPassword}
                className='bg-orange-500 px-3 py-1 rounded hover:bg-orange-600'
              >
                Copy
              </button>

            </div>

          </div>
        )}

      </div>
    </>
  )
}

export default App