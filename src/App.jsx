import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(0);
  const [charAllowed, setCharAllowed] = useState(0);
  const [password, setPassword] = useState('');
  const [hashersAllowed, setHashersAllowed] = useState(0);
  const [buttonColor, setButtonColor] = useState("bg-teal-500");

  const passwordGenerator = useCallback(() => {
    let pwrd = '';
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    const symb = "!@#$%^&*()_+-={}[]|\\:;";
    const hashers = "_.-";
    
    let str = lowerCase;
    if (upperCaseAllowed) str += upperCase;
    if (numberAllowed) str += nums;
    if (hashersAllowed) {
      str += hashers;
      setCharAllowed(0);  // Disable charAllowed when hashers are allowed
    }
    if (charAllowed) str += symb;

    for (let i = 0; i < length; i++) {
      pwrd += str[Math.floor(Math.random() * str.length)];
    }
    setPassword(pwrd);
  }, [length, upperCaseAllowed, numberAllowed, hashersAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, upperCaseAllowed, charAllowed, passwordGenerator]);

  // Ensure charAllowed is disabled if hashersAllowed is enabled
  useEffect(() => {
    if (hashersAllowed) {
      setCharAllowed(0);
    }
  }, [hashersAllowed]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  function generatePasswordClicked() {
    setButtonColor("bg-teal-400");
    setTimeout(() => {
      setButtonColor("bg-teal-500");
    }, 300);
    return passwordGenerator();
  }

  return (
    <div className="w-full h-screen pt-0.5 duration-200 bg-slate-950 p-0 m-0" style={{ fontFamily: 'Arial, Helvetica, sans-serif', boxSizing: 'border-box' }}>
      <div className="bg-slate-950 text-yellow-50 p-0 m-0">
        <div className="m-12 max-w-3xl" style={{ marginLeft: '12%', marginTop: '6%', width: '90%' }}>
          <h1 className="font-sans text-6xl font-semibold">Generate a <br /><span className="text-teal-400 border-b-2 border-teal-500 border-solid pb-2 ">Random Password</span> </h1>
          <div className="mt-12 mb-8 text-[#333] flex items-center justify-between py-5 px-7 rounded-md bg-white" style={{ width: '100%' }}>
            <input 
              className="outline-none text-4xl m-0 p-4"
              type="text" 
              placeholder="password" 
              id="password" 
              value={password} 
              ref={passwordRef}
            />
            <button onClick={copyPasswordToClipboard} className='text-white shrink-0 px-3 py-2 mr-5 rounded-lg hover:bg-teal-200'>
              <img className="w-10 cursor-pointer" src="images/copy.png" alt="copy" id="copy" />
            </button>
          </div>

          <div>
            <ul className="flex mb-4 rounded-lg cursor-pointer">
              <p className="text-lg font-medium mr-3">Select your Password Length: </p>
              <div className='bg-white rounded-3xl px-4'>
                <input
                  type='range'
                  min={6}
                  max={101}
                  value={length}
                  className='cursor-pointer w-[180px] appearance-none h-1 bg-slate-800 rounded-full mt-3'
                  onChange={(e) => { setLength(e.target.value) }}
                />
              </div>
              <label className='text-lg font-medium ml-1 mt-0.5 text-orange-400'>Length: {length}</label>
              <div className=' mx-6 mt-0.5'>or</div>
              <li onClick={() => setLength(8)} className="bg-teal-200 text-cyan-950 py-1 px-4 rounded-s-lg hover:bg-teal-400" id="list1">8</li>
              <li onClick={() => setLength(12)} className="bg-teal-200 text-cyan-950 py-1 px-4 border-x-[1px] border-x-black hover:bg-teal-500" id="list2">12</li>
              <li onClick={() => setLength(16)} className="bg-teal-200 text-cyan-950 py-1 px-4 rounded-e-lg hover:bg-teal-400" id="list3">16</li>
            </ul>
          </div>

          <ul className='flex mb-4 text-orange-400 font-medium text-lg'>
            <li>
              <input
                type='checkbox'
                checked={upperCaseAllowed}
                id='upperCaseInput'
                onChange={() => {
                  setUpperCaseAllowed((prev) => !prev);
                }}
              />
              <label className='ml-2' htmlFor='upperCaseInput'>Uppercase</label>
            </li>
            <li className='ml-6'>
              <input
                type='checkbox'
                checked={numberAllowed}
                id='numberInput'
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label className='ml-2' htmlFor='numberInput'>Numbers</label>
            </li>
            <li className='ml-6'>
              <input
                type='checkbox'
                checked={charAllowed}
                id='characterInput'
                disabled={hashersAllowed} //* disables character input if hashers are allowed.
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label className='ml-2' htmlFor='characterInput'>Characters(Symbols)</label>
            </li>
            <li className='ml-6'>
              <input
                type='checkbox'
                checked={hashersAllowed}
                id='hashingInput'
                onChange={() => {
                  setHashersAllowed((prev) => !prev);
                  setCharAllowed(0);
                }}
              />
              <label className='ml-2' htmlFor='hashingInput'>Hashing(Symbols)</label>
            </li>
          </ul>
          <button onClick={() => generatePasswordClicked()} className={`${buttonColor} text-white rounded-lg p-1 flex items-center font-light justify-center py-4 px-6 cursor-pointer text-3xl`} id="go">
            <img className="w-4 mr-1" src="images/generate.png" alt="generate"/> Generate Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
