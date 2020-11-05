import React, { useCallback, useContext } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  Typography, 
  MenuItem
} from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import TimesheetRows from "../TimesheetRows";
import { GlobalStoreContext } from "features/shared/stores/GlobalStore";
import { TimesheetStore } from "../TimesheetStore";
import useInitialMount from "shared-components/hooks/useInitialMount";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      margin: `${theme.spacing(0)} auto`,
      justifyContent: 'center'
    },
    submitBtn: {
      marginTop: theme.spacing(2),
      background: "#43A047",
      color: "#fff",
      float: 'right',

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
        display: 'flex',
        justifyContent: 'space-between'
    },
    card: {
      marginTop: theme.spacing(10),
      flexGrow: .5,
      maxHeight: "700px",
      border: "1px solid #808080",
      overflowY: 'scroll',

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
    noScroll: {
      position: 'sticky',
      top: '0px',
      backgroundColor: 'white',
      zIndex: 999999999,
    },
  })
);

const EditTimesheet = () => {
  const classes = useStyles({});
  const history = useHistory();

  const globalStore = useContext(GlobalStoreContext);
  const store = useLocalStore(source => new TimesheetStore(source.globalStore), {
    globalStore
  });

  useInitialMount(() => {
    async function fetchData() {
      store.initialiseTimesheetRows()
      console.log(store.timesheetRows)
      await store.getClients()
      // console.log(store.clients)
      // store.getDaysAndClientsArray()
    }
    fetchData()
  })

  const [selectedClient, setSelectedClient] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    moment(new Date()).toDate()
  );

  const handleClick = (e: any) => {
    console.log("Card clicked");
  };

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      alert("Enter pressed");
    }
  };

  const handleClientChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedClient(event.target.value);
  };

  const handleDateChange = useCallback(async (date: Date | null) => {
    store.timesheetDate = moment(date!).startOf('month').toDate();
    setSelectedDate(date);
    store.getDaysAndClientsArray();
  }, []);

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card}>
          {/* <CardHeader className={classes.header} title="Create New Timesheet" /> */}
          <CardContent>
            <div className={classes.noScroll}>
            <Typography variant="h5" component="h2">
              Create new monthly timesheet
            </Typography>
            {/* <InputProps
                stateObject={store}
                errorHandler={store.errorHandler}
                propertyName="hostName"
              > */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                required
                disablePast
                id="date-picker-dialog"
                label="Timesheet month"
                format="MM/yyyy"
                views={["month", "year"]}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            <Button
              variant="contained"
              size="large"
              className={classes.submitBtn}
              onClick={store.saveTimesheet}
              // disabled={store.isCreateRoundDisabled}
            >
              Save Timesheet
            </Button>
            </div>
            {/* </InputProps>
              <InputProps
                stateObject={store}
                errorHandler={store.errorHandler}
                propertyName="quizName"
              > */}
            <div>
            {store.timesheetRows2.map((row, index) => (
              <TimesheetRows day={row.date!} index={index} clients={store.clients} rows={store.timesheetRows2} key={index}/>
            ))}
            </div>
            {/* </InputProps> */}
          </CardContent>
          <CardActions className={classes.actions}>
          {/* <Button
              variant="contained"
              size="large"
              className={classes.submitBtn}
              // onClick={store.saveRound}
              // disabled={store.isCreateRoundDisabled}
            >
              Save Timesheet
            </Button> */}
          </CardActions>
        </Card>
      </form>
      {/* <LoadingModal title="Creating Quiz..." visible={store.isSaving} />
      {store.quizCreatedSuccessfully && (
        <Redirect to={{ pathname: `/invite-teams/${store.quiz.id}` }} />
      )} */}
    </div>
  );
};

export default observer(EditTimesheet);
