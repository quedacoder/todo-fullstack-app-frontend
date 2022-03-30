import React, { Component } from 'react';
import './Counter.css'

class Counter extends Component {

    //Define the initial stat in a constructor
    //state => counter = 0
    constructor() {
        // Super needs to be called first
        super();
        this.state = {
            counter: 0
        }

        // bind the method with class
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this)
    }

    reset() {
        this.setState({
            counter: 0
        })
    }

    render() {
        return (
        <div className="App">
            <CounterButton incrementBy={1} incrementMethod={this.increment} decrementMethod={this.decrement}/> 
            <CounterButton incrementBy={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <CounterButton incrementBy={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
            <span className="count">{this.state.counter}</span>
            <div>
                <button className="reset" onClick={ () => {this.reset()}}>Reset</button>
            </div>
            
        </div>
    );
  }

  increment(incrementBy) { // Update state => counter++

        this.setState(
            (prevState) => {
            return {counter: prevState.counter + incrementBy}
        })
    }

    decrement(incrementBy) { // Update state => counter++

        this.setState(
            (prevState) => {
            return {counter: prevState.counter - incrementBy}
        })
    }
}

class CounterButton extends Component {

    //Define the initial stat in a constructor
    //state => counter = 0
    constructor() {
        // Super needs to be called first
        super();
        this.state = {
            counter: 0
        }

        // bind the method with class
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);

    }

    render() {
        return (
            <div className='counter'>
                <button onClick={ () => {this.increment(this.props.incrementBy)}}>+{this.props.incrementBy}</button>
                <button onClick={ () => {this.decrement(this.props.incrementBy)}}>-{this.props.incrementBy}</button>
            </div>
        );
    }

    increment(incrementType) { 
        // calls increment method on parent
        this.props.incrementMethod(incrementType);
    } 

    decrement(decrementType) { 
        // calls increment method on parent
        this.props.decrementMethod(decrementType);
    } 
}

// defining default values
CounterButton.defaultProps = {
    incrementBy : 1
}


export default Counter;