import {Component} from "react";
import {Box, Button,  Modal, Typography} from "@mui/material";

export default class DeleteModal extends Component {
    constructor(props) {
        super(props);
    }

    deleteFunction(event) {
        this.props.deleteFunc(event);
    }


    render() {
        const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };

        return (
            <Modal open={this.props.modalOpen} onClose={this.props.handleClose} aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description">
                <Box sx={style}>



                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Delete
                            </Typography>

                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Are you sure you want to delete flight {this.props.flightNumber}?
                        </Typography>
                        <Box sx={{mt: 3}}>
                            <Button type="button" onClick={this.props.handleClose}>Cancel</Button>
                            <Button color={"error"} onClick={(e) => {
                                this.props.deleteFunc(e);
                                this.props.handleClose();
                            }} type="button" name={this.props.flightId}>Delete
                            </Button>
                        </Box>


                </Box>
            </Modal>
        )
    }
}