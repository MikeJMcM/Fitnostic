import React, { cloneElement, ReactElement, useState } from "react";
import { Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { GetGlobalizeWrapperInstance } from './../globalization/GlobalizeWrapper';
import { WorkoutSet } from "../interfaces/WorkoutPlans";

type InteractiveListProps = {
  sets: WorkoutSet[]
}

export default function InteractiveList(props: InteractiveListProps) {
  let globalizeInstance = GetGlobalizeWrapperInstance();
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            {globalizeInstance.getMessage("remainingSets")}
          </Typography>
          <div>
            <List>
              {props.sets.filter(set => !set.done).map((set, index) => {
               return <ListItem key={index}>
                  <ListItemText primary={set.name} secondary={set.reps} />
                </ListItem>
              })}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
