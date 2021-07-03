import * as React from "react";

const authStorage = localStorage;

const auth = {
  user: null,

  init() {
    this.user = null;
  },

  login(user, token) {
    this.setToken(token);
    this.setUser(user);
  },

  logout() {
    this.user = null;
    // clear localStorage
    authStorage.clear();
  },

  isAuthed() {
    const token = this.getToken();

    return !!token;
  },

  getUser() {
    return this.user;
  },

  setUser(user) {
    const newUser = { ...user };
    this.user = newUser;
  },

  getToken() {
    return this.loadParams("JWT");
  },

  setToken(token) {
    this.saveParams("JWT", token);
  },

  /**
   * load param from local storage
   */
  loadParams(paramName, isObject) {
    const parString = authStorage.getItem(paramName);

    if (isObject) {
      try {
        return JSON.parse(parString || "");
      } catch (e) {
        return null;
      }
    } else {
      return parString;
    }
  },

  /**
   * save params into storage
   * @param paramName
   * @param param
   */
  saveParams(paramName, param) {
    if (typeof param === "string") {
      authStorage.setItem(paramName, param);
    } else {
      authStorage.setItem(paramName, JSON.stringify(param));
    }
  },

  /**
   * remove params from storage
   * @param paramName
   */
  clearParams(paramName) {
    authStorage.removeItem(paramName);
  },
};

const AuthContext = React.createContext(auth);

const withAuth = (Component) => (props) => (
  <AuthContext.Consumer>
    {(auth) => <Component auth={auth} {...props} />}
  </AuthContext.Consumer>
);

export { auth, AuthContext, withAuth };

export function useAuth() {
  return { auth };
}
