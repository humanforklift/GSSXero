import React, { useContext } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { Legend, Line, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SpeedDial } from "./SpeedDial";
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import moment from 'moment';
import { Slider, Paper } from '@material-ui/core';
import _ from 'lodash';
import { FilteredDataStore } from './FilteredDataStore';
import { GlobalStoreContext } from "features/shared/stores/GlobalStore";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
        textAlign: "center",
    },
    timeSeriesChart: {
        marginBottom: 50
    },
    paperContainer: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(3),
        marginLeft: theme.spacing(5), // TODO: Remove margins once fixed widths have been removed and use the Material spacing property correctly
      },
  })
);

const UsageReport = () => {
    // usually would be current date but our data finishes on this date....
    const store = useLocalStore(() => new FilteredDataStore());

    const classes = useStyles();
    
    return (
        <div>
            <Grid container>
                <Grid item xs={8}>
                <Paper elevation={3} className={classes.paperContainer}>
                        <h3 className={classes.title}>Detailed Last 6 Months</h3>
                        <Slider
                            value={store.dateRange}
                            onChange={store.handleChange}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            getAriaValueText={store.unixToDate}
                            valueLabelFormat={store.unixToDate}
                            max={store.max}
                            min={store.min}
                            step={86400}
                            />
                                            <ResponsiveContainer width="95%" height={550}>

                        <ComposedChart
                            width={1200}
                            height={550}
                            data={store.filteredData}
                            margin={{
                                top: 10, right: 80, left: 50, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" height={120} tickFormatter={store.dateFormatter} angle={-50} textAnchor="end" />
                            <YAxis type="number" orientation="left" yAxisId={0} label={{ value: 'Population', angle: -90, offset: -20, position: 'insideLeft' }} />
                            <Tooltip labelFormatter={store.dateFormatter} />
                            <Legend />
                            <Area name="# Bikes" type="monotone" dataKey="bikes" stackId="1" stroke="#8884d8" fill="#8884d8" yAxisId={0} />
                            <Area name="# People" type="monotone" dataKey="people" stackId="1" stroke="#82ca9d" fill="#82ca9d" yAxisId={0} />
                            
                        </ComposedChart>
                        </ResponsiveContainer>
                        </Paper>

                        <Paper elevation={3} className={classes.paperContainer}>
                        <h3 className={classes.title}>Aggregated Last 12 Months</h3>
                        <ResponsiveContainer width="95%" height={550}>
                        <ComposedChart
                            width={1200}
                            height={550}
                            data={store.countdata}
                            margin={{
                                top: 10, right: 80, left: 50, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis type="number" orientation="left" yAxisId={0} label={{ value: 'Population', angle: -90, offset: -20, position: 'insideLeft' }} />
                            <YAxis 
                                type="number" 
                                orientation="right" 
                                yAxisId={1} 
                                label={{ value: 'Avg Speed (kph)', angle: -90, offset: -10, position: 'insideRight' }} 
                                tickFormatter={store.kphFormatter}  
                            />
                            <Tooltip />
                            <Legend />
                            <Area name="# Bikes" type="monotone" dataKey="bikes" stackId="1" stroke="#8884d8" fill="#8884d8" yAxisId={0} />
                            <Area name="# People" type="monotone" dataKey="people" stackId="1" stroke="#82ca9d" fill="#82ca9d" yAxisId={0} />
                            <Line name="Avg Speed" type="monotone" dataKey="avspd" stroke="#ff7300" yAxisId={1} />
                        </ComposedChart>
                        </ResponsiveContainer>
                        </Paper>

                </Grid>
                <Grid item xs={4}>
                    <SpeedDial title="Average Velocity Last Hour" avgSpeed={23}></SpeedDial>
                    <SpeedDial title="Average Velocity Last Day" avgSpeed={26}></SpeedDial>
                    <SpeedDial title="Average Velocity Last Week" avgSpeed={29}></SpeedDial>
                    <SpeedDial title="Average Velocity Last Month" avgSpeed={22}></SpeedDial>
                </Grid>
            </Grid>


        </div>
    )
};

export default observer(UsageReport);