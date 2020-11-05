import React from "react"
import { observer } from "mobx-react-lite"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"

interface AppBarContainerProps {
    title: React.ReactNode
    leftButtonIcon: React.ReactNode
    leftButtonOnClick: () => any
    rightButtons: React.ReactNode[]
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    toolbar: {
        minHeight: theme.spacing(7)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex', justifyContent: 'flex-start', alignItems: 'center',

        "&:hover": {
            cursor: "pointer",
          },
    },
    list: {
        width: 250,
    },
    content: {
        top: 0,
        padding: theme.spacing(8, 0, 0, 0),
    }
}))

export const AppBarContainer = observer((props: React.PropsWithChildren<AppBarContainerProps>) => {
    const classes = useStyles()
    const history = useHistory()

    const handleTitleClick = () => {
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="fixed" >
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu" onClick={props.leftButtonOnClick}>
                        {props.leftButtonIcon}
                    </IconButton>
                    <Typography color="inherit" variant="h6" className={classes.title} onClick={handleTitleClick}>
                        {props.title}
                    </Typography>

                    {props.rightButtons}
                    
                </Toolbar>
            </AppBar>
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
})

