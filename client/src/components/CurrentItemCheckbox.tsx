import React, { ChangeEvent, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { WorkoutSet } from "../interfaces/WorkoutPlans";
import { GetGlobalizeWrapperInstance } from "../globalization/GlobalizeWrapper";
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
}

const workoutCompleteText = GetGlobalizeWrapperInstance().getMessage("workoutComplete") ?? "Workout Complete";

export default function CurrentItemCheckbox(props:CurrentItemCheckboxProps) {
  //const [text, setText] = useState(props.currentSet === undefined ? {workoutCompleteText} : props.currentSet.name);
  const [state, setState] = useState({checked: false});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      control={
        <GreenCheckboxProps
          checked={state.checked}
          onChange={handleChange}
          name="checkedA"
        />
      }
      label={workoutCompleteText}
    />
  );
}
