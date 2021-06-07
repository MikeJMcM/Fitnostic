import React, { cloneElement, ReactElement, useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { GetGlobalizeWrapperInstance } from './../globalization/GlobalizeWrapper';
import { WorkoutSet } from "../interfaces/WorkoutPlans";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752
    },
    demo: {
      backgroundColor: theme.palette.background.paper
    },
    title: {
      margin: theme.spacing(4, 0, 2)
    }
  })
);

type InteractiveListProps = {
  sets: WorkoutSet[]
}

export default function InteractiveList(props: InteractiveListProps) {
  const classes = useStyles();
  let globalizeInstance = GetGlobalizeWrapperInstance();
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            {globalizeInstance.getMessage("remainingSets")}
          </Typography>
          <div className={classes.demo}>
            <List>
              {props.sets.map((set, index) => {
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
