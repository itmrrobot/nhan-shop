import {createContext,useContext,useState} from "react";

const AuthContext = createContext();

function AuthProvider({children}) {
    const [auth,setAuth] = useState({});
    const [user,setUser] = useState({});
    const [isLogin,setIsLogin] = useState(false);
    return(
        <AuthContext.Provider value={{auth,setAuth,user,setUser,isLogin,setIsLogin}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const AuthState = () => {
    return useContext(AuthContext);
}
