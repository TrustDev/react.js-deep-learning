import "./styles.css";
import React from 'react';

const ThemeContext = React.createContext('light');

export default function App() {
  return (
    <ThemeContext.Provider value="dark">
      <div className="App">
        <Toolbar/>
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  return (
    <div>
      <ThemedButton/>
    </div>
  )
}

class ThemedButton extends React.Component{
  static contextType = ThemeContext;
  render() {
    return (
      <div>
        <button theme={this.context}/>
        <div>{this.context}</div>
      </div>
    )
  }
}