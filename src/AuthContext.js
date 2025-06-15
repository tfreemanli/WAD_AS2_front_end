import { createContext, useState, useEffect } from 'react';
import myConst from "./components/MyConst";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 初始化时检查本地存储的token和用户数据
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // 登录函数 - 现在处理token和获取用户数据
  const myLogin = async (token) => {
    try {
      // 存储token
      setToken(token);
      localStorage.setItem('token', token);

      // 使用token获取用户信息
      const userData = await fetchUserData(token);

      // 存储用户信息
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      //
    } catch (error) {
      console.error('Login failed:', error);
      myLogout();
      throw error;
    }
  };

  // 获取用户数据的函数
  const fetchUserData = async (token) => {
    const response = await fetch(myConst.BaseURL + '/api/profile/', {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    return await response.json();
  };

  // 登出函数
  const myLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      myLogin,
      myLogout,
      isAuthenticated: !!token
    }}>
      {children}
    </AuthContext.Provider>
  );
};