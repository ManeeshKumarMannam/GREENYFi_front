import React, { Component } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            getEmail: '',
            getpsw: '',
            getUsersDetails: [],
            errors: {}
        }
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.value) {
            this.setState({
                errors: Object.assign(this.state.errors, { [event.target.name]: "" })
            });
        }
    }

    componentDidMount() {
        axios({
            url: 'https://swapi.co/api/people/',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log(response);

                if (response && response.status == 200) {
                    this.setState({ getUsersDetails: response.data.results })
                }
            })
    }

    login = () => {
        let { userName, password, getUsersDetails } = this.state
        if (this.validateForm()) {
            var chacking = getUsersDetails.filter(user => (user.name === userName && user.birth_year === password));
            if (chacking.length != 0) {
                this.props.history.push('/homePage')
            } else {
                toast.error("Incorrect credentials", { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }

    validateForm() {
        let { password, userName, errors } = this.state;
        let formIsValid = true
        if (!userName || userName.trim() === '') {
            formIsValid = false
            errors['userName'] = '* User name required'
        }
        if (!password || password.trim() === '') {
            formIsValid = false
            errors['password'] = '* Password required'
        }
        this.setState({ errors })
        return formIsValid
    }

    render() {
        let { userName, password, errors } = this.state
        return (
            <div className="modal-content animate">
                <div className="container">
                    <label><b>User Name</b></label>
                    <div>
                        <input type="text" placeholder="Enter Username" name="userName" value={userName} onChange={this.handleChange} />
                        <span className='err-msg'>{errors.userName}</span>
                    </div>
                    <label ><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={this.handleChange} />
                    <span className='err-msg'>{errors.password}</span>

                    <button type="button" onClick={() => this.login()}>Login</button>
                </div>
            </div>
        );
    }
}


export default Login 