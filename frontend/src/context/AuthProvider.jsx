import React, { createContext, useRef, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { axiosInstance } from '../services/config';
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const loginQuery = useMutation(AuthService.login, {
        onSuccess: (data) => {
            const { accessToken, refreshToken } = data.data;
            localStorage.setItem("jwt", accessToken);
            localStorage.setItem("jwt_refresh", refreshToken);

            navigate("/gallery", { replace: true });
        }
    });

    const refreshQuery = useMutation(AuthService.refreshRequest, {
        onSuccess: (data) => {
            const { accessToken, refreshToken } = data.data;
            localStorage.setItem("jwt", accessToken);
            localStorage.setItem("jwt_refresh", refreshToken);
        },
        refetchInterval: 10000
    });

    const login = async (password) => {
        await loginQuery.mutateAsync(password);
    };

    useEffect(() => {
        axiosInstance.interceptors.request.use(config => {
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
    const isAuthenticated = isSuccess && !!localStorage.getItem("jwt");
    const isLoading = loginQuery.isLoading;

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;