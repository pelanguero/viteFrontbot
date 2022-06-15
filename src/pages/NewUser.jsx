import { Component } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setTok } from '../redux/reducer'



const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 3 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

const Log = () =>{
    const dispatch = useDispatch()
    dispatch(
        setTok( localStorage.getItem('Session') || '')
    )
    return (<Navigate to='/home' />)
}


export default class NewUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',
            token: localStorage.getItem('Session'),
            password: '',
            formErrors: {
                nombre: '',
                apellido: '',
                email: '',
                password: ''
            }
        }
    }

    onImputChanges = (e) => {
        e.preventDefault();

        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };
        switch (name) {

            case "nombre":

                formErrors.nombre =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;

            case "apellido":

                formErrors.apellido =
                    value.length < 3 ? "minimum 8 characaters required" : "";
                break;

            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value });

    }

    onSubmit = async (e) => {
        e.preventDefault();
        const state = this.state

        const data = {
            'Nombre': state.nombre + state.apellido,
            'Correo': state.email,
            'Foto': state.email,
            'Clave': state.password
        }            

        if (!formValid(state)) {
            const log = JSON.stringify(data)
            axios.put('http://localhost:9080/registro/',
                log
            ).then( async (e) => {
                if (e.data.id) {
                    this.setState({token: e.data.id})
                    localStorage.setItem('Session', this.state.token )
                    return Log                                   
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }

    }

    render() {
        const { formErrors } = this.state;
        if (!this.state.token) {
            return (
                <form className="box" onSubmit={this.onSubmit}>
                    <h2>Loging</h2>
                    <div>
                        <input
                            onChange={this.onImputChanges}
                            type="text" name="nombre"
                            placeholder="Nombre"
                            className={formErrors.nombre.length < 3 ? "error" : null}
                        />
                        {formErrors.nombre.length > 3 && (
                            <p id="emailHelp" className="errorMessage ">{formErrors.nombre}</p>
                        )}

                    </div>
                    <div>
                        <input
                            onChange={this.onImputChanges}
                            type="text" name="apellido"
                            placeholder="Apellido"
                            className={formErrors.apellido.length < 3 ? "error" : null} />
                        {formErrors.apellido.length > 3 && (
                            <p id="emailHelp" className="errorMessage ">{formErrors.apellido}</p>
                        )}
                    </div>
                    <div>
                        <input onChange={this.onImputChanges}
                            type="text" name="email"
                            placeholder="Email"
                            className={formErrors.email.length > 3 ? "error" : null} />
                        {formErrors.email.length > 3 && (
                            <p id="emailHelp" className="errorMessage ">{formErrors.email}</p>
                        )}
                    </div>
                    <div>
                        <input onChange={this.onImputChanges}
                            type="password" name="password"
                            placeholder="Password"
                            className={formErrors.password.length > 3 ? "error" : null} />
                        {formErrors.password.length > 3 && (
                            <p id="emailHelp" className="errorMessage ">{formErrors.password}</p>
                        )}
                    </div>

                    <button type="submit" value="Login">Loging</button>
                </form>
            )
        }
        return (
            
            <Navigate to='/home' />

            
        );
    }
}