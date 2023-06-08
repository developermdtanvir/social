import { Link, Outlet } from "react-router-dom";
import Navbar from "../Sheard/Navbar";

function Main() {
    return (
        <div className=" flex justify-evenly">
            <Navbar />
            <div className="drawer drawer-end lg:drawer-open mt-16">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='/login'>Sidebar Item 2</Link></li>
                    </ul>

                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Main;