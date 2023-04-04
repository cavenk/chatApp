import "./sass/custom.scss"
import "bootstrap-icons/font/bootstrap-icons.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Provider } from "react-redux";
import { store } from "./redux/Store";


function App() {
  return (
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
