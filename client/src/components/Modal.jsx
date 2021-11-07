import {Component} from "react";


export default class Modal extends Component {
    constructor(props) {
        super(props);
    }
    deleteFunction(event){
        this.props.deleteFunc(event);
    }
    render() {
        return (
            <div className="modal fade" id={"a"+this.props.flightId} tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete flight {this.props.flightNumber}?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={(e)=>{
                                this.props.deleteFunc(e)
                            }} type="button" data-bs-toggle="modal" data-bs-target={"#a"+this.props.flightId} className="btn btn-outline-danger" name={this.props.flightId}>delete</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}