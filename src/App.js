import React, { Component } from "react";
import TodoApp from "./components/todo/TodoApp";
import logo from "./logo.svg";
import "./App.css";
//import "./bootstrap.css";

class App extends Component {
	render() {
		return (
      <div className="App container">
        <TodoApp />
      </div>
    );
	}
}

export default App;
