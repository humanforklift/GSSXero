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
import { TableComponent } from "shared-components/material-ui-table-component";
import { OpenTimesheetGridDefinition } from "./OpenTimesheetGridDefinition";
import { TimesheetRequest } from "client/backendclient";

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

const OpenTimesheets = () => {
  const classes = useStyles({});
  const history = useHistory();

  const globalStore = useContext(GlobalStoreContext);
  const store = useLocalStore(source => new TimesheetStore(source.globalStore), {
    globalStore
  });

  useInitialMount(() => {
    async function fetchData() {
      await store.getOpenTimesheets()
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

  const onRowClick = useCallback(async (event?: React.MouseEvent, rowData?: TimesheetRequest) => {
    if (!rowData) {
      throw new Error('Internal Error: rowData is undefined');
    }
    //history.push(`/service/${rowData.serviceId!}`);
  }, [history])

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
      {/* {store.hasResults && ( */}
        <TableComponent
          columns={OpenTimesheetGridDefinition}
          data={store.openTimesheets}
          onRowClick={onRowClick}
          title={'Open Timesheets'}
          options={{
            exportButton: false,
            search: false
          }}
        />
      {/* )} */}
      </form>
      {/* <LoadingModal title="Creating Quiz..." visible={store.isSaving} />
      {store.quizCreatedSuccessfully && (
        <Redirect to={{ pathname: `/invite-teams/${store.quiz.id}` }} />
      )} */}
    </div>
  );
};

export default observer(OpenTimesheets);
