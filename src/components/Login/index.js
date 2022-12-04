import "./Login.css";
import {useState,useEffect} from "react"
import {useNavigate} from "react-router-dom"
import { AuthState } from "../../store/AuthProvider";
import axios from "axios";
import { url } from "../../constants";

//const url = "https://api.escuelajs.co/api/v1/auth/login";

function Login() {
    const {setAuth,setUser,setIsLogin} = AuthState();
    const navigate = useNavigate();
    const initialValues = {email:'',password:''};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [errorMeg,setErrorMeg] = useState('');
    const [dataUsers,setDataUsers] = useState([]);

    const validate = (values) => {
        const msg = {};
        const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        if(!values.email) {
            msg.email = 'The email is required';
        } else if(!regex.test(values.email)) {
            msg.email = 'The email is invalid';
        }
        if(!values.password) {
            msg.password = 'The password is required';
        } 
        return msg;
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    useEffect(() => {
        const controller = new AbortController();
        try {
            const fetchData = async () => {
                const respone = await axios.get(url+'/users',{
                    signal: controller.signal
                })
                setDataUsers(respone.data)
            }
            fetchData();
        } catch(e) {
            console.log(e);
        }
        return () => {
            controller.abort();
        }
    },[]);

    const handleSubmit = async(e) => {

        e.preventDefault();
        setFormErrors(validate(formValues));
        const user = dataUsers.find((data) => {
            return data.email===formValues.email&&data.password===formValues.password;
        })
        if(user) {
            const {email,password,role} = user;
            setAuth({email,password,role});
            setUser(user);
            setIsLogin(true);
            if(user.role==='admin') navigate('/login/admin');
            else {
                navigate('/');
            }
        } else {
            setErrorMeg("Missing email or password!");
        }
    }
    return(
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="form-title">Login</h3>
                <div className="form-group">
                    <input type="text" placeholder="Email" name="email" className="form-input" onChange={handleChange} value={formValues.email}/>
                    {formErrors.email && <p className='message-error'>{formErrors.email}</p>}
                </div>
                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" className="form-input" onChange={handleChange} value={formValues.password}/>
                    {formErrors.password && <p className='message-error'>{formErrors.password}</p>}
                </div>
                <div className="form-group-btn">
                    <div className="remember">
                        <input type="checkbox" name="remember" className="checkbox"/>
                        Remember me
                    </div>
                    <a href="/">Forgot?</a>
                </div>
                <button type="submit" className="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;