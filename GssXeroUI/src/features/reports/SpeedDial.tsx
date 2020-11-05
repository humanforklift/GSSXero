import React from 'react';
import { observer } from "mobx-react-lite";
import { Sector, Cell, PieChart, Pie } from 'recharts';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Paper } from '@material-ui/core';

interface SpeedDialProps {
    title: string,
    avgSpeed: number
}

interface IArrowProps {
    midAngle: number,
    outerRadius: number,
    cx: number,
    cy: number,
}

interface IActiveSectorMarkProps {
    cx: number,
    cy: number, 
    innerRadius: number, 
    outerRadius: number, 
    startAngle: number, 
    endAngle: number, 
    fill: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // TODO: Kyle to investigate making this responsive if approved by Shane
    paperContainer: {
        width: 500,
        // TODO: Once hardcoded widths have been removed change Grid to use the Materical Spacing property correctly
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        marginLeft: theme.spacing(3),
        padding: theme.spacing(1),
    },
    title: {
        textAlign: "center",
    },
    label: {
        textAlign: "center",
    },
    rechartsWrapper: {
        marginTop: -120
    }
  })
);

export const SpeedDial = observer((props: SpeedDialProps) => {
    const classes = useStyles();
    const width = 500;
    const colorData = [{
            value: 18, // Meaning span is 0 to 18
            color: '#5cb85c'
        }, {
            value: 10, // span 18 to 28
            color: '#f0ad4e'
        }, {
            value: 6, // span 28 to 34
            color: '#d9534f'
        }
    ];

    const activeSectorIndex = colorData.map((cur, index, arr) => {
        const curMax = [...arr]
            .splice(0, index + 1)
            .reduce((a, b) => ({ value: a.value + b.value, color: b.color }))
            .value;
        return (props.avgSpeed > (curMax - cur.value)) && (props.avgSpeed <= curMax);
    })
    .findIndex(cur => cur);

    const sumValues = colorData
        .map(cur => cur.value)
        .reduce((a, b) => a + b);

    const arrowData = [
        { value: props.avgSpeed },
        { value: 0 },
        { value: sumValues - props.avgSpeed }
    ];

    const pieProps = {
        startAngle: 180,
        endAngle: 0,
        cx: width / 2,
        cy: width / 2
    };

    const pieRadius = {
        innerRadius: (width / 2) * 0.35,
        outerRadius: (width / 2) * 0.4
    };

    const Arrow = ({ cx, cy, midAngle, outerRadius }: IArrowProps) => { //eslint-disable-line react/no-multi-comp
        const RADIAN = Math.PI / 180;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const mx = cx + (outerRadius + width * 0.03) * cos;
        const my = cy + (outerRadius + width * 0.03) * sin;
        return (
            <g>
                <circle cx={cx} cy={cy} r={width * 0.05} fill="#666" stroke="none"/>
                <path d={`M${cx},${cy}L${mx},${my}`} strokeWidth="6" stroke="#666" fill="none" strokeLinecap="round"/>
            </g>
        );
    };

    const ActiveSectorMark = ({ cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill }: IActiveSectorMarkProps) => { //eslint-disable-line react/no-multi-comp
        return (
            <g>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius * 1.2}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
            </g>
        );
    };

    return (
<Paper elevation={3} className={classes.paperContainer}>            
<h3 className={classes.title}>{props.title}</h3>
            <div className={classes.rechartsWrapper}>
            <PieChart width={width} height={(width / 2) + 30}>
                <Pie
                    activeIndex={activeSectorIndex}
                    activeShape={ActiveSectorMark}
                    data={colorData}
                    fill="#8884d8"
                    dataKey="value"
                    { ...pieRadius }
                    { ...pieProps }
                >
                    {
                        colorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorData[index].color} />
                        ))
                    }
                </Pie>
                <Pie
                    stroke="none"
                    dataKey="value"
                    activeIndex={1}
                    activeShape={ Arrow }
                    data={ arrowData }
                    outerRadius={ pieRadius.innerRadius }
                    fill="none"
                    { ...pieProps }
                />
            </PieChart>
            </div>
            <h3 className={classes.label}>{props.avgSpeed} km/h</h3>
        </Paper>
    );
});
