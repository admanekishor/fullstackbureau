import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import { TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import EcardForm from './EcardForm'; 

export default function YoutubePopup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen} color="inherit">
                Get E Card
            </Button>
            <Dialog
                maxWidth="xs"
                open={open}
                onClose={handleClose}
            >
                {/* <DialogTitle>Optional sizes</DialogTitle> */}
                <DialogContent>
                    <DialogContentText textAlign="center" sx={{mb:2, fontWeight:700, color:'#810050'}}>
                        Download E-Card By Following Details:
                    </DialogContentText>
                    <EcardForm/>
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions> */}
            </Dialog>
        </React.Fragment>
    );
}
