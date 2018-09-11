import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state ={
      users: ['Amit', 'Aaron', 'Brain', 'Cills', 'James', 'Kei', 'Toby', 'Tim'],
      input: '',
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler = (e) => {
    this.setState({
      input: e.target.value,
    })
  }
  render() {
    const list = this.state.users
        .filter(d => this.state.input === '' || d.includes(this.state.input))
        .map((d, index) => <li key={index}>{d}</li>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Filter List</h1>
        </header>
        <section className='form-layout'>
          <div className='form-field'>
            <input value={this.state.input} className='select-list-input' type="text" onChange={this.onChangeHandler.bind(this)}/>
            <ul className='list-container'>{list}</ul>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
