import React, { useState } from 'react';
import { Button, Typography, Box, Tabs, Tab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditInputField from '../src/components/EditInputField.jsx';
import ProjectSection from './components/ProjectSection';
import { useGlobalContext } from './context/index.jsx';
import Total from "../src/components/Total.jsx"

const App = () => {
  const { 
    projects,
    setProjects,
    activeTab,
    setActiveTab
  } = useGlobalContext();

  const [totalCost,setTotalCost] = useState()
  const [ totalIncome, setTotalIncome] = useState()
  const [ totalProfit, setTotalProfit] = useState()

  const handleAddProject = () => {
    const newTab = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      expenses: [],
      incomes: [],
    };
    setProjects([...projects, newTab]);
    setActiveTab(projects.length);
  };

  const handleAddItem = (projectId, type) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          [type]: [...project[type], { id: project[type].length + 1, name: '', amount: 0 }]
        };
      }
      return project;
    }));
  };

  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleDeleteTab = (id) => {
    if (projects.length > 0) {
      const newProjects = projects.filter(project => project.id !== id);
      setProjects(newProjects);
      setActiveTab(prev => (prev >= newProjects.length ? newProjects.length - 1 : prev));
    } else {
      setProjects([]);
      setActiveTab(0);
    }
  };

  const handleSaveProjectName = (projectId, newName) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return { ...project, name: newName };
      }
      return project;
    }));
  };

  const handleChangeExpense = (projectId, expenseId, field, value) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          expenses: project.expenses.map(expense =>
            expense.id === expenseId ? { ...expense, [field]: value } : expense
          )
        };
      }
      return project;
    }));
  };

  const handleChangeIncome = (projectId, incomeId, field, value) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          incomes: project.incomes.map(income =>
            income.id === incomeId ? { ...income, [field]: value } : income
          )
        };
      }
      return project;
    }));
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
        <div style={{ width: '20%' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProject}
            style={{ width: '100%' }}
          >
            Add New Project
          </Button>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        <Tabs value={activeTab} onChange={handleChangeTab} aria-label="project tabs">
          {projects.map((project, index) => (
            <Tab
              key={project.id}
              label={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <EditInputField
                    value={project.name}
                    onSave={(newName) => handleSaveProjectName(project.id, newName)}
                    onCancel={() => {}}
                  />
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTab(project.id);
                    }}
                    size="small"
                    style={{ marginLeft: '8px' }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              }
              value={index}
            />
          ))}
        </Tabs>

        <Box p={3}>
          {projects[activeTab] && (
            <div>
              <Typography variant="h6">{projects[activeTab].name}</Typography>
              <ProjectSection
                project={projects[activeTab]}
                onAddItem={(type) => handleAddItem(projects[activeTab].id, type)}
                onChangeExpense={(expenseId, field, value) => handleChangeExpense(projects[activeTab].id, expenseId, field, value)}
                handleChangeIncome={(incomeId, field, value) => handleChangeIncome(projects[activeTab].id, incomeId, field, value)}
              />
            </div>
          )}
        {/* <div>

        <Total/>
        </div> */}
        </Box>
      </div>
    </>
  );
};

export default App;