import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:5004/api/auth';

const authAxiosInstance = axios.create({
  baseURL: AUTH_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const ARTICLE_API_BASE_URL = "http://localhost:5003/api/article";
const articleAxiosInstance = axios.create({
  baseURL: ARTICLE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (email, password) => authAxiosInstance.post('/login', { email, password });

export const signup = (name, email, password, preferences) => authAxiosInstance.post('/signup', { name, email, password, preferences });

export const scrape = (token, url) => articleAxiosInstance.post('/scrape', {url}, { headers: {
  Authorization: `Bearer ${token}`,
}
})

export const getContents = (token) => articleAxiosInstance.get('/content', {headers: {
  Authorization: `Bearer ${token}`,
}})

export const getSpecificContent = (token, contentId) => articleAxiosInstance.get(`/content/${contentId}`, {headers: {
  Authorization: `Bearer ${token}`,
}})

export const getMemos = (token, contentId) => articleAxiosInstance.get(`/memo/${contentId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const addMemo = (token, contentId, content) => articleAxiosInstance.post(`/memo/${contentId}`, { content }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const updateMemo = (token, contentId, memoId, content) => articleAxiosInstance.put(`/memo/${contentId}/${memoId}`, { content }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const deleteMemo = (token, contentId, memoId) => articleAxiosInstance.delete(`/memo/${contentId}/${memoId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
