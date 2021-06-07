import { createContext, Dispatch, useReducer, useState, useContext, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import AutoGrid from "./PlanGrid";
import { PlanContextProvider } from '../context/PlanContext';

export default function PlanView() {
return (
  <PlanContextProvider>
    <AutoGrid/>
  </PlanContextProvider>
)
}