"use client";
import { useSourceContext } from "@/context/sourceData";
import { useEffect, useState } from "react";
// import axios from "axios";

const Select = () => {
    const { allCompany,setCompanySelect } = useSourceContext();

    const selectChange = (e) => {
        setCompanySelect(e.target.value);
    }

    return (

        <select id="compony" className="select px-5 py-1 rounded-lg font-bold shadow-lg bg-white/50 mx-2" onChange={selectChange}>
            <option disabled selected>選擇廠商</option>
            {allCompany &&
                allCompany.map((value, index) => (
                    <option key={index} value={value}>
                        {value}
                    </option>
                ))}
        </select>
    )
}

export default Select;