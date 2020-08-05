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
  Radio,
} from 'antd'
import * as examAction from 'src/actions/exam'
import { updateExam } from '../helper'
import moment from 'moment'
import api from 'src/utils/api'
import { enforceLevelList, validateItems } from './helper'
import LevelExamItems from './LevelExamItems'
import { parseSearches } from 'src/utils/common'
import ImportExamModal from './ImportExamModal'

const { TextArea } = Input
const { RangePicker } = DatePicker

const Exam = ({ match, history, form, location }) => {
  const dispatch = useDispatch()
  const { isFormal } = parseSearches(location)
  const [showImportExamModal, setShowImportExamModal] = useState(false)
  const { examItemList, examLevelList, examInEdit } = useSelector(
    (state) => state.exam
  )
  const checkedLevels = examLevelList.filter((level) => level.items)
  const examId = match.params.id
  const isEdit = !!examId
  const status = isEdit ? EntityStatus.EDIT : EntityStatus.CREATE
  const { getFieldDecorator } = form
  const examType = isFormal === 'true' ? '正式' : '模拟'

  useEffect(() => {
    const fetchData = async () => {
      let examItemList = await api.get(`/examination/examineItemList`)
      let examLevelList = await api.get(`/examination/levelList`)
      if (examId) {
        const exam = await api.get(`/examination/item?id=${examId}`)
        dispatch(examAction.getExam(exam))
        examLevelList = enforceLevelList(exam, examLevelList)
      }
      dispatch(examAction.getExamItemList(examItemList))
      dispatch(examAction.getExamLevelList(examLevelList))
    }
    fetchData()
  }, [dispatch, examId])

  const updateItemRatio = (levelId, itemId, ratio) => {
    dispatch(examAction.updateItemRatio({ levelId, itemId, ratio }))
  }

  const selectItems = (levelId, selectedItems) => {
    dispatch(examAction.selectItems({ levelId, selectedItems }))
  }

  const handleLevelCheckChange = (levelId, e) => {
    dispatch(
      examAction.updateLevelCheck({ levelId, checked: e.target.checked })
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const itemsValid = validateItems(checkedLevels)
    form.validateFields(async (err, values) => {
      if (!err && itemsValid) {
        values.isFormal = isFormal
        updateExam(history, status, examId, values, checkedLevels)
      }
    })
  }

  const hideImportExam = () => {
    setShowImportExamModal(false)
  }

  // 如果编辑考试，需要等到获取到该考试后，再渲染考试。这样可以解决form初始值的问题
  if (isEdit && !examInEdit) {
    return null
  }

  return (
    <div className="page exam">
      {examInEdit?.isFormal === false && (
        <Button
          type="primary"
          size="small"
          className="import-exam-btn"
          onClick={() => setShowImportExamModal(true)}
        >
          导入考试
        </Button>
      )}
      <div className="exam__edit-title">
        {status}
        {examType}考试
      </div>
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
            getFieldDecorator={getFieldDecorator}
            key={level.id}
            level={level}
            examItemList={examItemList}
            selectItems={selectItems}
            updateItemRatio={updateItemRatio}
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
      {showImportExamModal && <ImportExamModal hideModal={hideImportExam} />}
    </div>
  )
}

export default Form.create()(Exam)
