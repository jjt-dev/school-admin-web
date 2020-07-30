import React, { useEffect, useState } from 'react'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { formItemLayout, EntityStatus } from 'src/utils/const'
import {
  Form,
  Input,
  Button,
  DatePicker,
  Checkbox,
  Row,
  Col,
  InputNumber,
  Radio,
  Select,
} from 'antd'
import * as examAction from 'src/actions/exam'
import { updateExam, getExamItemValue } from '../helper'
import moment from 'moment'
import api from 'src/utils/api'

const { TextArea } = Input
const { RangePicker } = DatePicker
const { Option } = Select

const Exam = ({ match, history, form }) => {
  const dispatch = useDispatch()
  const [itemsValid, setItemsValid] = useState(true)
  const { examItemList, examLevelList, examInEdit } = useSelector(
    (state) => state.exam
  )
  const examId = match.params.id
  const isEdit = !!examId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const { getFieldDecorator } = form

  useEffect(() => {
    const fetchData = async () => {
      let examItemList = await api.get(`/examination/examineItemList`)
      let examLevelList = await api.get(`/examination/levelList`)
      if (examId) {
        const exam = await api.get(`/examination/item?id=${examId}`)
        dispatch(examAction.getExam(exam))

        exam.itemes.forEach((item) => {
          const index = examItemList.findIndex((i) => i.id === item.examItemId)
          if (index > -1) {
            examItemList[index].checked = true
            examItemList[index].ratio = item.ratio * 100
          }
        })
        exam.levelsCanSign.split('').forEach((levelId) => {
          const index = examLevelList.findIndex(
            (level) => level.id === Number(levelId)
          )
          if (index > -1) {
            examLevelList[index].checked = true
          }
        })
      }
      dispatch(examAction.getExamItemList(examItemList))
      dispatch(examAction.getExamLevelList(examLevelList))
    }
    fetchData()
  }, [dispatch, examId])

  const handleItemRatioChange = (itemId, ratio) => {
    validateItems()
    dispatch(examAction.updateItemRatio({ itemId, ratio }))
  }

  const selectItems = (levelId, selectedItems) => {
    dispatch(examAction.selectItems({ levelId, selectedItems }))
  }

  const handleLevelCheckChange = (levelId, e) => {
    dispatch(
      examAction.updateLevelCheck({ levelId, checked: e.target.checked })
    )
  }

  const validateItems = () => {
    let result
    const selectedItems = examItemList.filter((item) => item.checked)
    if (selectedItems.length === 0) {
      result = false
    } else {
      let totalRatio = 0
      selectedItems.map((item) => (totalRatio += item.ratio ?? 0))
      result = totalRatio === 100
    }
    setItemsValid(result)
    return result
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const itemsValid = validateItems()
    form.validateFields(async (err, values) => {
      if (!err && itemsValid) {
        updateExam(history, status, examId, values, examItemList, examLevelList)
      }
    })
  }

  const checkedLevels = examLevelList.filter((item) => item.checked)

  // 如果编辑考试，需要等到获取到该考试后，再渲染考试。这样可以解决form初始值的问题
  if (isEdit && !examInEdit) {
    return null
  }

  return (
    <div className="page exam">
      <div className="exam__edit-title">{status}考试</div>
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        className="exam__edit-form"
      >
        <Form.Item label="名称">
          {getFieldDecorator('title', {
            initialValue: isEdit ? examInEdit?.title : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入考试名称" />)}
        </Form.Item>
        <Form.Item label="地址">
          {getFieldDecorator('address', {
            initialValue: isEdit ? examInEdit?.address : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入考试地址" />)}
        </Form.Item>
        <Form.Item label="考试时间">
          {getFieldDecorator('examTime', {
            initialValue: isEdit
              ? [
                  moment(examInEdit?.examStartTime),
                  moment(examInEdit?.examEndTime),
                ]
              : '',
            rules: [{ required: true }],
          })(
            <RangePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: [
                  moment('09:00', 'HH:mm'),
                  moment('18:00', 'HH:mm'),
                ],
              }}
              format="YYYY-MM-DD HH:mm"
            />
          )}
        </Form.Item>
        <Form.Item label="报名时间">
          {getFieldDecorator('signTime', {
            initialValue: isEdit
              ? [
                  moment(examInEdit?.signStartTime),
                  moment(examInEdit?.signEndTime),
                ]
              : '',
            rules: [{ required: true }],
          })(
            <RangePicker
              showTime={{
                format: 'HH:mm',
                defaultValue: [
                  moment('00:00', 'HH:mm'),
                  moment('23:59', 'HH:mm'),
                ],
              }}
              format="YYYY-MM-DD HH:mm"
            />
          )}
        </Form.Item>
        <Form.Item label="级别范围" className="exam__edit-form--level">
          {getFieldDecorator('examLevels', {
            initialValue: isEdit ? examInEdit?.levelsCanSign.split(',') : '',
            validateTrigger: 'onChange',
            rules: [{ required: true, message: '请选择级别范围' }],
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              {examLevelList &&
                examLevelList.map((level) => (
                  <Row key={level.id}>
                    <Col>
                      <Checkbox
                        value={String(level.id)}
                        onChange={(e) => handleLevelCheckChange(level.id, e)}
                      >{`${level.name} (${level.alias})`}</Checkbox>
                      <Input
                        disabled
                        value={level.price}
                        addonAfter={<span>元</span>}
                      />
                    </Col>
                  </Row>
                ))}
            </Checkbox.Group>
          )}
        </Form.Item>
        {checkedLevels.map((level) => (
          <LevelExamItems
            key={level.id}
            getFieldDecorator={getFieldDecorator}
            level={level}
            examItemList={examItemList}
            selectItems={selectItems}
          />
        ))}
        <Form.Item label="启用">
          {getFieldDecorator('isEnable', {
            initialValue: isEdit ? examInEdit?.isEnable : false,
            rules: [{ required: true }],
          })(
            <Radio.Group>
              <Radio value={true}>是</Radio>
              <Radio value={false}>否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="描述">
          {getFieldDecorator('note', {
            initialValue: isEdit ? examInEdit?.note : '',
          })(<TextArea rows={2} placeholder="请输入描述" />)}
        </Form.Item>
        <Form.Item className="exam__edit-form--btns">
          <Button
            className="edit-cancel-btn"
            onClick={() => history.push('/exams')}
          >
            取消
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Form.create()(Exam)

const LevelExamItems = ({
  getFieldDecorator,
  isEdit,
  level,
  examItemList,
  selectItems,
}) => {
  const selectedItems = level.items || []
  return (
    <Form.Item label={`${level.name}考项`} className="exam__edit-form--item">
      {getFieldDecorator(`examItems${level.id}`, {
        rules: [{ required: true }],
      })(
        <>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder={`请选择${level.name}的考项`}
            defaultValue={[]}
            onChange={(value) => selectItems(level.id, value)}
          >
            {examItemList.map((item) => {
              return (
                <Option
                  key={`all-items-${level.id}-${item.id}`}
                  value={item.id}
                >
                  {item.name}
                </Option>
              )
            })}
          </Select>
          {selectedItems.map((itemId, index) => {
            const item = examItemList.find((item) => item.id === itemId)
            return (
              <Row
                key={`selected-items-${level.id}-${item.id}`}
                className={`selected-items-${index}`}
              >
                <Col>
                  <span>{item.name}</span>
                  <InputNumber
                    // defaultValue={getExamItemValue(examInEdit, item)}
                    min={0}
                    max={100}
                    formatter={(value) => `${value}%`}
                    parser={(value) => value.replace('%', '')}
                    // onChange={(e) => handleItemRatioChange(item.id, e)}
                  />
                </Col>
              </Row>
            )
          })}
        </>
      )}
    </Form.Item>
  )
}
