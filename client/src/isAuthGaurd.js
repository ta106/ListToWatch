import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default (RouteComp) => ({ match }) => {
  const hist = useHistory();
  const isAuth = useSelector((store) => store.session.isAuth);
  if (!isAuth) {
    return <RouteComp match={match} />;
  }
  hist.push("/");
  return <div />;
};
