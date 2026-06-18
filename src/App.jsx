import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [isAllowNumber, setNumber] = useState(false);
  const [isAllowCharacter, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isAllowNumber) str += "0123456789";
    if (isAllowCharacter) str += "!@#$%^&*(){}[]<>?~/|";

    for (let i = 0; i < length; i++) {
      let randomNumber = Math.floor(Math.random() * str.length + 1);
      pass += str[randomNumber];
    }

    setPassword(pass);
  }, [length, isAllowNumber, isAllowCharacter, setPassword]);

  useEffect(()=>{
    generatePassword();
  }, [length, isAllowNumber, isAllowCharacter, generatePassword]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center">
        <div className="w-150 h-30 m-2 p-2 bg-white rounded-3xl mt-20 flex flex-col border-amber-600 border-2">
          <div className="flex m-2 justify-center">
            <input
              type="text"
              className="bg-white rounded-l-2xl border-amber-600 border-2 w-100 px-2"
              value={password}
              readOnly
              ref={passwordRef}
            />
            <button className="bg-blue-700 text-white w-20 p-2 rounded-e-2xl border-blue-900"  onClick={copyPasswordToClipboard}>
              Copy
            </button>
          </div>

          <div className="flex m-2 justify-center">
            <div className="m-2">
              <input
                type="range"
                min={5}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => setLength(e.target.value)}
              />
              <label className="ml-2">Length: {length}</label>
            </div>
            <div className="m-2">
              <input
                type="checkbox"
                value={{ isAllowNumber }}
                onClick={() => setNumber(!isAllowNumber)}
              />
              <label className="ml-1">Number</label>
            </div>
            <div className="m-2">
              <input
                type="checkbox"
                value={{ isAllowCharacter }}
                onClick={() => setCharacter(!isAllowCharacter)}
              />
              <label className="ml-1">Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
