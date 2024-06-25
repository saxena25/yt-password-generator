import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
    let pass='';
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    
    if (numbersAllowed) {
      str+='1234567890';
    }

    if (charAllowed) {
      str+='!@#$%^&*_+~';
    }

    for(let i=1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1);// this will create a random index number
      pass += str.charAt(char);// this will add a character at index. index is created by char above
    }

    setPassword(pass);

  },[length, numbersAllowed, charAllowed]);

  function handleCopy(){
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charAllowed, passwordGenerator]);

  return (
    <>
    <div>
      <h1>Password Generator</h1>
      <input 
        type="text"
        value={password}
        readOnly
        placeholder='password' 
        ref={passwordRef}
      />
      <button onClick={handleCopy}>Copy</button>
    </div>
    <div>
      <input 
        type="range"
        value={length}
        min={6}
        max={16} 
        id='length'
        onChange={(e)=> {setLength(e.target.value)}}
      />
      <label htmlFor="length">length: {length}</label>
    </div>
    <div>
      <input type="checkbox" id="numberAllowed"
        defaultChecked={numbersAllowed}
        onChange={()=>{
          setNumberAllowed((prev)=> !prev);
        }} />
        <label htmlFor="numberAllowed">Numbers</label>
    </div>
    <div>
      <input type="checkbox" 
        id="charAllowed"
        defaultChecked={charAllowed}
        onChange={()=>{
          setCharAllowed((prev)=> !prev);
        }} />
        <label htmlFor="charAllowed">Special Char</label>
    </div>
    </>
  )
}

export default App
