import React, { useState } from 'react';
import { commonApiCall,getJwt } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
toast.configure()

const ChangePassword = ({ commonApiCall }) => {
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
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
        let {oldPassword, newPassword } = formData
        if (validateForm()) {
            const requestParams = {
                oldPassword:oldPassword,
                newPassword:newPassword
            }
            const authorized = getJwt() ? true : false;
            let response = await commonApiCall(API_URL + 'users/changePassword', "post", requestParams, '', authorized)
            if(response&&response.status===1){
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }
    const validateForm = () => {
        let {oldPassword, newPassword, errors } = formData;
        let formIsValid = true
       
        if (!oldPassword || oldPassword.trim() === '') {
            formIsValid = false
            errors['oldPassword'] = '* Oldpassword required'
        }
        if (!newPassword || newPassword.trim() === '') {
            formIsValid = false
            errors['newPassword'] = '* Newpassword required'
        }
        setFormData({ ...formData, errors: errors });
        return formIsValid
    }


    let {oldPassword, newPassword, errors } = formData
    return (
        <div className="modal-content animate">
            <div className="container">
               
                <label>Old password</label>
                <div>
                    <input type="password" placeholder="Enter Oldpassword" name="oldPassword" value={oldPassword} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.oldPassword}</span>
                </div>
               
                <label >New Password</label>
                <input type="password" placeholder="Enter Newpassword" name="newPassword" value={newPassword} onChange={(e) => handleChange(e)} />
                <span className='err-msg'>{errors.newPassword}</span>

                <button type="button" onClick={() => submit()}>Submit</button>
            </div>
        </div>);
};


export default connect(null, { commonApiCall })(ChangePassword);
