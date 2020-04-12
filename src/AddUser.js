import React,{ Component } from 'react';
import './ContactViewer.scss';

class AddUser extends Component{

    state = {
        name:"",
        email:"",
        phone:"",
        company:"",
        address:"",
        isEditing:false
    }
    //call addUser (App.js)
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addUser(this.state);  
        e.target.reset();

    }
    // update state
    updateState = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        });
    }

    render(){
        return(
            <div >
               
                <span class="material-icons" data-toggle="modal" data-target="#myModal" style={{color:"rgb(220, 0, 78)",fontSize:"50px",cursor:"pointer"}}>
                add_circle
                </span>
            <div className="modal" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h2  style={{marginLeft:"150px",color:"#3f51b5"}}>Add New Contact</h2>
                    <button type="button" className="close" data-dismiss="modal"style={{fontSize:"30px"}}>&times;</button>
                </div>
                <div class="modal-body">
                    <form onSubmit={this.handleSubmit} style={{marginLeft:"30px"}}>
                        <div className="col-sm">
                            <div className="form-field">
                                <div className="form-field__control">
                                    <input name="name" onChange={ this.updateState} type="text" class="form-field__input" placeholder=" " />
                                    <label for="firstname" class="form-field__label">Full Name</label>
                                    <div className="form-field__bar"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-field">
                                <div className="form-field__control">
                                    <input name="email" onChange={ this.updateState} type="text" class="form-field__input" placeholder=" " />
                                    <label for="firstname" class="form-field__label">Email id</label>
                                    <div className="form-field__bar"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-field">
                                <div className="form-field__control">
                                    <input name="phone" onChange={ this.updateState} type="text" class="form-field__input" placeholder=" " />
                                    <label for="firstname" class="form-field__label">Phone No.</label>
                                    <div className="form-field__bar"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-field">
                                <div className="form-field__control">
                                    <input name="company" onChange={ this.updateState} type="text" class="form-field__input" placeholder=" " />
                                    <label for="firstname" class="form-field__label">Company Name</label>
                                    <div className="form-field__bar"></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="form-field">
                                <div className="form-field__control">
                                    <input name="address" onChange={ this.updateState} type="text" className="form-field__input" placeholder=" " />
                                    <label for="firstname" className="form-field__label">Address</label>
                                    <div className="form-field__bar"></div>
                                </div>
                            </div>
                        </div>  
                        <div >
                            <button type="submit" class="btn btn-lg" style={{width:"120px",height:"40px",marginLeft:"140px",backgroundColor:"#3f51b5",color:"white"}}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </div>
            
            </div>
        );
    }
}
export default AddUser;