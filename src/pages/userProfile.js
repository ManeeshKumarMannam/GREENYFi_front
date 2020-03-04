import React, { useState,useEffect } from 'react';
import { commonApiCall,getJwt } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
toast.configure()

const UserProfile = ({ commonApiCall }) => {
    const [formData, setFormData] = useState({
        fullname: '',
        mobile: '',
        email: '',
        errors: {}

    });
    useEffect(()=>{
        async function doSubmit() {
        const authorized = getJwt() ? true : false;
        let response = await commonApiCall(API_URL + 'users/profile', "get", '', '', authorized)
        console.log(response);
        if(response&&response.status===1){
            let {fullName,mobile,emailId}=response.data
            setFormData({...formData,
                fullname:fullName,
                mobile: mobile,
                email:emailId
            })
            toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
        }
    }
    doSubmit();
    },[])
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
        console.log("gg");
        
        let { fullname, email, mobile} = formData
        if (validateForm()) {
        console.log("gg1");

            const requestParams = {
                fullName: fullname,
                emailId: email,
                mobile: mobile
            }
            const authorized = getJwt() ? true : false;
            let response = await commonApiCall(API_URL + 'users/updateUserProfile', "post", requestParams, '', authorized)
            console.log(response);
            if(response&&response.status===1){
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }
    }
    const validateForm = () => {
        let { fullname, email, mobile,errors } = formData;
        let formIsValid = true
        let pattern = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        let mobPattern=new  RegExp( /^.{10}$/ )
        if (!fullname || fullname.trim() === '') {
            formIsValid = false
            errors['fullname'] = '* Fullname required'
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
        setFormData({ ...formData, errors: errors });
        return formIsValid
    }


    let { fullname, email, mobile, errors } = formData
    return (
        <div className="modal-content animate">
            <div className="container">
                <label>Full name</label>
                <div>
                    <input type="text" placeholder="Enter Name" name="fullname" value={fullname} onChange={(e) => handleChange(e)} />
                    <span className='err-msg'>{errors.fullname}</span>
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
                <button type="button" onClick={() => submit()}>Submit</button>
            </div>
        </div>);
};


export default connect(null, { commonApiCall })(UserProfile);
