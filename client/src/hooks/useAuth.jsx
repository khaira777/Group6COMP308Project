import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  currentUser,
  isLoggedIn,
  TOKEN_KEY,
  USER_KEY,
  USER_MUTATION,
  USER_QUERY,
} from "../graphql/user";

function useAuth() {
  // States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Queries
  const { data: loginData } = useQuery(USER_QUERY.IS_LOGGED_IN);
  const { data: currentUserData } = useQuery(USER_QUERY.CURRENT_USER);

  // Mutations
  const [loginMutation] = useMutation(USER_MUTATION.LOGIN, {
    onCompleted: (data) => {
      setLoading(false);
      if (data?.login) {
        const { token, ...userInfo } = data.login;
        setLocalAuthState(token, userInfo);
      }
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false);
      logout();
    },
  });

  const [registerMutation] = useMutation(USER_MUTATION.REGISTER, {
    onCompleted: (data) => {
      setLoading(false);
      if (data?.register) {
        const { token, ...userInfo } = data.register;
        setLocalAuthState(token, userInfo);
      }
    },
    onError: (err) => {
      setError(err.message);
      setLoading(false);
      logout();
    },
  });

  // useEffects
  useEffect(() => {
    loginData?.isLoggedIn ? setIsAuth(true) : setIsAuth(false);
  }, [loginData?.isLoggedIn]);

  useEffect(() => {
    currentUserData?.currentUser
      ? setUser(currentUserData.currentUser)
      : setUser(null);
  }, [currentUserData?.currentUser]);

  // Functions
  const setLocalAuthState = (token, userInfo) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
    isLoggedIn(true);
    currentUser(userInfo);
  };

  const login = async (credentials) => {
    setLoading(true);

    await loginMutation({
      variables: {
        ...credentials,
      },
    });
  };

  const register = async (credentials) => {
    setLoading(true);

    await registerMutation({
      variables: {
        ...credentials,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    isLoggedIn(false);
    currentUser(null);
  };

  return { login, register, logout, loading, error, isAuth, user };
}

export default useAuth;
