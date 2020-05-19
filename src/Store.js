import React, { useState } from 'react';

export const DatasetsContext = React.createContext([]);
export const ExperimentsContext = React.createContext({view: "root", list: []});

const Store = ({children}) => {
const [datasets, setDatasets] = useState([]);
const [experiments, setExperiments] = useState({view: "root", list: []});

    return (

        <DatasetsContext.Provider value={[datasets, setDatasets]}>
        <ExperimentsContext.Provider value={[experiments, setExperiments]}>
            {children}
        </ExperimentsContext.Provider>
        </DatasetsContext.Provider>

    );
};

export default Store;