import "./styles.css";
import React from "react";
import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";

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
  }

  render() {
    const { signedInUser } = this.props;
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <UserContext.Provider value={signedInUser}>
          <Toolbar changeTheme={this.toggleTheme} />
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}
