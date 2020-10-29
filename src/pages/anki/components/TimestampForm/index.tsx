import React, { useState } from 'react';
import { InputNumber, Radio, Form, Button, DatePicker } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useIntl } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import styles from './index.less';

const FormItem = Form.Item;
const FormList = Form.List;

interface TimestampFormProps {
  form: FormInstance;
  className?: string;
}

const TimestampForm: React.FC<TimestampFormProps> = props => {
  const { form, className } = props;

  const { formatMessage } = useIntl();

  const options = [
    {
      label: formatMessage({ id: 'anki.timestamp.form.label.type.days' }),
      value: 'days',
    },
    {
      label: formatMessage({ id: 'anki.timestamp.form.label.type.date' }),
      value: 'date',
    },
  ];

  const [type, setType]: ['days' | 'date', any] = useState('date');

  const handleValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
    console.log(allValues);
    // if (changedValues.timestampList) {
    //   setType(changedValues.timestampList);
    // }
  };

  return (
    <Form
      form={form}
      name="timestampForm"
      layout="vertical"
      className={classNames(className, styles.form)}
      //initialValues={{timestampList: [1, 2,3]}}
      onValuesChange={handleValuesChange}
    >
      <FormItem
        name="timestampType"
        label={formatMessage({ id: 'anki.timestamp.form.label.type' })}
        initialValue="days"
      >
        <Radio.Group options={options} optionType="button" />
      </FormItem>
      <FormList name="timestampList">
        {(fields, { add, remove }, { errors }) => (
          <>
            <FormItem
              label={formatMessage({
                id: 'anki.timestamp.form.label.timestamps',
              })}
            >
              {fields.map((field, index) => (
                <div key={field.key}>
                  <FormItem {...field} noStyle>
                    <DatePicker />
                  </FormItem>
                  <MinusCircleOutlined
                    //className={}
                    onClick={() => remove(field.name)}
                  />
                </div>
              ))}
            </FormItem>
            <FormItem>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{}}
                icon={<PlusOutlined />}
              >
                {formatMessage({ id: 'anki.timestamp.form.add' })}
              </Button>
            </FormItem>
            <FormItem>
              <Button
                type="dashed"
                onClick={() => add('The head item', 0)}
                style={{}}
                icon={<PlusOutlined />}
              >
                {formatMessage({ id: 'anki.timestamp.form.addAtHead' })}
              </Button>
            </FormItem>
          </>
        )}
      </FormList>
    </Form>
  );
};

export default TimestampForm;
