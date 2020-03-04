import React, { useState } from 'react';
import { commonApiCall } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
toast.configure()

const ForgotPassword = ({ commonApiCall }) => {
    const [formData, setFormData] = useState({
        email: '',
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

    const submit = async () => {
        let {email} = formData
        if (validateForm()) {
            const requestParams = {
                emailId:email,
            }
            let response = await commonApiCall(API_URL + 'users/forgotPassword', "post", requestParams, '', '')
            if(response&&response.status===1){
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }
    const validateForm = () => {
        let { email,errors } = formData;
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
        setFormData({ ...formData, errors: errors });
        return formIsValid
    }


    let {email, errors } = formData
    return (
        <div className="modal-content animate">
            <div className="container">
               
                <label>Email</label>
                <div>
                    <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.email}</span>
                </div>
                <button type="button" onClick={() => submit()}>Submit</button>
            </div>
        </div>);
};


export default connect(null, { commonApiCall })(ForgotPassword);
