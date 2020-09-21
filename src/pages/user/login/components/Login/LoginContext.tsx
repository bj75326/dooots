import React, { createContext } from 'react';

export interface LoginContextProps {
  updateActive?: (activeItem: { [key: string]: string } | string) => void;
}

const LoginContext: React.Context<LoginContextProps> = createContext({});

export default LoginContext;
