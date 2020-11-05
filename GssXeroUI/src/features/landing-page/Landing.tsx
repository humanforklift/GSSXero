import React, { useContext } from "react";
import { observer, useLocalStore } from "mobx-react-lite";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, TextField, CardActions, Button, Typography } from "@material-ui/core";
import { useHistory, Redirect } from "react-router-dom";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexWrap: "wrap",
      margin: `${theme.spacing(0)} auto`,
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
    card: {
      //marginTop: theme.spacing(10),
      //minWidth: "600px",
      // maxHeight: '600px',
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
  })
);

const Landing = () => {
  const classes = useStyles({});
  const history = useHistory();

  const handleClick = (e: any) => {
    console.log('Card clicked');
  }

  const handleKeyPress = (e: any) => {
    if (e.keyCode === 13 || e.which === 13) {
      alert('Enter pressed');
    }
  };

  return (
    <div>
      <form className={classes.container} noValidate autoComplete="off">
        <Card className={classes.card} onClick={() => history.push('/new-timesheet')}>
          {/* <CardHeader className={classes.header} title="Create New Timesheet" /> */}
          <CardContent>
            <Typography variant="h5" component="h2">
                Create new Timesheet
            </Typography>
              {/* <InputProps
                stateObject={store}
                errorHandler={store.errorHandler}
                propertyName="hostName"
              > */}
                {/* <TextField
                  fullWidth
                  required
                  id="hostName"
                  label="Host Name"
                  placeholder="Enter a name"
                  margin="normal"
                  onKeyPress={(e) => handleKeyPress(e)}
                /> */}
              {/* </InputProps>
              <InputProps
                stateObject={store}
                errorHandler={store.errorHandler}
                propertyName="quizName"
              > */}
                {/* <TextField
                  fullWidth
                  required
                  id="quizName"
                  label="Quiz Name"
                  placeholder="Quiz Name"
                  margin="normal"
                  onKeyPress={(e) => handleKeyPress(e)}
                /> */}
              {/* </InputProps> */}
          </CardContent>
          <CardActions className={classes.actions}>
          </CardActions>
        </Card>
        <Card className={classes.card} onClick={() => history.push('/open-timesheets')}>
          {/* <CardHeader className={classes.header} title="Create New Timesheet" /> */}
          <CardContent>
            <Typography variant="h5" component="h2">
                Edit existing Timesheet
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
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

export default observer(Landing);
