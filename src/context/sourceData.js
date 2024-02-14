"use client"
import { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";

const sourceContext = createContext();

export const useSourceContext = () => {
    return useContext(sourceContext);
}

export const SourceProvider = ({children}) => {
    const [src,setSrc] = useState();
    const [allCompany,setAllCompany] = useState();
    const [companySelect,setCompanySelect] = useState();

    useEffect(()=>{
        fetch("/api/getCompany")
            .then(res => res.json())
            .then(
                data => {
                    console.log(data.company);
                    setSrc(data.company);
                    setAllCompany(
                        data.company.map((v, i) => {
                            return v.companyName;
                        })
                    );
                }
            )
    },[]);

    const values = {
        src,setSrc,allCompany,setAllCompany,companySelect,setCompanySelect
    };
    return <sourceContext.Provider value={values}>{children}</sourceContext.Provider>
}
