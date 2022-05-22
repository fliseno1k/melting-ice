import React, { createContext, useState, useEffect, useContext } from 'react';
import { useMutation } from 'react-query';
import { axiosInstance } from '../services/config';
import { AuthService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loadingComplete, setLoadingComplete] = useState(false);

    const completeLoading = () => {
        setTimeout(() => {
            setLoadingComplete(true);
        }, 3000);
    };

    const loginQuery = useMutation(AuthService.login, {
        onSuccess: (data) => {
            const { accessToken } = data.data;
            localStorage.setItem("jwt_access", accessToken);
            setAuthenticated(true);
        },
        onError: (error) => {
            setAuthenticated(false);
        },
    });

    const refreshQuery = useMutation(AuthService.refreshRequest, {
        onSuccess: (data) => {
            const { accessToken } = data.data;
            localStorage.setItem("jwt_access", accessToken);
            setAuthenticated(true);
        },
        onError: (error) => {
            setAuthenticated(false);
        },
        onSettled: completeLoading,
    });

    const checkAuthorizationQuery = useMutation(AuthService.checkAuthorization, {
        onSuccess: (data) => {
            console.log(data);
            setAuthenticated(true);
        },
        onError: (error) => {
            setAuthenticated(false);
        },
        onSettled: completeLoading,
    });

    const login = async (password) => {
        return await loginQuery.mutateAsync(password);
    };

    useEffect(() => {
        if (!authenticated) {
            checkAuthorizationQuery.mutateAsync();
        }

        axiosInstance.interceptors.request.use(config => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('jwt_access')}`;
            return config;
        });

        axiosInstance.interceptors.response.use(
            (response) => response, 
            async (error) => {
                if (error?.response?.status === 401) {
                    setAuthenticated(false);
                }

                return Promise.reject(error);
            }
        );
    }, []);

    const isSuccess = loginQuery.isSuccess || refreshQuery.isSuccess || checkAuthorizationQuery.isSuccess;
    const isAuthenticated = authenticated;
    const isLoading = loginQuery.isLoading;

    const sessionChecking = 
        checkAuthorizationQuery.isLoading || 
        refreshQuery.isLoading || 
        !checkAuthorizationQuery.data || 
        !loadingComplete;
    
    return (
        <AuthContext.Provider value={{
            isSuccess,
            isAuthenticated,
            isLoading,
            login, 
        }}>
            {sessionChecking ? (
                <div className="full-app-screen-container">
                    <div className="loader-2"></div>
                </div>
            ) : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};