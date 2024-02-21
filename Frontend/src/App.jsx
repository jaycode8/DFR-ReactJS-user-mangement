import "./App.css";
import Forms from "./pages/userForms/forms";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import UpdateForm from "./pages/userForms/modifyUser";
import Otp from "./pages/OTP/Otp";

function App() {
	return (
		<div className="box">
			<Routes>
				<Route path="/" element={<Forms />} />
				<Route path="/home" element={<Home />} />
				<Route path="/update" element={<UpdateForm />} />
				<Route path="/otp" element={<Otp />} />
			</Routes>
		</div>
	);
}

export default App;
