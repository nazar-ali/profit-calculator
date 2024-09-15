import React, { useState, useContext, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

      const [projects, setProjects] = useState([]);
      const [activeTab, setActiveTab] = useState(0);
      const [editProjectId, setEditProjectId] = useState(null);
      const [newProjectName, setNewProjectName] = useState('');
      const [editingSection, setEditingSection] = useState(null);
      const [newSectionName, setNewSectionName] = useState('');
      const [isEditing, setIsEditing] = useState(false);
      

    return (
        <AppContext.Provider value={{ 
            projects,
            setProjects,
            activeTab,
            setActiveTab,
            editProjectId,
            setEditProjectId,
            newProjectName,
            setNewProjectName,
            editingSection, 
            setEditingSection,
            newSectionName,
            setNewSectionName,
            isEditing, 
            setIsEditing

         }}>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };