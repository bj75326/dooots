import React, { useState } from 'react';
import { InputNumber, Radio, Form, Button } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useIntl } from 'umi';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

  const [type, setType]: ['days' | 'date', any] = useState('days');

  const handleValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
    console.log(allValues);
  };

  return (
    <Form
      form={form}
      name="timestampForm"
      layout="vertical"
      className={className}
      onValuesChange={handleValuesChange}
    >
      <FormItem
        name="timestampType"
        label={formatMessage({ id: 'anki.timestamp.form.label.type' })}
        initialValue={type}
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
                <>
                  <FormItem {...field} noStyle>
                    <InputNumber style={{}} />
                  </FormItem>
                  <MinusCircleOutlined
                    //className={}
                    onClick={() => remove(field.name)}
                  />
                </>
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
