import React, { useState } from 'react';
import { InputNumber, Form, Button } from 'antd';
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

  let initialValues = { timestampList: [1, 3, 7] };

  const checkTimestampHOF = (index: number) => {
    return (_: any, value: number) => {
      const values = form.getFieldValue('timestampList');
      if (index >= 1) {
        if (values[index] <= values[index - 1]) {
          return Promise.reject(
            formatMessage({
              id: 'anki.decks.timestamp.form.days.require.ascend',
            }),
          );
        }
      }
      return Promise.resolve();
    };
  };

  // const checkTimestamp = (_: any, value: number) => {
  //   const timestampList = form.getFieldValue('timestampList');
  //   const wrongTimestamp = timestampList.find(
  //     (value: number, index: number) =>
  //       index >= 1 && value <= timestampList[index - 1],
  //   );
  //   if (wrongTimestamp) {
  //     return Promise.reject(
  //       formatMessage({ id: 'anki.decks.timestamp.form.days.require.ascend' }),
  //     );
  //   }
  //   return Promise.resolve();
  // };

  const handleValuesChange = () => {
    form.validateFields();
  };

  const handleFieldsChange = () => {
    console.log('onFieldsChange');
    console.log('values: ', form.getFieldsValue());
    console.log('errors: ', form.getFieldsError());
  };

  return (
    <Form
      form={form}
      name="timestampForm"
      layout="vertical"
      className={classNames(className, styles.form)}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
      onFieldsChange={handleFieldsChange}
    >
      <FormList name="timestampList">
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              <FormItem
                label={formatMessage({
                  id: 'anki.decks.timestamp.form.label.timestamps',
                })}
                className={classNames({ [styles.noItem]: !fields.length })}
              >
                {fields.map((field, index) => (
                  <div key={field.key} className={styles.timestamp}>
                    <FormItem
                      {...field}
                      noStyle
                      validateFirst
                      rules={[
                        {
                          required: true,
                          message: formatMessage({
                            id: 'anki.decks.timestamp.form.days.required',
                          }),
                        },
                        {
                          validator: checkTimestampHOF(index),
                        },
                      ]}
                    >
                      <InputNumber
                        min={1}
                        formatter={value =>
                          `${value} ${formatMessage({
                            id:
                              value === 1
                                ? 'anki.decks.timestamp.form.single.suffix'
                                : 'anki.decks.timestamp.form.suffix',
                          })}`
                        }
                        parser={(value = '') => +value.split(' ')[0]}
                      />
                    </FormItem>
                    <MinusCircleOutlined
                      className={styles.delete}
                      onClick={() => {
                        console.log('remove: ', field.name);
                        remove(field.name);
                      }}
                    />
                  </div>
                ))}
              </FormItem>
              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => {
                    const values: [] = form.getFieldValue('timestampList');
                    if (!values.length) {
                      add(1);
                    } else {
                      add(values[values.length - 1] + 1);
                    }
                  }}
                  className={styles.addBtn}
                  icon={<PlusOutlined />}
                >
                  {formatMessage({ id: 'anki.decks.timestamp.form.add' })}
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => add('The head item', 0)}
                  className={styles.addBtn}
                  icon={<PlusOutlined />}
                >
                  {formatMessage({ id: 'anki.decks.timestamp.form.addAtHead' })}
                </Button>
              </FormItem>
            </>
          );
        }}
      </FormList>
    </Form>
  );
};

export default TimestampForm;
