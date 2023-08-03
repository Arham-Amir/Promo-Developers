'use client'
import { Provider as Prov } from "react-redux"
import store from "@redux/store";

const Provider = ({ children }) => {
  return (
    <Prov store={store}>
      {children}
    </Prov>
  );
}

export default Provider;


