import AutoGrid from "./PlanGrid";
import { PlanContextProvider } from '../context/PlanContext';

export default function PlanView() {
return (
  <PlanContextProvider>
    <AutoGrid/>
  </PlanContextProvider>
)
}