import React, { useEffect, useState } from 'react';
import { getMemos, addMemo, updateMemo, deleteMemo } from '../api';
import MemoForm from './MemoForm';
import MemoItem from './MemoItem';

const MemoList = ({ contentId, token }) => {
  const [memos, setMemos] = useState([]);

  useEffect(() => {
    fetchMemos();
  }, []);

  const fetchMemos = async () => {
    const response = await getMemos(token, contentId);
    setMemos(response.data.memos);
  };

  const handleAddMemo = async (content) => {
    await addMemo(token, contentId, content);
    fetchMemos();
  };

  const handleUpdateMemo = async (memoId, content) => {
    await updateMemo(token, contentId, memoId, content);
    fetchMemos();
  };

  const handleDeleteMemo = async (memoId) => {
    await deleteMemo(token, contentId, memoId);
    fetchMemos();
  };

  return (
    <div>
      <MemoForm onAddMemo={handleAddMemo} />
      {memos.map((memo) => (
        <MemoItem key={memo._id} memo={memo} onUpdateMemo={handleUpdateMemo} onDeleteMemo={handleDeleteMemo} />
      ))}
    </div>
  );
};

export default MemoList;
