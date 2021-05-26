import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

const GreenCheckboxProps = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

export default function CurrentItemCheckbox() {
  const [state, setState] = React.useState({
    checkedA: true
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormControlLabel
      control={
        <GreenCheckboxProps
          checked={state.checkedA}
          onChange={handleChange}
          name="checkedA"
        />
      }
      label="Current Task(hardcoded text)"
    />
  );
}
