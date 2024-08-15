import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllow, setNumAllowed] = useState(false)
  const [charAllow, setCharAllowed] = useState(false)
  const [password, setPassword] = useState();

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // checks and add digits if the numbers are allowed
    if (numAllow) { str += "0123456789" }
    // checks and add characters if the characters are allowed
    if (charAllow) { str += "!@#$%^&*(){}[]`" }
    // generate a password of the specified length
    for (let i = 1; i <= length; i++) {
      // generate a random index
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numAllow, charAllow, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => { passwordGenerator() }, [length, numAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='flex items-center justify-center h-screen'>
        <div className='w-1/2 bg-gray-800 p-3 rounded-xl text-cyan-500'>
          <h1 className='text-3xl pb-3'>Password Generator</h1>
          <div className='flex rounded-lg overflow-hidden mb-4 text-xl'>
            <input type="text" value={password} ref={passwordRef} className='py-3 px-4 w-full outline-none' placeholder='Password' />
            <button onClick={copyPasswordToClipboard} className='outline-none bg-cyan-500 text-white font-semibold px-3 py-0.5'>Copy</button>
          </div>
          <div className='flex'>
            <div>
              <input type="range" min={6} max={20} value={length} onChange={(e) => { setLength(e.target.value) }} className='cursor-pointer me-2' />
              <label htmlFor="">Length: {length}</label>
            </div>
            <div className='px-5'>
              <input type="checkbox" defaultChecked={numAllow} onChange={() => { setNumAllowed((prev) => !prev) }} className='me-2' />
              <label htmlFor="">Numbers</label></div>
            <div>
              <input type="checkbox" defaultChecked={charAllow} onChange={() => { setCharAllowed((prev) => !prev) }} className='me-2' />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
