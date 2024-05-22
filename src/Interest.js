import React, { Component } from 'react';
import './App.css';

class Interest extends Component {
  state = {
    interests: [
      { id: 1, name: '웹 개발', category: '프론트엔드', selected: false },
      { id: 2, name: '모바일 앱 개발', category: '프론트엔드', selected: false },
      { id: 3, name: 'UI/UX디자인', category: '프론트엔드', selected: false },
      { id: 4, name: '서버개발', category: '백엔드', selected: false },
      { id: 5, name: 'DB관리', category: '백엔드', selected: false },
      { id: 6, name: '아키텍쳐', category: '백엔드', selected: false },
      { id: 7, name: '보안', category: '백엔드', selected: false },
      { id: 8, name: '운영/배포', category: '백엔드', selected: false },
      { id: 9, name: '머신러닝', category: 'AI', selected: false },
      { id: 10, name: '데이터과학', category: 'AI', selected: false },
      { id: 11, name: '생성형AI', category: 'AI', selected: false },
      { id: 12, name: '추천시스템', category: 'AI', selected: false },
      { id: 13, name: '프로젝트 계획', category: 'PM', selected: false },
      { id: 14, name: '프로젝트방법론', category: 'PM', selected: false },
      { id: 15, name: '프로젝트 관리 도구/기술', category: 'PM', selected: false },
      { id: 16, name: '품질 관리', category: 'PM', selected: false },
      { id: 17, name: '기타', category: '기타', selected: false }
    ]
  };

  componentDidMount() {
    const storedInterests = JSON.parse(localStorage.getItem('selectedInterests'));
    if (storedInterests) {
      const updatedInterests = this.state.interests.map(interest => {
        if (storedInterests.includes(interest.name)) {
          return { ...interest, selected: true };
        }
        return interest;
      });
      this.setState({ interests: updatedInterests });
    }
  }

  handleChange = (id) => {
    const updatedInterests = this.state.interests.map(interest => {
      if (interest.id === id) {
        return { ...interest, selected: !interest.selected };
      }
      return interest;
    });
    this.setState({ interests: updatedInterests });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const selectedInterests = this.state.interests.filter(interest => interest.selected).map(interest => interest.name);
    localStorage.setItem('selectedInterests', JSON.stringify(selectedInterests));
    console.log('선택된 관심사:', selectedInterests);
    this.props.onInterestsSelected();
    window.open('', '', 'width=200,height=100').document.write('<p>수정이 완료되었습니다!</p>');
  };

  render() {
    const categories = ['프론트엔드', '백엔드', 'AI', 'PM', '기타'];

    return (
      <div>
        <h2>관심사 선택 및 수정</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <thead>
              <tr>
                {categories.map(category => (
                  <th key={category}>{category}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {categories.map(category => (
                  <td key={category}>
                    {this.state.interests.filter(interest => interest.category === category).map(interest => (
                      <div key={interest.id}>
                        <input
                          type="checkbox"
                          id={`interest-${interest.id}`}
                          checked={interest.selected}
                          onChange={() => this.handleChange(interest.id)}
                        />
                        <label htmlFor={`interest-${interest.id}`}>{interest.name}</label>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <button type="submit">수정 완료</button>
        </form>
        <button onClick={this.props.onLogout}>로그아웃</button>
      </div>
    );
  }
}

export default Interest;
