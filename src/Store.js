import React, { useState } from 'react';

const availableSelectors = [
    {label:"ReliefF", fileName: "reliefF", lang: "python", rankingFile: "rf"},
    {label:"Characteristic Direction", fileName: "geoDE", lang: "python", rankingFile: "gd"},
    {label:"Gain Ratio", fileName: "gain-ratio", lang: "r", rankingFile: "gr"},
    {label:"Symmetrical Uncertainty", fileName: "symmetrical-uncertainty", lang: "r", rankingFile: "su"},
    {label:"One Rule", fileName: "oneR", lang: "r", rankingFile: "or"}
]

export const DatasetsContext = React.createContext([]);
export const ExperimentsContext = React.createContext({view: "root", list: []});
export const SelectorsContext = React.createContext(availableSelectors)

const Store = ({children}) => {
const [datasets, setDatasets] = useState([]);
const [experiments, setExperiments] = useState({view: "root", list: []});
const [selectors, setSelectors] = useState(availableSelectors);
    

    return (

        <DatasetsContext.Provider value={[datasets, setDatasets]}>
        <ExperimentsContext.Provider value={[experiments, setExperiments]}>
        <SelectorsContext.Provider value={[selectors, setSelectors]}>
            {children}
        </SelectorsContext.Provider>
        </ExperimentsContext.Provider>
        </DatasetsContext.Provider>

    );
};

export default Store;