import { ChangeEvent, useContext, useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { DispatchType, WorkoutSet } from "../interfaces/WorkoutPlans";
import { GetGlobalizeWrapperInstance } from "../globalization/GlobalizeWrapper";
import { PlanContext } from "../context/PlanContext";


type CurrentSetCheckboxProps = {
  currentSet: WorkoutSet | undefined
}

const workoutCompleteText = GetGlobalizeWrapperInstance().getMessage("workoutComplete") ?? "Workout Complete";

export default function CurrentSetCheckbox(props:CurrentSetCheckboxProps) {
  const [isChecked, setisChecked] = useState<boolean>(false);
  const { state , dispatch } = useContext(PlanContext);

  const nextWorkoutSet = async () => {
    let ignore = false;
    try{
      dispatch({ type: DispatchType.NEXT_SET }); 
    } catch (e) {
      dispatch({ type: DispatchType.FAILURE, error: e })
    }
    return () => { ignore = true; }
  };

  // const prevWorkoutSet = async () => {
//   let ignore = false;
//   try{
//     dispatch({ type: DispatchType.PREV_SET }); 
//     setCorrectCurrentSetIndex();
//   } catch (e) {
//     dispatch({ type: DispatchType.FAILURE, error: e })
//   }
//   return () => { ignore = true; }
// };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setisChecked(event.target.checked);
    if(event.target.checked) {
      nextWorkoutSet();
    }
  };

  return (
    <FormControlLabel control={<Checkbox
      checked={isChecked}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />} label={props.currentSet === undefined ? workoutCompleteText : props.currentSet.name} />

  );
}
