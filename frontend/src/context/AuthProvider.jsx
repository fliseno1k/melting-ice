import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import { axiosInstance } from '../services/config';
import { AuthService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); 

    const loginQuery = useMutation(AuthService.login, {
        onSuccess: (data) => {
            const { accessToken } = data.data;
            localStorage.setItem("jwt_access", accessToken);
            setToken(accessToken);
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const refreshQuery = useMutation(AuthService.refreshRequest, {
        onSuccess: (data) => {
            const { accessToken } = data.data;
            localStorage.setItem("jwt_access", accessToken);
        },
        onError: (error) => {
            console.log(error);;
        }
    });

    const login = async (password) => {
        return await loginQuery.mutateAsync(password);
    };

    useEffect(() => {
        axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('jwt_access')}`;
            return config;
        });

        axiosInstance.interceptors.response.use(
            (response) => response, 
            async (error) => {
                return Promise.reject(error);
            }
        );

    }, []);

    const isSuccess = loginQuery.isSuccess || refreshQuery.isSuccess;
    const isAuthenticated = isSuccess && token;
    const isLoading = loginQuery.isLoading;

    return (
        <AuthContext.Provider value={{
            isSuccess,
            isAuthenticated,
            isLoading,
            login, 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};