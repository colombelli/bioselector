import React, { useState } from 'react';

export const DatasetsContext = React.createContext([]);
export const ExperimentsContext = React.createContext([]);

const Store = ({children}) => {
const [datasets, setDatasets] = useState([]);
const [experiments, setExperiments] = useState([]);

    return (

        <DatasetsContext.Provider value={[datasets, setDatasets]}>
        <ExperimentsContext.Provider value={[experiments, setExperiments]}>
            {children}
        </ExperimentsContext.Provider>
        </DatasetsContext.Provider>

    );
};

export default Store;