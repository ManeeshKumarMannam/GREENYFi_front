import React, { useState } from 'react';
import { commonApiCall } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
toast.configure()

const Register = ({ commonApiCall }) => {
    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        mobile: '',
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

    const register = async () => {
        let { fname, lname, email, mobile, password } = formData
        if (validateForm()) {
            const requestParams = {
                fullName: fname + " " + lname,
                emailId: email,
                password: password,
                mobile: mobile
            }
            let response = await commonApiCall(API_URL + 'users/register', "post", requestParams, '', '')
            console.log(response);
            if(response&&response.status===1){
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }
    const validateForm = () => {
        let { fname, email, mobile, password, errors } = formData;
        let formIsValid = true
        let pattern = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        let mobPattern=new  RegExp( /^.{10}$/ )
        if (!fname || fname.trim() === '') {
            formIsValid = false
            errors['fname'] = '* Firstname required'
        }
        if (!pattern.test(email)) {
            formIsValid = false
            if(!email){
              errors['email'] = '* Email required'
            }else
            errors['email'] = '* Enter valid Email'
        }
        if (!mobPattern.test(mobile)) {
            formIsValid = false
            if(!mobile){
              errors['mobile'] = '* Mobile required'
            }else
            errors['mobile'] = '* Enter valid mobile'
        }
        if (!password || password.trim() === '') {
            formIsValid = false
            errors['password'] = '* Password required'
        }
        setFormData({ ...formData, errors: errors });
        return formIsValid
    }


    let { fname, lname, email, mobile, password, errors } = formData
    return (
        <div className="modal-content animate">
            <div className="container">
                <label>First name</label>
                <div>
                    <input type="text" placeholder="Enter Firstname" name="fname" value={fname} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.fname}</span>
                </div>

                <label>Last name</label>
                <div>
                    <input type="text" placeholder="Enter Lastname" name="lname" value={lname} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.lname}</span>
                </div>
                <label>Email</label>
                <div>
                    <input type="text" placeholder="Enter Email" name="email" value={email} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.email}</span>
                </div>
                <label>Mobile</label>
                <div>
                    <input type="number" placeholder="Enter Mobile" name="mobile" value={mobile} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.mobile}</span>
                </div>
                <label >Password</label>
                <input type="password" placeholder="Enter Password" name="password" value={password} onChange={(e) => handleChange(e)} />
                <span className='err-msg'>{errors.password}</span>

                <button type="button" onClick={() => register()}>Sign up</button>
            </div>
        </div>);
};


export default connect(null, { commonApiCall })(Register);
