import React, { useState } from 'react';

export const DatasetsContext = React.createContext([]);

const Store = ({children}) => {
const [datasets, setDatasets] = useState([]);

    return (

        <DatasetsContext.Provider value={[datasets, setDatasets]}>
            {children}
        </DatasetsContext.Provider>

    );
};

export default Store;