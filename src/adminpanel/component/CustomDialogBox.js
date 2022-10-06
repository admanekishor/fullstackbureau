import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import {
    Button,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from "@material-ui/core";
// import "./styles.css";

function CustomDialogBox(props) {
    const { ShowModal, setShowModal } = props;
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        dname: "",
        dsource: ""
    });

    useEffect(() => {
        handleClickOpen()
    }, [ShowModal])

    // const handleChange = name => e => {
    //     setState({
    //         ...state,
    //         [name]: e.target.value
    //     });
    // };

    const handleClickOpen = () => {
        ShowModal && setOpen(true)
      
    };

    const handleClose = () => {
        
        ShowModal && setOpen(false);
        setShowModal(false)
    };

    return (
        <div>
           
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here.
                        We will send updates occasionally.
                    </DialogContentText>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        value={state.dname || ""}
                        onChange={handleChange("dname")}
                        fullWidth
                    />
                    <Select
                        native
                        fullWidth
                        value={state.dsource || ""}
                        onChange={handleChange("dsource")}
                    >
                        <option value="" />
                        <option value={"mssql"}>mssql</option>
                        <option value={"oracle"}>oracle</option>
                    </Select> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            props.addDataSource(state.dname, state.dsource);
                            setOpen(false);
                        }}
                        color="primary"
                    >
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CustomDialogBox;