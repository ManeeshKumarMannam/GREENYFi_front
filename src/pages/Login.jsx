import React, { useState } from 'react';
import { commonApiCall } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
toast.configure()

const Login = ({ commonApiCall }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        errors: {}

    });
    //handle change
    const handleChange = e => {
        if (e.target.value) {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
                errors: Object.assign(formData.errors, { [e.target.name]: "" })
            });
        }
        else setFormData({
            ...formData, [e.target.name]: ''
        });
    };

    const login = async () => {
        let {email, password } = formData
        if (validateForm()) {
            const requestParams = {
                emailId:email,
                password:password
            }
            let response = await commonApiCall(API_URL + 'users/login', "post", requestParams, '', '')
            if(response&&response.status===1){
                console.log(response);
                localStorage.setItem('token',response.access_token)
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }
    const validateForm = () => {
        let { email,password, errors } = formData;
        let formIsValid = true
        let pattern = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        if (!pattern.test(email)) {
            formIsValid = false
            if(!email){
              errors['email'] = '* Email required'
            }else
            errors['email'] = '* Enter valid Email'
        }
        if (!password || password.trim() === '') {
            formIsValid = false
            errors['password'] = '* Password required'
        }
        setFormData({ ...formData, errors: errors });
        return formIsValid
    }


    let {email, password, errors } = formData
    return (
        <div className="modal-content animate">
            <div className="container">
               
                <label>Email</label>
                <div>
                    <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.email}</span>
                </div>
               
                <label >Password</label>
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e) => handleChange(e)} />
                <span className='err-msg'>{errors.password}</span>

                <button type="button" onClick={() => login()}>Login</button>
            </div>
        </div>);
};


export default connect(null, { commonApiCall })(Login);
