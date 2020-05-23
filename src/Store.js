import React, { useState } from 'react';

const availableSelectors = [
    {label:"ReliefF", fileName: "reliefF", lang: "python", rankingFile: "rf"},
    {label:"Characteristic Direction", fileName: "geoDE", lang: "python", rankingFile: "gd"},
    {label:"Gain Ratio", fileName: "gain-ratio", lang: "r", rankingFile: "gr"},
    {label:"Symmetrical Uncertainty", fileName: "symmetrical-uncertainty", lang: "r", rankingFile: "su"},
    {label:"One Rule", fileName: "oneR", lang: "r", rankingFile: "or"}
]

const bordaRanking = {label: "Borda Count", fileName: "borda"}
const stbW = {label: "Stability Weightened", fileName: "borda"} 

const availableAggregators = {
    oneAgg: [bordaRanking],
    lvl1: [bordaRanking, stbW],
    lvl2: [bordaRanking]
}

export const DatasetsContext = React.createContext([]);
export const ExperimentsContext = React.createContext({view: "root", list: []});
export const SelectorsContext = React.createContext(availableSelectors);
export const AggregatorsContext = React.createContext(availableAggregators);

const Store = ({children}) => {
const [datasets, setDatasets] = useState([]);
const [experiments, setExperiments] = useState({view: "root", list: []});
const [selectors, setSelectors] = useState(availableSelectors);
const [aggregators, setAggregators] = useState(availableAggregators);
    

    return (

        <DatasetsContext.Provider value={[datasets, setDatasets]}>
        <ExperimentsContext.Provider value={[experiments, setExperiments]}>
        <SelectorsContext.Provider value={[selectors, setSelectors]}>
        <AggregatorsContext.Provider value={[aggregators, setAggregators]}>
            {children}
        </AggregatorsContext.Provider>
        </SelectorsContext.Provider>
        </ExperimentsContext.Provider>
        </DatasetsContext.Provider>

    );
};

export default Store;