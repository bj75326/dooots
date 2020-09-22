import { Button, Form } from 'antd';
import { ButtonProps } from 'antd/es/button';
import React from 'react';

interface LoginSubmitProps extends ButtonProps {
  className?: string;
}

const LoginSubmit: React.FC<LoginSubmitProps>;
