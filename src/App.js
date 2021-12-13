import "./styles.css";
import React, { Profiler } from "react";
import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";
import Table from "./table";
import WordAdder from "./word-adder";

const UserContext = React.createContext({
  name: "Guest"
});

function Toolbar(props) {
  return <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>;
}

function Layout() {
  return (
    <div>
      <Content />
    </div>
  );
}

function Content() {
  return (
    <ThemeContext.Consumer>
      {(theme) => (
        <UserContext.Consumer>
          {(user) => <ProfilePage user={user} theme={theme} />}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

function ProfilePage() {
  return <div></div>;
}

const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

function logProps(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log("old props:", prevProps);
      console.log("new props:", this.props);
    }

    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />;
  });
}

const Button = (props) => {
  const { kind, ...other } = props;
  const className = kind === "primary" ? "PrimaryButton" : "SecondaryButton";
  return <button className={className} {...other} />;
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTheme = () => {
      console.log(this.state.theme);
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark
      }));
    };
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme
    };
    this.inputRef = React.createRef();
  }

  callback = (
    id, // the "id" prop of the Profiler tree that has just committed
    phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
    actualDuration, // time spent rendering the committed update
    baseDuration, // estimated time to render the entire subtree without memoization
    startTime, // when React began rendering this update
    commitTime, // when React committed this update
    interactions // the Set of interactions belonging to this update
  ) => {
    console.log(id, phase, actualDuration, baseDuration);
  };

  render() {
    const { signedInUser } = this.props;
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <UserContext.Provider value={signedInUser}>
          <Profiler id="test" onRender={this.callback}>
            <Toolbar changeTheme={this.toggleTheme} />
          </Profiler>
          <Layout />
          <FancyButton ref={this.inputRef}>Click Me!</FancyButton>
          <Table />
          <Button>Test</Button>
          <WordAdder />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
