import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice";

const Navigation = ()=>{
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
    const dispatch = useDispatch();
    return(
        <nav className="flex items-center">
            {isLoggedIn && <NavLink to="/" className="mr-5 hover:text-green-400 font-semibold text-lg">Home</NavLink>}
            {isLoggedIn && <NavLink to="/expenses" className="mr-5 hover:text-green-400 font-semibold text-lg">Expenses</NavLink>}
            {isLoggedIn && <NavLink to="/about" className="hover:text-green-400 mr-5 font-semibold text-lg">About</NavLink>}
            {isLoggedIn && <button className="bg-green-500 hover:bg-green-600 px-2 py-1 text-white shadow rounded" onClick={()=>dispatch(logout())}>Logout</button>}
        </nav>
    )
}
export default Navigation;