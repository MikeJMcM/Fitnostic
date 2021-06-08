import React, { ChangeEvent, useContext, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { DispatchType, WorkoutSet } from "../interfaces/WorkoutPlans";
import { GetGlobalizeWrapperInstance } from "../globalization/GlobalizeWrapper";
import { PlanContext } from "../context/PlanContext";
const GreenCheckboxProps = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

type CurrentItemCheckboxProps = {
  currentSet: WorkoutSet | undefined
  //currentSetIndex: number | undefined
}

const workoutCompleteText = GetGlobalizeWrapperInstance().getMessage("workoutComplete") ?? "Workout Complete";

export default function CurrentItemCheckbox(props:CurrentItemCheckboxProps) {
  const [isChecked, setisChecked] = useState<boolean>(false);
  const { state , dispatch } = useContext(PlanContext);
  const [currentSetIndex, setcurrentSetIndex] = useState<number>(0);

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
    //TODO need to send dispatch to update done status in parent of this set
  };

  return (
    <FormControlLabel
      control={
        <GreenCheckboxProps
          checked={isChecked}
          onChange={handleChange}
          name="checkedA"
        />
      }
      label={props.currentSet === undefined ? workoutCompleteText : props.currentSet.name}
    />
  );
}
