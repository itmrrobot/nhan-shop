import styles from "./Resgister.module.scss";
import classNames from "classnames/bind";
import { useState } from "react";
import axios from 'axios';
import {url} from '../../constants/index';
import { AuthState } from "../../store/AuthProvider";
import {useNavigate} from 'react-router-dom';

const cx = classNames.bind(styles);

function Resgister() {
    const avatarDefault = 'https://png.pngtree.com/png-clipart/20191121/original/pngtree-user-icon-png-image_5097430.jpg';
    const initialValue = {name:'',email:'',password:'',avatar:avatarDefault};
    const [formValues,setFormValues] = useState(initialValue);
    const [formErrors,setFormErrors] = useState({});
    const [isSuccess,setIsSuccess] = useState(false);
    const {setUser,setIsLogin} = AuthState();
    const navigate = useNavigate();

    const validate = (values) => {
        const msg = {};
        const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.name) {
            msg.name = 'The name is required';
        }

        if(!values.email) {
            msg.email = 'The email is required';
        } else if(!regex.test(values.email)) {
            msg.email = 'The email is invalid';
        } 

        if(!values.password) {
            msg.password = 'The password is required';
        } else if(values.password.length<6) {
            msg.password = 'Password must be 6 or more characters';
        }
        return msg;
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        if(formErrors.name!==''&&formErrors.email!==''&&formErrors.password!=='') {
            setIsSuccess(true);
            setIsLogin(true);
        } else {
            setIsSuccess(false);
        }
        try {
            const respone = await axios.post(url+'/users/',formValues);
            setUser(respone.data);
        } catch(e) {
            throw new Error(e);
        }
    }

    const handleOK = () => {
        navigate('/');
    }

    const MessageSuccess = () => {
        return(
            <div className={cx('wrap-message')}>
                <div className={cx('icon-success')}>
                    <svg width='36px' height='36px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#fff" d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>
                <div className={cx('message-success')}>
                    <h3 className={cx('message-success-title')}>Registration completed successfully</h3>
                    <p className={cx('message-success-sentence')}>Please check your email for the detail</p>
                </div>
                <button className={cx('btn-ok')} onClick={handleOK}>OK</button>
            </div>
        )
    }

    return (
        <div className={cx('wrap-resgister')}>
            {isSuccess===false?
            <form className={cx('form-resgister')} onSubmit={handleSubmit}>
                <h3 className={cx('resgister-title')}>Resgister</h3>
                <div className={cx('form-resgister-group')}>
                    <span className={cx('form-group-title')}>Name*</span>
                    <input type="text" name="name" value={formValues.name} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.name&&<p className={cx('message')}>{formErrors.name}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <span className={cx('form-group-title')}>Email Address*</span>
                    <input type="text" name="email" value={formValues.email} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.email&&<p className={cx('message')}>{formErrors.email}</p>}
                </div>
                <div className={cx('form-resgister-group')}>
                    <span className={cx('form-group-title')}>Password*</span>
                    <input type="password" name="password" value={formValues.password} className={cx('form-input')} autoComplete="off" onChange={handleChange}/>
                    {formErrors.password&&<p className={cx('message')}>{formErrors.password}</p>}
                </div>
                <button type="submit" className={cx('submit','submit-resgister')}>Resgister</button>
            </form>
            :<MessageSuccess/>}
        </div>
    )
}

export default Resgister;