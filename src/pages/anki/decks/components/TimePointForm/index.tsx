import React, { useState } from 'react';
import { InputNumber, Form, Button } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useIntl } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import styles from './index.less';

const FormItem = Form.Item;
const FormList = Form.List;

interface TimePointFormProps {
  form: FormInstance;
  className?: string;
  changeTimePoints: (timePoints: number[]) => void;
}

const TimePointForm: React.FC<TimePointFormProps> = props => {
  const { form, className } = props;

  const { formatMessage } = useIntl();

  let initialValues = { timePointList: [1, 2, 6, 31] };

  const checkTimePointHOF = (index: number) => {
    return (_: any, value: number) => {
      const values = form.getFieldValue('timePointList');
      if (index >= 1) {
        if (values[index] <= values[index - 1]) {
          return Promise.reject(
            formatMessage({
              id: 'anki.decks.timePoint.form.days.require.ascend',
            }),
          );
        }
      }
      return Promise.resolve();
    };
  };

  const checkTimePoints = (_: any, values: []) => {
    console.log('values', values);
    let meetRequired = true;
    values.forEach(value => {
      if (!Number.isInteger(value)) {
        meetRequired = false;
      }
    });
    if (!meetRequired) {
      return Promise.reject(
        formatMessage({ id: 'anki.decks.timePoint.form.days.required' }),
      );
    }
    const wrongTimePoint = values.find(
      (value: number, index: number) =>
        index >= 1 && value <= values[index - 1],
    );
    if (wrongTimePoint) {
      return Promise.reject(
        formatMessage({ id: 'anki.decks.timePoint.form.days.require.ascend' }),
      );
    }
  };

  // const checkTimePoint = (_: any, value: number) => {
  //   const timePointList = form.getFieldValue('timePointList');
  //   const wrongTimePoint = timePointList.find(
  //     (value: number, index: number) =>
  //       index >= 1 && value <= timePointList[index - 1],
  //   );
  //   if (wrongTimePoint) {
  //     return Promise.reject(
  //       formatMessage({ id: 'anki.decks.timePoint.form.days.require.ascend' }),
  //     );
  //   }
  //   return Promise.resolve();
  // };

  const handleValuesChange = () => {
    console.log('onValuesChange');
    form.validateFields(['timePointList']);
    //form.validateFields();
    // if (!removeWillNotValidateFields) {
    //   form.validateFields();
    // }
    // if (removeWillNotValidateFields) {
    //   removeWillNotValidateFields = false;
    // }
  };

  // const handleFieldsChange = () => {
  //   console.log('onFieldsChange');
  //   console.log('values: ', form.getFieldsValue());
  //   console.log('errors: ', form.getFieldsError());
  //   console.log('ing: ', form.isFieldValidating(['timePointList', 0]));
  //   console.log('ing: ', form.isFieldValidating(['timePointList', 1]));
  //   console.log('1: ', form.getFieldValue(['timePointList', 1]));
  // };

  //let removeWillNotValidateFields = false;

  return (
    <Form
      form={form}
      name="timePointForm"
      layout="vertical"
      className={classNames(className, styles.form)}
      initialValues={initialValues}
      onValuesChange={handleValuesChange}
      // onFieldsChange={handleFieldsChange}
    >
      <FormList
        name="timePointList"
        rules={[
          {
            validator: checkTimePoints,
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              <FormItem
                label={formatMessage({
                  id: 'anki.decks.timePoint.form.label.timePoints',
                })}
                className={styles.item}
              >
                {fields.map((field, index) => (
                  <div key={field.key} className={styles.timePoint}>
                    <FormItem
                      {...field}
                      noStyle
                      // validateFirst
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: formatMessage({
                      //       id: 'anki.decks.timePoint.form.days.required',
                      //     }),
                      //   },
                      //   {
                      //     validator: checkTimePointHOF(index),
                      //   },
                      // ]}
                    >
                      <InputNumber
                        min={1}
                        formatter={value =>
                          `${value} ${formatMessage({
                            id:
                              value === 1
                                ? 'anki.decks.timePoint.form.single.suffix'
                                : 'anki.decks.timePoint.form.suffix',
                          })}`
                        }
                        parser={(value = '') => +value.split(' ')[0]}
                        //size="small"
                      />
                    </FormItem>
                    <MinusCircleOutlined
                      className={styles.delete}
                      onClick={() => {
                        //removeWillNotValidateFields = true;
                        remove(field.name);
                      }}
                    />
                  </div>
                ))}
              </FormItem>
              <div
                className={classNames(
                  { [styles.noItem]: fields.length <= 0 },
                  styles.errorList,
                )}
              >
                <Form.ErrorList errors={errors} />
              </div>
              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => {
                    const values: [] = form.getFieldValue('timePointList');
                    if (!values.length) {
                      add(1);
                    } else {
                      add(values[values.length - 1] + 1);
                    }
                  }}
                  className={styles.addBtn}
                  icon={<PlusOutlined />}
                >
                  {formatMessage({ id: 'anki.decks.timePoint.form.add' })}
                </Button>
              </FormItem>
              <FormItem>
                <Button
                  type="dashed"
                  onClick={() => add(1, 0)}
                  className={styles.addBtn}
                  icon={<PlusOutlined />}
                >
                  {formatMessage({ id: 'anki.decks.timePoint.form.addAtHead' })}
                </Button>
              </FormItem>
            </>
          );
        }}
      </FormList>
    </Form>
  );
};

export default TimePointForm;
