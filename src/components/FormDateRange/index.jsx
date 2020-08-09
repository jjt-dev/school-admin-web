import React from 'react'
import { Form, DatePicker } from 'antd'
import moment from 'moment'
import { timeFormat, hourFormat } from 'src/utils/const'

const { RangePicker } = DatePicker

const FormDateRange = ({ label, name, defaultHours }) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ type: 'array', required: true, message: '请选择时间' }]}
    >
      <RangePicker
        showTime={{
          format: hourFormat,
          defaultValue: [
            moment(defaultHours[0], hourFormat),
            moment(defaultHours[1], hourFormat),
          ],
        }}
        format={timeFormat}
      />
    </Form.Item>
  )
}

export default FormDateRange
