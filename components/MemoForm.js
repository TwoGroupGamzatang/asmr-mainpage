import React, { useState } from 'react';

const MemoForm = ({ onAddMemo }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMemo(content);
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter memo content" />
      <button type="submit">Add Memo</button>
    </form>
  );
};

export default MemoForm;
