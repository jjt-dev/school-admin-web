import React, { useEffect, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Select } from 'antd'
import useFetch from 'src/hooks/useFetch'
import PageFormCustom from 'src/components/PageFormCustom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormImage from 'src/components/FormImage'
import FormRadioGroup from 'src/components/FormRadio'
import { useParams } from 'react-router'
import {
  pathExamSign,
  pathExam,
  pathCanSignLevels,
  pathCoachClasses,
} from 'src/utils/httpUtil'
import './index.less'
import { checkIsExaming } from 'src/utils/common'
import {
  payedOptions,
  onFinish,
  validateIdCardForm,
  onValuesChange,
} from './helper'

const ExamSign = ({ history }) => {
  const { id, signId } = useParams()
  const examId = Number(id)
  const [form] = Form.useForm()
  const { enabledCoaches, allExamLevels } = useSelector((state) => state.app)
  const [selectedLevelIds, setSelectedLevelIds] = useState([])
  const [sign] = useFetch(pathExamSign(signId))
  const [exam = {}] = useFetch(pathExam(examId))
  const [{ data: coachClasses = [] } = {}, fetchClasses] = useFetch('')
  const [availableExamLevels = []] = useFetch(pathCanSignLevels(examId))
  const isExaming = checkIsExaming(exam.currState)
  const isEdit = !!signId

  const getClasses = useCallback(
    (coachId) => fetchClasses(pathCoachClasses(coachId)),
    [fetchClasses]
  )

  useEffect(() => {
    if (sign) {
      const levels = sign.signLevels || []
      const selectedRoom = levels.reduce((result, level) => {
        result[`level_${level.levelId}_room`] = level.roomId
        return result
      }, {})
      const formSign = {
        ...sign.signInfo,
        ...sign.studentInfo,
        levels: levels.map((level) => level.levelId),
        ...selectedRoom,
      }
      formSign.isPayed = formSign.currState > 0
      getClasses(formSign.coachId)
      form.setFieldsValue(formSign)
      setSelectedLevelIds(formSign.levels)
    }
  }, [sign, form, getClasses])

  const onCoachChange = async (coachId) => {
    form.setFieldsValue({ coachId, coachClassId: null })
    getClasses(coachId)
  }

  const onLevelChange = (levels) => {
    form.setFieldsValue({ levels })
    setSelectedLevelIds(levels)
  }

  const titlePrefix = isEdit ? '编辑报名' : '人工报名'

  if (isEdit && !sign) return null

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish(history, examId, isEdit, isExaming, selectedLevelIds)}
      onValuesChange={onValuesChange(form)}
      fullTitle={`${titlePrefix} (${exam.title})`}
      customClass="exam-sign"
    >
      <FormInput
        label="考生身份证号"
        name="cardId"
        disabled={isEdit}
        rules={[{ validator: validateIdCardForm }, { required: true }]}
      />
      <FormInput label="考生姓名" name="name" />
      <FormInput label="家长电话" name="phone" />
      <FormImage form={form} label="照片" name="faceUrl" message="请上传头像" />
      <FormInput label="住址" name="address" type="textarea" />
      <FormSelect
        label="当前考生等级"
        name="currLevelId"
        options={allExamLevels}
        titleKey="name"
      />
      <Form.Item label="教练" name="coachId" rules={[{ required: true }]}>
        <Select onChange={onCoachChange} placeholder="请选择教练">
          {enabledCoaches.map((coach) => (
            <Select.Option key={coach.id} value={coach.id}>
              {coach.username}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <FormSelect
        label="班级"
        name="coachClassId"
        options={coachClasses}
        titleKey="name"
      />
      <Form.Item name="levels" label="报考级别" rules={[{ required: true }]}>
        <Select
          placeholder="请选择报考级别"
          onChange={onLevelChange}
          mode="multiple"
        >
          {availableExamLevels.map((level) => (
            <Select.Option key={level.id} value={level.id}>
              {level.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {!isEdit && (
        <FormRadioGroup
          label="已缴费"
          name="isPayed"
          options={payedOptions}
          hidden={isExaming}
        />
      )}
    </PageFormCustom>
  )
}

export default ExamSign
