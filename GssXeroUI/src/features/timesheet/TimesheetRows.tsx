import React, { useContext } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, MenuItem } from "@material-ui/core";
import moment from "moment";
import {
  DayAndClient,
  ObservableTimesheetRow,
  TimesheetStore,
  TimesheetStoreContext,
} from "./TimesheetStore";
import { GlobalStoreContext } from "features/shared/stores/GlobalStore";
import TimesheetRowStore, { TimesheetRowStoreContext } from "./TimesheetRowStore";
import { InputProps } from "shared-components/input-props";
import { ClientResponse } from "client/backendclient";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      margin: `${theme.spacing(0)} auto`,
      justifyContent: "center",
    },
    submitBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "#43A047",
      color: "#fff",

      "&:hover": {
        background: "#39C16C",
      },
    },
    backBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: "#fff",
      // color: '#fff'
    },
    header: {
      textAlign: "center",
      background: "#0D4C9D",
      color: "#fff",
    },
    timesheetRow: {
      display: "flex",
      justifyContent: "space-between",
    },
    card: {
      marginTop: theme.spacing(10),
      flexGrow: 0.5,
      maxHeight: "600px",
      border: "1px solid #808080",

      "&:hover": {
        cursor: "pointer",
      },
    },
    // bg: {
    //   background: "linear-gradient(to top, #68717a, #b5b1b1)",
    //   backgroundPosition: "center",
    //   backgroundRepeat: "no-repeat",
    //   backgroundSize: "cover",
    //   height: "100vh",
    // },
    actions: {
      marginBottom: theme.spacing(2),
    },
    select: {
      zIndex: 999999999999999,
    },
  })
);

interface TimesheetRowsProps {
  day: string;
  index: number;
  clients: ClientResponse[];
  rows: ObservableTimesheetRow[];
}

const TimesheetRows = (props: TimesheetRowsProps) => {
  const classes = useStyles({});
  const { day, index, clients, rows } = props;

  //const globalStore = useContext(GlobalStoreContext);
  const timesheetStore = useContext(TimesheetStoreContext);
  //const store = new TimesheetRowStore(/*source.globalStore, */ timesheetStore);
  const store = useContext(TimesheetRowStoreContext)

  // const clients = [
  //   {
  //     value: "ESI",
  //   },
  //   {
  //     value: "Snap Fitness",
  //   },
  //   {
  //     value: "Another Client",
  //   },
  //   {
  //     value: "Bluesky Meats",
  //   },
  // ];

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      alert("Enter pressed");
    }
  };

  return (
    <>
      <div className={classes.timesheetRow}>
        <TextField
          required
          id="date"
          label="Date"
          value={moment(new Date(props.day)).format("LL")}
          disabled
          margin="normal"
        />
        <TextField
          id="standard-select-currency"
          select
          margin="normal"
          label="Client"
          value={props.rows.length === 0 ? "" : props.rows[index].clientName}
          onChange={(e) =>
            store.timesheetStore.handleClientChange(e, index, rows)
          }
        >
          {clients.map((option) => (
            //console.log(option),
            // <MenuItem key={option.clientId} value={option.name!}>
            //   {option.name!}
            // </MenuItem>
            <MenuItem key={option.clientId} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <InputProps
          stateObject={rows[index]}
          errorHandler={store.timesheetStore.errorHandler}
          propertyName="duration"
        >
          <TextField
            required
            id="duration"
            label="Duration"
            margin="normal"
            type="number"
            //onKeyPress={(e) => handleKeyPress(e)}
          />
        </InputProps>
        <InputProps
          stateObject={rows[index]}
          errorHandler={store.timesheetStore.errorHandler}
          propertyName="notes"
        >
        <TextField
          required
          multiline
          id="comments"
          label="Comments/Notes"
          placeholder="Comments/Notes"
          margin="normal"
          onKeyPress={(e) => handleKeyPress(e)}
        />
        </InputProps>
      </div>
    </>
  );
};

export default observer(TimesheetRows);
