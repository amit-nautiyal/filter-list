import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state ={
      users: ['Amit', 'Aaron', 'Brain', 'Cills', 'James', 'Kei', 'Toby', 'Tim'],
      input: '',
      showList: false
    }
    this.onChangeHandler = this.onChangeHandler.bind(this); // On Input box
    this.onFocusHandler = this.onFocusHandler.bind(this); // On Input box
    this.onKeyDownHandler = this.onKeyDownHandler.bind(this); // On Input box
    this.listItemClcikHandler = this.listItemClcikHandler.bind(this); // On List Item

    this.onClickContainerHandler = this.onClickContainerHandler.bind(this); // On input and list parent container
    this.setWrapperRef = this.setWrapperRef.bind(this); // On input and list parent container
    this.handleClickOutside = this.handleClickOutside.bind(this); // On input and list parent container
  }

  /* 'componentDidMount', 'componentWillUnmount', 'setWrapperRef' and 'handleClickOutside' checks if the click happens outside the assign div
  */
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({
        showList: false
      })
    }
  }

  // This function updates the list based in text entered
  onChangeHandler(e) {
    this.setState({
      input: e.target.value,
    })
  }

  // This function shows the list container when user moves to required inputbox. Usefull even when user tabs.
  onFocusHandler(e) {
    this.setState({
      showList: true
    })
  }

  // This function hide and show list based on input clicked or not
  onClickContainerHandler(e) {
    this.setState({
      showList: !this.state.showList
    })
  }

  // This function checks if the `tab` is pressed and thus hide the list
  onKeyDownHandler(e) {
    if (e.keyCode === 9) {
      this.setState({
        showList: false
      })
    }
  }

  // This function sets the selected list item to the input value
  listItemClcikHandler(e) {
    this.setState({
      input: e.target.innerHTML,
      showList: false
    })
  }

  render() {
    const list = this.state.users
        .filter(d => this.state.input === '' || (d.toLowerCase().includes(this.state.input.toLowerCase())))
        .map((d, index) => <li key={index} onClick={this.listItemClcikHandler.bind(this)}>{d}</li>);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Filter List</h1>
        </header>
        <section className='form-layout'>
          <div className='form-field'>
            <input placeholder='dummy inputbox' type="text" />
          </div>
          <div className='form-field' ref={this.setWrapperRef} onClick={this.onClickContainerHandler.bind(this)}>
            <input
              placeholder='input with filter list'
              value={this.state.input}
              type="text"
              onChange={this.onChangeHandler.bind(this)}
              onFocus={this.onFocusHandler.bind(this)}
              onKeyDown={this.onKeyDownHandler.bind(this)}/>
            {this.state.showList && <ul className='list-container'>{list}</ul>}
          </div>
          <div className='form-field'>
            <input placeholder='dummy inputbox' type="text" />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
