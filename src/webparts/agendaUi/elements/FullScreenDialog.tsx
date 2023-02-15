import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import Callendario from "./Callendario";
import FormAgenda from "./FormAgenda";
import { useState} from "react";
import {IAgendaUiProps} from "../components/IAgendaUiProps";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props: IAgendaUiProps) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (

        <div>

            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Agenda Cabanas
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>

                        <Typography variant="h6" className={classes.title}>
                            <h2>AAPM</h2>
                        </Typography>
                        <div style={{marginRight: "10%"}}><FormAgenda userDisplayName={props.userDisplayName}/></div>

                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        {/*<Button autoFocus color="inherit" onClick={handleClose}>*/}
                        {/*    save*/}
                        {/*</Button>*/}
                    </Toolbar>
                </AppBar>

                <Callendario children={props}  />
            </Dialog>
        </div>
    );
}

