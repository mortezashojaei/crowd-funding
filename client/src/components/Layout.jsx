import { NavLink } from "react-router-dom";
import Logo from "../assets/crowd-funding-logo.jpg";

export const Layout = ({ children }) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {children}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side  w-80 text-base-content bg-slate-200">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <img class="mask mask-squircle m-auto w-32 h-32" src={Logo} />
        <ul className="menu p-4 overflow-y-auto">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/new">Create Project</a>
          </li>
          <li>
            <a href="/list">Projects List</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
