import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, IconButton } from '@mui/material';
import EditInputField from './EditInputField';
import CloseIcon from '@mui/icons-material/Close';

const ExpenseCard = ({ expense, onChange }) => {
  const [fields, setFields] = useState([{ id: expense.id, name: '', amount: 0 }]);
  const [isEditing, setIsEditing] = useState({});
  const [originalTitle, setOriginalTitle] = useState("Expense 1");
  const [errors, setErrors] = useState({});

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    const updatedFields = fields.map(field =>
      field.id === id ? { ...field, [name]: value } : field
    );
    setFields(updatedFields);

    // Validation
    validateField(id, name, value);

    onChange(expense.id, name, value);
  };

  const validateField = (id, field, value) => {
    let errorMsg = '';
    if (field === 'name') {
      if (!value || !isNaN(value)) {
        errorMsg = 'This field is required';
      }
    } else if (field === 'amount') {
      if (isNaN(value) || value < 0) {
        errorMsg = 'Amount must be a positive number.';
      }
    }
    setErrors(prevErrors => ({ ...prevErrors, [`${id}-${field}`]: errorMsg }));
  };

  const handleAddField = () => {
    setFields([...fields, { id: fields.length + 1, name: '', amount: 0 }]);
  };

  const handleRemoveField = (id) => {
    if (fields.length > 1) {
      setFields(fields.filter(field => field.id !== id));
    }
  };

  const toggleEditField = (id) => {
    setIsEditing(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveTitle = (newTitle) => {
    console.log('New Title:', newTitle);
    setOriginalTitle(newTitle);
  };

  const handleCancelTitle = () => {
    console.log('Edit canceled');
    setOriginalTitle(expense.name);
  };

  return (
    <Card style={{ backgroundColor: '#f0f4c3', marginBottom: '10px' }}>
      <CardContent>
        <div style={{ display: "flex" }}>
          <EditInputField
            value={originalTitle}
            label="Expense Title"
            onSave={handleSaveTitle}
            onCancel={handleCancelTitle}
          />
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleCancelTitle(expense.id);
            }}
            size="small"
            style={{ marginLeft: '8px' }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
        {fields.map((field) => (
          <div key={field.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            {
              field.id !== expense.id ? (
                <>
                  {isEditing[field.id] ? (
                    <>
                      <TextField
                        label={`Name ${field.id}`}
                        variant="outlined"
                        name="name"
                        value={field.name}
                        onChange={(e) => handleChange(field.id, e)}
                        error={Boolean(errors[`${field.id}-name`])}
                        helperText={errors[`${field.id}-name`]}
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
                        error={Boolean(errors[`${field.id}-amount`])}
                        helperText={errors[`${field.id}-amount`]}
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
                      <Typography style={{ flex: 2, marginRight: '8px' }}>{`Expense ${field.id}`}</Typography>
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
                    disabled
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

export default ExpenseCard;
