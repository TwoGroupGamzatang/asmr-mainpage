import React, { Component } from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Interest from './Interest';
import articlesData from './articles.json';
import MemoList from './components/MemoList';
import { getContents, login, scrape, signup } from './api';

class App extends Component {
  state = {
    pageName: '',
    loggedIn: false,
    interestsSelected: false,
    isLogin: true,
    url: '', // URL을 상태로 관리
    domain: '', // 도메인을 상태로 관리
    selectedArticle: null, // 선택된 아티클
    articles: articlesData.articles, // JSON 데이터를 상태로 관리
    selectedTags: [], // 선택된 태그를 상태로 관리
    token: null, // 로그인 토큰
    contentId: '665c091ca5da78d6f1ff32ac' // Example contentId, change as needed
  };

  componentDidMount() {
    window.onpopstate = (event) => {
      this.onChangePage(event.state);
    };
  }

  onChangePage = (pageName) => {
    this.setState({ pageName, selectedArticle: null }); // 페이지 전환 시 selectedArticle을 null로 설정
  };

  onLoginSuccess = (accessToken) => {
    try {
      this.setState({ loggedIn: true, token: accessToken });
      this.onChangePage('interests');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  onSignupSuccess = async (email, password) => {
    try {
      const response = await login(email, password);
      this.setState({ loggedIn: true, token: response.data.token });
      this.onChangePage('interests');
    } catch (error) {
      console.error('Signup login failed', error);
    }
  };

  onInterestsSelected = (selectedTags) => {
    this.setState({ interestsSelected: true, selectedTags });
    this.onChangePage('');
  };

  onLogout = () => {
    this.setState({ loggedIn: false, interestsSelected: false, url: '', token: null }); // 로그아웃 시 URL과 토큰도 초기화
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('selectedInterests');
    this.onChangePage('');
  };

  onUrlSubmit = async (url) => {
    this.setState({ url });
    const response = await scrape(this.state.token, url);

    console.log(`data: ${response.data}`);
  };


  onArticleSelect = (article) => {
    this.setState({ selectedArticle: article });
  };

  onArticleUpdate = (updatedArticle) => {
    this.setState((prevState) => ({
      articles: prevState.articles.map(article =>
        article.title === updatedArticle.title ? updatedArticle : article
      ),
      selectedArticle: updatedArticle,
    }));
  };

  render() {
    const { pageName, loggedIn, interestsSelected, isLogin, url, domain, selectedArticle, articles, selectedTags, token, contentId } = this.state;

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
            <button onClick={async() => {
              this.onChangePage('archive');
              const response = await getContents(this.state.token);
              console.log(`contents: ${JSON.stringify(response.data.contents)}`);
              this.setState({articles: response.data.contents});
              }}>Archive</button>
            <button onClick={() => this.onChangePage('mypage')}>Mypage</button>
            <button onClick={() => this.onChangePage('summarize')}>Summarize</button>
            <button onClick={this.onLogout}>Logout</button>
            {pageName === '' && <Interest onInterestsSelected={this.onInterestsSelected} onLogout={this.onLogout} />}
            {pageName === 'archive' && <Page1 articles={articles} onArticleSelect={this.onArticleSelect} />}
            {pageName === 'mypage' && <Interest onInterestsSelected={this.onInterestsSelected} onLogout={this.onLogout} />}
            {pageName === 'summarize' && <SummarizePage onUrlSubmit={this.onUrlSubmit} />}
            {pageName === 'archive' && selectedArticle && (
              <ArticleDetail
                article={selectedArticle}
                onArticleUpdate={this.onArticleUpdate}
                availableTags={selectedTags}
              />
            )}
            {pageName === 'memo' && <MemoList contentId={contentId} token={token} />}
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

function SummarizePage({ onUrlSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const url = event.target.todo.value;
    onUrlSubmit(url);
  };

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="todo">웹페이지 주소를 입력하세요:</label>
        <input type="text" id="todo" name="todo" placeholder="URL 입력" />
        <button type="submit">Go</button>
      </form>
      <br />
    </div>
  );
}

function Page1({ articles, onArticleSelect }) {
  return (
    <div className="App">
      <h1>Archive Page</h1>
      {articles.map(article => (
        <div key={article.title}>
          <h2 onClick={() => onArticleSelect(article)}>{article.title}</h2>
        </div>
      ))}
    </div>
  );
}

class ArticleDetail extends Component {
  state = {
    showSummary: false,
    summaryLength: '5min',
    tags: this.props.article.tags,
    availableTags: this.props.availableTags.map(tag => ({
      name: tag,
      selected: this.props.article.tags.includes(tag)
    }))
  };

  toggleSummary = () => {
    this.setState({ showSummary: !this.state.showSummary });
  };

  handleSummaryChange = (event) => {
    this.setState({ summaryLength: event.target.value });
  };

  handleTagsChange = (id) => {
    const updatedTags = this.state.availableTags.map(tag => {
      if (tag.name === id) {
        return { ...tag, selected: !tag.selected };
      }
      return tag;
    });
    this.setState({ availableTags: updatedTags });
  };

  saveChanges = () => {
    const updatedArticle = {
      ...this.props.article,
      tags: this.state.availableTags.filter(tag => tag.selected).map(tag => tag.name),
    };
    this.props.onArticleUpdate(updatedArticle);
  };

  render() {
    const { article } = this.props;
    const { showSummary, availableTags } = this.state;
    const response = (this.state.token)
    return (
      <div className="article-detail">
        <h2>{article.title}</h2>
        <button onClick={this.toggleSummary}>
          {showSummary ? 'Hide Summary' : 'Show Summary'}
        </button>
        {showSummary &&
        <div>
        ${JSON.stringify(response.data.contents.summary)}
        </div>
        };
        
        <label>
        <br></br>  
        Tags:
          <div>
            {availableTags.map(tag => (
              <div key={tag.name}>
                <input
                  type="checkbox"
                  id={`tag-${tag.name}`}
                  checked={tag.selected}
                  onChange={() => this.handleTagsChange(tag.name)}
                />
                <label htmlFor={`tag-${tag.name}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </label>
        <button onClick={this.saveChanges}>Save Changes</button>
        <p>Tags: {availableTags.filter(tag => tag.selected).map(tag => tag.name).join(', ')}</p>
        <a href={article.originalLink} target="_blank" rel="noopener noreferrer">Read more</a>
      </div>
    );
  }
}

export default App;
