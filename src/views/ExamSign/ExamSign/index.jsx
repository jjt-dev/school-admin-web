import React, { useEffect, useState } from 'react'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import { Relationships, formItemLayout } from 'src/utils/const'
import { Form, Input, Button, Select, Radio, DatePicker } from 'antd'
import * as examSignAction from 'src/actions/examSign'
import { updateExamSign } from '../helper'
import Avatar from 'src/components/Avatar'
import moment from 'moment'
import api from 'src/utils/api'

const { TextArea } = Input
const { Option } = Select

const ExamSign = ({ match, history, form }) => {
  const { getFieldDecorator } = form
  const coachId = form.getFieldValue('coachId')
  const [coachClasses, setCoachClasses] = useState([])
  const dispatch = useDispatch()
  const [exam, setExam] = useState({})
  const [avatar, setAvatar] = useState({
    pristine: true,
    valid: false,
    faceUrl: '',
  })
  const { allCoaches, allExamLevels } = useSelector((state) => state.app)
  const { signInEdit, availableExamLevels } = useSelector(
    (state) => state.examSign
  )
  const { id: examId, signId } = match.params
  const isEdit = !!signId

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/coach/class/page?page=1&rows=10000&coachId=${coachId}`
      )
      setCoachClasses(result.data)
    }

    if (coachId) {
      fetchData()
    }
  }, [coachId])

  useEffect(() => {
    const fetchData = async () => {
      const exam = await api.get(`/examination/item?id=${examId}`)
      setExam(exam)
    }
    fetchData()
  }, [examId])

  useEffect(() => {
    dispatch(examSignAction.getAvailableExamLevels(examId))
    if (signId) {
      dispatch(examSignAction.getExamSign(signId))
    }
  }, [dispatch, examId, signId])

  useEffect(() => {
    return () => dispatch(examSignAction.resetStore())
  }, [dispatch])

  useEffect(() => {
    if (signInEdit) {
      setAvatar((pre) => ({
        ...pre,
        faceUrl: signInEdit.faceUrl,
        valid: true,
      }))
    }
  }, [signInEdit])

  const handleSubmit = (e) => {
    e.preventDefault()
    setAvatar({ ...avatar, pristine: false })
    form.validateFields(async (err, values) => {
      if (!err && avatar.valid) {
        values.faceUrl = avatar.faceUrl
        updateExamSign(history, examId, values)
      }
    })
  }

  const handleAvatarChange = (payload) => {
    setAvatar({ ...payload, pristine: false })
  }

  return (
    <div className="page sign">
      <div className="sign__edit-title">{isEdit ? '编辑报名' : '人工报名'}</div>
      <Form
        onSubmit={handleSubmit}
        {...formItemLayout}
        className="sign__edit-form"
      >
        <Form.Item label="教练">
          {getFieldDecorator('coachId', {
            initialValue: isEdit ? signInEdit?.coachId : '',
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择教练">
              {allCoaches.map((coach) => (
                <Option key={coach.id} value={coach.id}>
                  {coach.username}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="班级">
          {getFieldDecorator('coachClassId', {
            initialValue: isEdit ? signInEdit?.coachClassId : '',
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择教练班级">
              {coachClasses.map((classItem) => (
                <Option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="考试名称">
          <Input readOnly={true} value={exam.title}></Input>
        </Form.Item>
        <Form.Item label="考生姓名" className="sign__edit-form-name">
          {getFieldDecorator('name', {
            initialValue: isEdit ? signInEdit?.name : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入考生姓名" />)}
        </Form.Item>
        <Form.Item label="性别" className="sign__edit-form-gender">
          {getFieldDecorator('gender', {
            initialValue: isEdit ? signInEdit?.gender : 1,
            rules: [{ required: true }],
          })(
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="考生生日">
          {getFieldDecorator('birthday', {
            initialValue: isEdit ? moment(signInEdit?.birthday) : null,
            rules: [
              {
                type: 'object',
                required: true,
                message: '请选择考生生日',
              },
            ],
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item label="照片" className="sign__edit-form-avatar">
          {(!isEdit || signInEdit) && (
            <Avatar
              callback={handleAvatarChange}
              imageUrl={signInEdit?.faceUrl}
            />
          )}
          {!avatar.pristine && !avatar.valid && (
            <span className="sign__edit-form-avatar-error">
              {`${avatar.message ?? '请上传头像图片'}`}
            </span>
          )}
        </Form.Item>
        <Form.Item label="家长姓名">
          {getFieldDecorator('parentName', {
            initialValue: isEdit ? signInEdit?.parentName : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入家长姓名" />)}
        </Form.Item>
        <Form.Item label="家长电话">
          {getFieldDecorator('phone', {
            initialValue: isEdit ? signInEdit?.phone : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入家长电话" />)}
        </Form.Item>
        <Form.Item label="家长关系">
          {getFieldDecorator('relationship', {
            initialValue: isEdit ? signInEdit?.relationship : '',
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择与家长关系">
              {Object.keys(Relationships).map((key) => (
                <Option key={key} value={Number(key)}>
                  {Relationships[key]}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="考生身份证号">
          {getFieldDecorator('cardId', {
            initialValue: isEdit ? signInEdit?.cardId : '',
            rules: [{ required: true }],
          })(<Input type="text" placeholder="请输入考生身份证号" />)}
        </Form.Item>
        <Form.Item label="当前考生等级">
          {getFieldDecorator('currLevelId', {
            initialValue: isEdit ? signInEdit?.currLevelId : '',
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择考生等级">
              {allExamLevels.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="报考级别">
          {getFieldDecorator('levels', {
            initialValue: isEdit ? signInEdit?.signLevels[0]?.levelId : '',
            rules: [{ required: true }],
          })(
            <Select placeholder="请选择报考级别">
              {availableExamLevels.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="住址">
          {getFieldDecorator('address', {
            initialValue: isEdit ? signInEdit?.address : '',
            rules: [{ required: true }],
          })(<TextArea rows={2} placeholder="请输入住址" />)}
        </Form.Item>
        <Form.Item label="已缴费">
          {getFieldDecorator('isPayed', {
            initialValue: isEdit ? signInEdit?.currState > 0 : false,
          })(
            <Radio.Group disabled={isEdit && signInEdit?.currState > 0}>
              <Radio value={false}>否</Radio>
              <Radio value={true}>是</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="备注">
          {getFieldDecorator('note', {
            initialValue: isEdit ? signInEdit?.note : '',
          })(<TextArea rows={2} />)}
        </Form.Item>
        <Form.Item className="sign__edit-form--btns">
          <Button
            className="edit-cancel-btn"
            onClick={() => history.push(`/exam/${examId}/signs`)}
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

export default Form.create()(ExamSign)
