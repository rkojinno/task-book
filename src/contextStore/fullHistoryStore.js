import React, { createContext, useState, useContext} from 'react';

const FullHistoryContext = createContext();

export default function ContextStoreHistory ({children}){
    const [fullHistory,setFullHistory] = useState(false)

    return (
    <FullHistoryContext.Provider
    value={{fullHistory, setFullHistory}}
    >{children}
    </FullHistoryContext.Provider>
    )
}

export function useFullHistoryContext (){
    const context = useContext(FullHistoryContext)
    if (!context) throw new Error("Provider Required");
    const {fullHistory,setFullHistory} = context;
    return {fullHistory,setFullHistory}
}






