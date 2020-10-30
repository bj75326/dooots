import React, { useState } from 'react';
import { InputNumber, Radio, Form, Button, DatePicker } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useIntl } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import moment from 'moment';

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

  let initialValues = { timestampList: [1, 3, 7] };
  // const handleValuesChange = (changedValues, allValues) => {
  //   console.log(changedValues);
  //   console.log(allValues);
  //   const type: 'date' | 'days' | undefined = changedValues.timestampType;
  //   const timestampList = allValues.timestampList || [];
  //   if (type) {
  //     setType(type);
  //     if (type === 'date') {
  //       initialValues = {
  //         timestampList: timestampList.map((timestamp: number)=>moment().add(timestamp, 'days')),
  //       };
  //     } else if (type==='days') {
  //       initialValues = {
  //         timestampList: timestampList.map((timestamp: moment.Moment)=>);
  //       };
  //     }
  //   }
  // };

  return (
    <Form
      form={form}
      name="timestampForm"
      layout="vertical"
      className={classNames(className, styles.form)}
      initialValues={initialValues}
    >
      <FormList name="timestampList">
        {(fields, { add, remove }, { errors }) => (
          <>
            <FormItem
              label={formatMessage({
                id: 'anki.decks.timestamp.form.label.timestamps',
              })}
            >
              {fields.map((field, index) => (
                <div key={field.key}>
                  <FormItem {...field} noStyle>
                    <InputNumber />
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
                {formatMessage({ id: 'anki.decks.timestamp.form.add' })}
              </Button>
            </FormItem>
            <FormItem>
              <Button
                type="dashed"
                onClick={() => add('The head item', 0)}
                style={{}}
                icon={<PlusOutlined />}
              >
                {formatMessage({ id: 'anki.decks.timestamp.form.addAtHead' })}
              </Button>
            </FormItem>
          </>
        )}
      </FormList>
    </Form>
  );
};

export default TimestampForm;
