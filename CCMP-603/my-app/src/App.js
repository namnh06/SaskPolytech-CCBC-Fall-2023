import React, { useRef } from "react";

function App() {
  const inputRef = useRef(null);

  const handleBtnClick = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Enter name" />
      <button onClick={handleBtnClick}>Log value</button>
    </div>
  );
}

export default App;