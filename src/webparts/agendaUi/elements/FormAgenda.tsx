import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 500,
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 500,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },

    }),

);

export default function FormAgenda() {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const classes = useStyles();
    const [age, setAge] = React.useState('');
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    return (
        <div>
            {/*<Button variant="contained" color="secondary" onClick={handleClickOpen}>*/}
            {/*    Novo*/}
            {/*</Button>*/}
            <Fab    color="secondary" onClick={handleClickOpen} aria-label="close">
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nova Reserva</DialogTitle>
                <DialogContent>
                   <form className={classes.container} noValidate>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Cabanas</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            onChange={handleChange}>
                            <MenuItem value={10}>Cabana Rústica </MenuItem>
                            <MenuItem value={20}>Cabana do Tênis </MenuItem>
                            <MenuItem value={30}>Choupana</MenuItem>
                        </Select>
                        <TextField
                            id="datetime-local"
                            label="DData Inicial"
                            type="datetime-local"
                            defaultValue="2022-09-24 08:00"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            id="datetime-local"
                            label="Data Final"
                            type="datetime-local"
                            defaultValue="2022-09-24 18:00"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </FormControl>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
