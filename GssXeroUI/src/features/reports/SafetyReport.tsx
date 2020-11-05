import React from 'react';
import { observer } from "mobx-react-lite";
import { Legend, Line, LineChart, ComposedChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SpeedDial } from "./SpeedDial";
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { exampleData } from "./example-data";
import { speedData } from "./example-data-speed";
import moment, { Moment } from 'moment';
import _ from 'lodash';
import { Paper } from '@material-ui/core';

interface ISpeedReading {
    date: string;
    speed: number;
}

interface IAnalysedData {
    key: string;
    q1: number;
    q2: number;
    q3: number;
    avg: number;
}

interface SafetyReportProps {
}

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

export const SafetyReport = observer((props: SafetyReportProps) => {

    const classes = useStyles();
    
    const sdata = _.orderBy(speedData, (o) => { return moment(o.date).format("YYYYMMDDhhmmss") }, ['asc']);
    const aggregatedByWeek = _.groupBy(speedData, (x) => {
        return moment(x.date).format("YYYYMMDD")
    })

    function quartile(data: number[], q: number): number {
        data = data.sort();
        var pos = ((data.length) - 1) * q;
        var base = Math.floor(pos);
        var rest = pos - base;
        if( (data[base+1]!==undefined) ) {
          return data[base] + rest * (data[base+1] - data[base]);
        } else {
          return data[base];
        }
    }

    function aggregateData(key: string, speeds: number[]): IAnalysedData {
        return {
            key: key,
            q1: quartile(speeds, 0.25),
            q2: quartile(speeds, 0.5),
            q3: quartile(speeds, 0.75),
            avg: _.meanBy(speeds)
        }
    };

    function aggregateByDay(data: ISpeedReading[]): IAnalysedData[] {
        return _(data)
            .groupBy((reading: ISpeedReading) => {
                return moment(reading.date).format("YYYYMMDD")
            })
            .map((group: ISpeedReading[], key: string) => 
                aggregateData(key, group.map(x => x.speed))
            )
            .value();
    }

    const aggregatedByDay = aggregateByDay(speedData);

    const kphFormatter = (value: string) => `${value}kph`;
    
    const dateFormatter = (value: string | number) => {
        return moment(value).format("Do MMM");
    }

    const dateFormatterLong = (value: string | number) => {
        return moment(value).format("dddd, MMMM Do YYYY, h:mm:ss a");
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={8}>
                <Paper elevation={3} className={classes.paperContainer}>
                        <h3 className={classes.title}>Detailed Last 6 Months</h3>
                        <ResponsiveContainer width="95%" height={550}>
                        <LineChart
                            data={aggregatedByDay}
                            margin={{
                                top: 10, right: 80, left: 50, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="key" height={80} angle={-50} textAnchor="end" />
                            <YAxis type="number" orientation="left" yAxisId={0} tickFormatter={kphFormatter} label={{ value: 'Speed', angle: -90, offset: -20, position: 'insideLeft' }} />
                            <Tooltip labelFormatter={name => dateFormatterLong(name)} />
                            <Legend />
                            <Line name="Lower Quartile" type="monotone" dataKey="q1" stroke="green" yAxisId={0}  />
                            <Line name="Median" type="monotone" dataKey="q2" stroke="blue" yAxisId={0}  />
                            <Line name="Upper Quartile" type="monotone" dataKey="q3" stroke="red" yAxisId={0}  />
                        </LineChart>
                        </ResponsiveContainer>
                        </Paper>

                    <Paper elevation={3} className={classes.paperContainer}>
                        <h3 className={classes.title}>Detailed Last 6 Months</h3>
                        <ResponsiveContainer width="95%" height={550}>
                        <LineChart
                            data={sdata}
                            margin={{
                                top: 10, right: 80, left: 50, bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" height={80} tickFormatter={dateFormatter} angle={-50} textAnchor="end" />
                            <YAxis type="number" orientation="left" dataKey="speed" tickFormatter={kphFormatter} label={{ value: 'Speed', angle: -90, offset: -20, position: 'insideLeft' }} />
                            <Tooltip labelFormatter={name => dateFormatterLong(name)} />
                            <Legend />
                            <Line name="Speed" type="monotone" dataKey="speed" stroke="#ff7300"  />
                        </LineChart>
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
})