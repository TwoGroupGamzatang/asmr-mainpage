import React ,{Component} from 'react';
import './App.css';
import TodoList from './TodoList'

class App extends Component {
  state = {                               
    pageName : ''
  }
  componentDidMount () {
    window.onpopstate =  (event) => {
      this.onChangePage(event.state)
    }
  }
  onChangePage = pageName => {
    this.setState({pageName})
  }

  onClick1 = () => {
    const pageName = 'archive';
    window.history.pushState(pageName, '', '/archive');
    this.onChangePage(pageName);  
  }
  
  onClick2 = () => {
    const pageName = 'summarize';
    window.history.pushState(pageName, '', '/summarize');
    this.onChangePage(pageName)  
  }
  render () {
    const {pageName} = this.state;
    return (
      <div>
        <button onClick={this.onClick1}>Archive</button>
        <button onClick={this.onClick2}>Summarize</button>
        {!pageName && <Home/>}              
        {pageName==='archive'&&<Page1/>}
        {pageName==='summarize'&&<Page2/>}
      </div>
    )
  }
}
function Home(){            
  return (
    <div className="container toss-style">
      <h1>ASMR</h1>
      <h5>
        <span>Article</span><br />
        <span>Summarize</span><br />
        <span>Memorize</span><br />
        <span>Recommend</span>
      </h5>
  <h3>여기는 메인페이지입니다. 원하는 메뉴를 클릭하세요.</h3>
  </div>
  );
}
function Page1() {
  return (
    <div className="App">
      <TodoList/>
    </div>
  );
}


function Page2() {
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