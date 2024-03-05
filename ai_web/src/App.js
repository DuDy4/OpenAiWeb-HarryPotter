import './App.css';
import Header from "./Comps/Header";
import Footer from "./Comps/footer";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
        <div className="content margin-top-60px">
            <Outlet/>
        </div>
      <Footer/>
    </div>
  );
}

export default App;
