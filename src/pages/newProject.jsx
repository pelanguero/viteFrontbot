import React, { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

export default class NewProject extends Component {
    constructor(props){
        super(props);
        this.state={
            projectdescription:"",
            initialdate:0,
            enddate:0,
            redirect:false
        }

    }
  onInputChange=(e)=>{
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({[name]: value });

  }
  onSubmit=(e) =>{
    e.preventDefault();
    const state = this.state
    let payload={
        idUser: localStorage.getItem("userId"),
        projectDesc: state.projectdescription,
        dateProject: new Date(state.initialdate).getTime(),
        openProject: 0,
        endProject: new Date(state.enddate).getTime(),
        flgEndProject: 0,
        tokenId: localStorage.getItem("Session")
    }
    axios.post("https://apibotservice.azurewebsites.net/apiBot/services/AccessApi/createProject",payload).then( async (e) => {
        console.log(e.data);
        this.setState({redirect: true });
    }).catch(function (error) {
        console.log(error);
    });
  }
  render() {

    if(this.state.redirect){
        return ( 
            <Navigate to='/home' />
        );
    }else{
        return (
            <form className="box" onSubmit={this.onSubmit}>
            <h2>New Project</h2>
            <div>
                <input
                    onChange={this.onInputChange}
                    type="text" name="projectdescription"
                    placeholder="Descripción"
                />
            </div>
            <h2>Fecha de inicio</h2>
            <div>
                <input
                    onChange={this.onInputChange}
                    type="date" name="initialdate"
                     />
                
            </div>
            <h2>Fecha de fin</h2>
            <div>
                <input
                    onChange={this.onInputChange}
                    type="date" name="enddate"
                     />
                
            </div>
            
    
            <button type="submit" value="Login">Crear proyecto</button>
        </form>
        )
    }
    
  }
}
