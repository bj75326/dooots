import { Form, Input } from 'antd';
import React, { useEffect } from 'react';
import ItemMap from './map';
import { FormItemProps } from 'antd/es/form/FormItem';

import LoginContext, { LoginContextProps } from './LoginContext';

export interface LoginItemProps extends Partial<FormItemProps> {
  name?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
  updateActive?: LoginContextProps['updateActive'];
  customProps?: { [key: string]: unknown };
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormItem = Form.Item;

const getFormItemOptions = ({
  onChange,
  defaultValue,
  customProps = {},
  rules,
}: LoginItemProps) => {
  const options: {
    rules?: LoginItemProps['rules'];
    onChange?: LoginItemProps['onChange'];
    initialValue?: LoginItemProps['initialValue'];
  } = {
    rules: rules || (customProps.rules as LoginItemProps['rules']),
  };
  if (onChange) {
    options.onChange = onChange;
  }
  if (defaultValue) {
    options.initialValue = defaultValue;
  }
  return options;
};

const LoginItem: React.FC<LoginItemProps> = props => {
  const {
    onChange,
    customProps,
    defaultValue,
    rules,
    name,
    type,
    updateActive,
    // 保留 placeholder, style 给 restProps
    ...restProps
  } = props;

  useEffect(() => {});

  if (!name) return null;

  const options = getFormItemOptions(props);
  const otherProps = restProps || {};

  return (
    <FormItem name={name} {...options}>
      <Input {...customProps} {...otherProps} />
    </FormItem>
  );
};

const LoginItems: Partial<LoginItemProps> = {};

Object.keys(ItemMap);
