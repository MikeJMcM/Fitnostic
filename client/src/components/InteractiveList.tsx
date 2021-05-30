import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { GetGlobalizeWrapperInstance } from './../globalization/GlobalizeWrapper';

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

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value
    })
  );
}

export default function InteractiveList() {
  const classes = useStyles();
  const [secondary, setSecondary] = React.useState(false);

  let globalizeInstance = GetGlobalizeWrapperInstance();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" className={classes.title}>
            {globalizeInstance.getMessage("remainingSets")}
          </Typography>
          <div className={classes.demo} onMouseOver={() => setSecondary(true)} onMouseLeave={() => setSecondary(false)}>
            <List>
              {generate(
                <ListItem>
                  <ListItemText
                    primary="Workout Name eg Burpees"
                    secondary={secondary ? "# of reps" : null}
                  />
                </ListItem>
              )}
            </List>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
