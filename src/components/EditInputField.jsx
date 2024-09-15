import React, { useState } from 'react';
import { TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const EditInputField = ({ label, value, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);


  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleSave = () => {
    setIsEditing(false);
    onSave(inputValue);
  };

  const handleEditButton = () => {
    setIsEditing(true);
    setInputValue('')
  }
  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(value);
    onCancel();
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {isEditing ? (
        <TextField
          label={label}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          autoFocus
          size="small"
        />
      ) : (
        <>
          <Typography variant="body1" style={{ marginRight: '8px' }}>{value}</Typography>
          <IconButton
            onClick={handleEditButton}
            size="small"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </>
      )}

      {
        isEditing &&(
        <>
          <IconButton
            onClick={handleSave}
            size="small"
          >
            <CheckIcon fontSize="small" />
          </IconButton>
        </>
        )
      }
    </div>
  );
};

export default EditInputField;
