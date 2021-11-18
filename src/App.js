import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { loginActions } from "./store/login";

import RoutePartner from "./route/RoutePartner";
import RouteMember from "./route/RouteMember";
import RouteAdmin from "./route/RouteAdmin";
import UnregisteredRoute from "./route/UnregisteredRoute";

function App() {
  let navigate = useNavigate();
  let role_id = localStorage.getItem("role");
  let token = localStorage.getItem("token");
  
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => {
    return state.login.isLogin;
  });

  const isAdmin = useSelector((state) => {
    return state.login.isAdmin;
  });

  const isPartner = useSelector((state) => {
    return state.login.isPartner;
  });

  const cekAuth = async () => {
    if(token && role_id == 3){
      await dispatch(loginActions.admin) ;
      <RouteAdmin />
      // navigate("/admin/dashboard")
    } else if(token && role_id == 2){
      await dispatch(loginActions.partner);
      <RoutePartner />
      // navigate("/partner/dashboard")
    } else if(token && role_id == 1){
      await dispatch(loginActions.login);
      <RouteMember />
      // navigate("/member/dashboard")
    } else if(!token){
      navigate("/")
    }
  }
  
  useEffect(() => {
    const getCekAuth = async () => {
      await cekAuth();
    }

    getCekAuth();
  }, [isAdmin, isPartner, isLogin]);
  
  return (
    <Fragment>
      {
        token && role_id == 3 ? (
          <RouteAdmin /> ) :
        token && role_id == 2 ? (
          <RoutePartner /> ) :
        token && role_id == 1 ? (
          <RouteMember /> ) : (
          <UnregisteredRoute />)
        }
    </Fragment>
  );
}

export default App;
