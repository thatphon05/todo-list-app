import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, setUserProfile, removeUserProfile} from "../utils/localStorage.util.js";

const AuthContext = createContext('');

const AuthContextProvider = ({ children }) => {

  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    let userProfile = getUserProfile();
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  });

  const login = async (payload) => {
    const { status, data } = await axios.post('http://localhost:8080/auth/signin', payload, {
      withCredentials: true,
    });

    if (status === 200) {
      setUserProfile(data);
      setUser(data);
      navigate("/");
    } else {
      return { status, data }
    }
  }

  const logout = async () => {
    const { status, data } = await axios.post('http://localhost:8080/auth/signout', {}, {
      withCredentials: true,
    });

    if (status === 200) {
      removeUserProfile();
      setUser(null)
      navigate('/login')
    } else {
      return { status, data }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.node,
}

export { AuthContext, AuthContextProvider }
