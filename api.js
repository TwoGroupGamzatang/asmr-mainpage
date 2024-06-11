import axios from 'axios';

const API_BASE_URL = 'http://localhost:5003/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = (username, password) => api.post('/auth/login', { username, password });

export const getMemos = (token, contentId) => api.get(`/article/memo/${contentId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const addMemo = (token, contentId, content) => api.post(`/article/memo/${contentId}`, { content }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const updateMemo = (token, contentId, memoId, content) => api.put(`/article/memo/${contentId}/${memoId}`, { content }, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const deleteMemo = (token, contentId, memoId) => api.delete(`/article/memo/${contentId}/${memoId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
