import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";


const defaultToolbarStyles = {
    iconButton: {}
};

function CustomToolbar(props) {
   
    const { classes, onclick } = props;

    return (
        <React.Fragment>
          
            <Tooltip title={"Add Area"}>
                <IconButton className={classes.iconButton} onClick={onclick}>
                    <AddIcon className={classes.deleteIcon} />
                </IconButton>
            </Tooltip>
        </React.Fragment>
    );
}


export default withStyles(defaultToolbarStyles)(CustomToolbar);
