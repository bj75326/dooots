import React from 'react';
import { InputNumber, Radio, Form } from 'antd';
import { FormInstance } from 'antd/es/form';
import { useIntl } from 'umi';

const FormItem = Form.Item;
const FormList = Form.List;

interface TimestampFormProps {
  form: FormInstance;
  className?: string;
}

const TimestampForm: React.FC<TimestampFormProps> = props => {
  const form = props.form;

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

  return (
    <Form form={form} name="timestamps">
      <FormItem
        name="timestampType"
        label={formatMessage({ id: 'anki.timestamp.form.label.type' })}
      >
        <Radio.Group options={options} optionType="button" />
      </FormItem>
      <FormList name="timestampList">
        {(fields, { add, remove }, { errors }) => <></>}
      </FormList>
    </Form>
  );
};
