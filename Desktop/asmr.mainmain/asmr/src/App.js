import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container toss-style">
      <h1>ASMR</h1>
      <h6>
        <span>Article</span><br />
        <span>Summarize</span><br />
        <span>Memorize</span><br />
        <span>Recommend</span>
      </h6>
      <h3>더 쉬워진 아티클 요약</h3>
      <form>
        <label htmlFor="todo">웹페이지 주소를 입력하세요:</label>
        <input type="text" id="todo" name="todo" placeholder="URL 입력" />
        <button type="submit">Go</button>
      </form>
      <br />
    </div>
  );
}

export default App;
