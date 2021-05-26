import Grid from '@material-ui/core/Grid';
import React from 'react';
import Stopwatch from './Stopwatch';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CurrentItemCheckbox from './CurrentItemCheckbox';
import InteractiveList from './InteractiveList';
import {GetGlobalizeWrapperInstance} from '../globalization/GlobalizeWrapper';

const TITLE = GetGlobalizeWrapperInstance().getMessage("appTitle");

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

export default function AutoGrid() {
const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                  <CurrentItemCheckbox/>
                </Grid>
                <Grid item xs>
                  <Stopwatch />
                </Grid>
                <Grid item xs>
                <InteractiveList/>
                </Grid>
            </Grid>
        </div>
    )
}