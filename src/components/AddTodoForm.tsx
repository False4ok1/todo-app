import React, { useState } from 'react';

type AddTodoFormProps = {
  onAdd: (text: string) => void;
};

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="Що потрібно зробити?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '8px', flex: 1, borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Додати
      </button>
    </form>
  );
};