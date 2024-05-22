import React, { Component } from 'react';
import './App.css';
import TodoList from './TodoList';
import Signup from './Signup';
import Login from './Login';
import Interest from './Interest';

class App extends Component {
  state = {
    pageName: '',
    loggedIn: false,
    interestsSelected: false,
    isLogin: true,
  };

  componentDidMount() {
    window.onpopstate = (event) => {
      this.onChangePage(event.state);
    };
  }

  onChangePage = (pageName) => {
    this.setState({ pageName });
  };

  onLoginSuccess = () => {
    this.setState({ loggedIn: true });
    this.onChangePage('interests');
  };

  onSignupSuccess = () => {
    this.setState({ loggedIn: true });
    this.onChangePage('interests');
  };

  onInterestsSelected = () => {
    this.setState({ interestsSelected: true });
    this.onChangePage('');
  };

  onLogout = () => {
    this.setState({ loggedIn: false, interestsSelected: false });
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('selectedInterests');
    this.onChangePage('');
  };

  render() {
    const { pageName, loggedIn, interestsSelected, isLogin } = this.state;

    return (
      <div>
        {!loggedIn && !interestsSelected && isLogin && (
          <Login onLoginSuccess={this.onLoginSuccess} />
        )}

        {!loggedIn && !interestsSelected && !isLogin && (
          <Signup onSignupSuccess={this.onSignupSuccess} />
        )}

        {loggedIn && !interestsSelected && (
          <Interest onInterestsSelected={this.onInterestsSelected} onLogout={this.onLogout} />
        )}

        {loggedIn && interestsSelected && (
          <div>
            <button onClick={() => this.onChangePage('archive')}>Archive</button>
            <button onClick={() => this.onChangePage('mypage')}>Mypage</button>
            <button onClick={() => this.onChangePage('summarize')}>Summarize</button>
            {!pageName && <Interest onInterestsSelected={this.onInterestsSelected} onLogout={this.onLogout} />}
            {pageName === 'archive' && <Page1 />}
            {pageName === 'mypage' && <Interest onInterestsSelected={this.onInterestsSelected} onLogout={this.onLogout} />}
            {pageName === 'summarize' && <Page2 />}
          </div>
        )}

        {!loggedIn && !interestsSelected && (
          <div>
            <button onClick={() => this.setState({ isLogin: true })}>로그인</button>
            <button onClick={() => this.setState({ isLogin: false })}>회원가입</button>
          </div>
        )}

        {!loggedIn && !interestsSelected && !isLogin && (
          <div>
            <p>이미 계정이 있으신가요? 여기에서 <button onClick={() => this.setState({ isLogin: true })}>로그인</button>하세요.</p>
          </div>
        )}
      </div>
    );
  }
}

function Page1() {
  return (
    <div className="App">
      <TodoList />
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
