import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import EditInputField from './EditInputField';
import CloseIcon from '@mui/icons-material/Close';

const IncomeCard = ({ income, onChange }) => {
  const [fields, setFields] = useState([{ id: income.id, name: '', amount: 0 }]);
  const [isEditing, setIsEditing] = useState({});
  const [originalTitle, setOriginalTitle] = useState("Income 1"); // Store original title

  const handleChange = (id, e) => {
    const updatedFields = fields.map(field =>
      field.id === id ? { ...field, [e.target.name]: e.target.value } : field
    );
    setFields(updatedFields);
    onChange(income.id, e.target.name, e.target.value);
  };

  const handleAddField = () => {
    setFields([...fields, { id: fields.length + 1, name: '', amount: 0 }]);
  };

  const handleRemoveField = (id) => {
    if (fields.length > 0) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  const toggleEditField = (id) => {
    setIsEditing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveTitle = (newTitle) => {
    // Save the new title
    console.log('New Title:', newTitle);
    setOriginalTitle(newTitle);
  };

  const handleCancelTitle = () => {
    console.log('Edit canceled');
    setOriginalTitle(income.name);
  };

  return (
    <Card style={{ backgroundColor: '#c0f4c3', marginBottom: '10px' }}>
      <CardContent>
        <div style={{display:"flex"}}>

        <EditInputField
          value={originalTitle} // Use originalTitle to display the current title
          label="Income Title"
          onSave={handleSaveTitle}
          onCancel={handleCancelTitle}
          />
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleCancelTitle(income.id);
          }}
          size="small"
          style={{ marginLeft: '8px',}}
          >
          <CloseIcon fontSize="small" />
        </IconButton>
          </div>
        {fields.map((field) => (
          <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            {
              field.id !== income.id ? (
                <>
                  {isEditing[field.id] ? (
                    <>
                      <TextField
                        label={`Name ${field.id}`}
                        variant="outlined"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleChange(field.id, e)}
                        style={{ flex: 2, marginRight: '8px' }}
                      />
                      <TextField
                        required
                        label={`Amount ${field.id}`}
                        variant="outlined"
                        name="amount"
                        type="number"
                        value={field.amount}
                        onChange={(e) => handleChange(field.id, e)}
                        style={{ flex: 2, marginRight: '8px' }}
                      />
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() => toggleEditField(field.id)}
                        style={{ margin: '0 4px' }}
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    // Display Mode
                    <>
                      <Typography style={{ flex: 2, marginRight: '8px' }}>{field.name || `Expense ${field.id}`}</Typography>
                      <Typography style={{ flex: 2, marginRight: '8px' }}>{field.amount || `Amount`}</Typography>
                      <Button
                        variant="contained"
                        color="default"
                        onClick={() => toggleEditField(field.id)}
                        style={{ margin: '0 4px' }}
                      >
                        Edit
                      </Button>

                    </>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemoveField(field.id)}
                    style={{ marginRight: '4px' }}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddField}
                  >
                    +
                  </Button>
                </>
              ) : fields.length === 1 && (
                <div style={{ margin: 10 }}>
                  <Button
                    variant="contained"
                    color="error"
                    style={{ marginRight: '4px' }}
                  >
                    -
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddField}
                  >
                    +
                  </Button>
                </div>
              )
            }
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default IncomeCard;
