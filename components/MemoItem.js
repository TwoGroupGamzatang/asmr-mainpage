import React, { useState } from 'react';

const MemoItem = ({ memo, onUpdateMemo, onDeleteMemo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(memo.content);

  const handleUpdate = () => {
    onUpdateMemo(memo._id, content);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          <p>{memo.content}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onDeleteMemo(memo._id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default MemoItem;
