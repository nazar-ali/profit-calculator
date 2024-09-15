import React from 'react';
import { Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExpenseCard from './ExpenseCard';
import IncomeCard from './IncomeCard';

const ProjectSection = ({ project, onAddItem, onRemoveExpense, onChangeExpense }) => {
  console.log(project.expenses);
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, position: 'relative', marginRight: '10px' }}>
        <Typography variant="h6">Expenses</Typography>
        {project.expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onRemove={onRemoveExpense}
            onChange={onChangeExpense}
          />
        ))}
        <IconButton
          color="primary"
          style={{ position: 'absolute', right: 0 }}
          onClick={() => onAddItem('expenses')}
        >
          <AddCircleOutlineIcon /> Add Expense
        </IconButton>
      </div>

      <div style={{ flex: 1, position: 'relative', marginLeft: '10px' }}>
        <Typography variant="h6">Income</Typography>
        {project.incomes.map((income) => (
          <IncomeCard key={income.id} income={income} title={`Income ${income.id}`} />
        ))}
        <IconButton
          color="primary"
          style={{ position: 'absolute', right: 0 }}
          onClick={() => onAddItem('incomes')}
        >
          <AddCircleOutlineIcon /> Add Income
        </IconButton>
        
      </div>
    </div>
  );
};

export default ProjectSection;
