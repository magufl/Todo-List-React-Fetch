import React from "react";
import {ToDoJPH} from "../component/ToDoJPH.jsx"



//create your first component
const Home = () => {
	return (
		<div className="d-flex py-5 justify-content-center bg-light">

			<ToDoJPH/>

		</div>
	);
};

export default Home;