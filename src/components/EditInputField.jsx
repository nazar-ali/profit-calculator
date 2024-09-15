import React, { useState } from 'react';
import { TextField, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

const EditInputField = ({ label, value, onSave, onCancel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(false);  // Error state for validation

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setError(false);  // Reset error when the user types
  };

  const handleSave = () => {
    if (inputValue.trim() === '') {
      setError(true);  // Set error if input is empty
    } else {
      setIsEditing(false);
      onSave(inputValue);
    }
  };

  const handleEditButton = () => {
    setIsEditing(true);
    setInputValue(value);  
  };

  const handleCancel = () => {
    setIsEditing(false);
    setInputValue(value);  
    setError(false);  
    onCancel();
  };

  return (
    <Box>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isEditing ? (
          <>
            <TextField
              label={label}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              
              size="small"
              error={error}  // Show red border if there's an error
              helperText={error ? 'This field is required' : ''}  // Error message below the input
            />
            <IconButton onClick={handleSave} size="small">
              <CheckIcon fontSize="small" />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="body1" style={{ marginRight: '8px' }}>
              {value}
            </Typography>
            <IconButton onClick={handleEditButton} size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </>
        )}
      </div>
    </Box>
  );
};

export default EditInputField;
