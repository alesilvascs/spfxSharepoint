
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {useEffect, useState} from "react";
import {sp} from "@pnp/sp";
import {IAgendaUiProps} from "../components/IAgendaUiProps";
import * as React from 'react';


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

export default function FormAgenda(props: IAgendaUiProps) {



    const [open, setOpen] =  useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const classes = useStyles();

    const [cabana, setAge] =  useState('');
    const [datainicial, setDatainicial] = useState('')
    const [datafinal, setDatafinal] = useState('')

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setAge(event.target.value as string);
    };

    // const [res, setRes] = useState([])
    const [dados, setData] = useState({});

    useEffect(() => {
        sp.setup({
            spfxContext: props.context,
            sp: {
                baseUrl: "https://4qvv8t.sharepoint.com/sites/Dados",
                headers: {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json;odata=verbose"
                },
            }
        });

    }, [dados]);


     const SalvarReserva = async ()  => {
         let cor:string
         if(cabana == "Cabana Rústica"){
             cor="blue"
         }else if(cabana == "Cabana do Tênis"){
             cor="green"
         }else if(cabana == "Choupana"){
             cor="purple"
         }
         await sp.web.lists.getByTitle("Reservas").items.add({
                 Title: props.userDisplayName,
                 Cabana: cabana,
                 color: cor,
                 DataInicial: datainicial,
                 DataFinal: datafinal
             }
    )}


    async function salvar() {
        const vari = {
            cabana, datainicial, datafinal
        }

        setData(vari);
        SalvarReserva();
        handleClose();
    }
    let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

    console.log(todayStr+ " 08:00")
    // @ts-ignore
    return (
        <div>
            {/*<Button variant="contained" color="secondary" onClick={handleClickOpen}>*/}
            {/*    Novo*/}
            {/*</Button>*/}
            <Fab color="secondary" onClick={handleClickOpen} aria-label="close">
                <AddIcon/>
            </Fab>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Nova Reserva</DialogTitle>
                <DialogContent>
                    <form className={classes.container} noValidate>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-label">Cabanas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="cabana"
                                value={cabana}
                                onChange={handleChange}>
                                <MenuItem value={'Cabana Rústica'}>Cabana Rústica</MenuItem>
                                <MenuItem value={'Cabana do Tênis'}>Cabana do Tênis</MenuItem>
                                <MenuItem value={'Choupana'}>Choupana</MenuItem>
                            </Select>
                            <TextField
                                id="datainicial"
                                label="Data Inicial"
                                type="datetime-local"
                                defaultValue= "2023-02-24 08:00"
                                onChange={e => setDatainicial(e.target.value)}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="datafinal"
                                label="Data Final"
                                type="datetime-local"
                                defaultValue="2023-02-24 18:00"
                                onChange={e => setDatafinal(e.target.value)}
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
                    <Button onClick={salvar} color="primary">
                        Salvar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
