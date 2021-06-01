import Grid from '@material-ui/core/Grid';
import { useState } from 'react';
import Stopwatch from './Stopwatch';
import { makeStyles } from '@material-ui/core/styles';
import CurrentItemCheckbox from './CurrentItemCheckbox';
import InteractiveList from './InteractiveList';
import {GetGlobalizeWrapperInstance} from '../globalization/GlobalizeWrapper';
import { useFetch } from '../hooks/useFetch';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }
  }));

export default function AutoGrid() {

//const [query, setQuery] = useState('');
//setQuery("plans/");
//const url = query && `https:localhost:3001/api/plans/${query}`;//todo pass data down to components, how to do this best practice? maybe do this in individual components
const { status, data } = useFetch("/api/plans/");
const text = data[0] ?? "";
console.log(data);

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
                <Grid item xs>
                  {text.name}
                </Grid>
            </Grid>
        </div>
    )
}