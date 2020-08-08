import React, { useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Form, Select, Input, message } from 'antd'
import useFetch from 'src/hooks/useFetch'
import PageFormCustom from 'src/components/PageFormCustom'
import FormSelect from 'src/components/FormSelect'
import FormInput from 'src/components/FormInput'
import FormGender from 'src/components/FormGender'
import FormDate from 'src/components/FormDate'
import FormImage from 'src/components/FormImage'
import { Relationships, dateFormat, ExamStatus } from 'src/utils/const'
import FormRadioGroup from 'src/components/FormRadio'
import { useParams } from 'react-router'
import { buildParameters } from 'src/utils/common'
import api from 'src/utils/api'
import moment from 'moment'
import {
  pathExamSign,
  pathExam,
  pathCanSignLevels,
  pathCoachClasses,
  pathSignOffline,
} from 'src/utils/httpUtil'
import { routeExamSignList } from 'src/utils/routeUtil'

const ExamSign = ({ history }) => {
  const { id: examId, signId } = useParams()
  const { allCoaches, allExamLevels } = useSelector((state) => state.app)
  const [sign] = useFetch(pathExamSign(signId))
  const [exam = {}] = useFetch(pathExam(examId))
  const [{ data: coachClasses = [] }, fetchClasses] = useFetch('', {})
  const [availableExamLevels = []] = useFetch(pathCanSignLevels(examId))
  const isExaming = exam.currState === ExamStatus.examing.id

  const [form] = Form.useForm()

  const getClasses = useCallback(
    (coachId) => fetchClasses(pathCoachClasses(coachId)),
    [fetchClasses]
  )

  useEffect(() => {
    if (sign) {
      const formSign = {
        ...sign.signInfo,
        ...sign.studentInfo,
        levels: (sign.signLevels || []).map((level) => level.levelId),
      }
      formSign.isPayed = formSign.currState > 0
      formSign.birthday = moment(formSign.birthday)
      console.log('formsign', formSign)
      getClasses(formSign.coachId)
      form.setFieldsValue(formSign)
    }
  }, [sign, form, getClasses])

  const onCoachChange = async (coachId) => {
    form.setFieldsValue({ coachId })
    getClasses(coachId)
  }

  const onFinish = async (values) => {
    values.currState = values.isPayed ? 10 : 0
    values.examinationId = examId
    values.levels = values.levels.join(',')
    values.birthday = values.birthday.format(dateFormat)
    await api.post(pathSignOffline(values))
    message.success(`报名成功`)
    history.push(routeExamSignList(examId))
  }

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish}
      fullTitle={signId ? '编辑报名' : '人工报名'}
    >
      <Form.Item label="教练" name="coachId" rules={[{ required: true }]}>
        <Select onChange={onCoachChange} placeholder="请选择教练">
          {allCoaches.map((coach) => (
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
      <Form.Item label="考试名称">
        <Input readOnly={true} value={exam.title}></Input>
      </Form.Item>
      <FormInput label="考试姓名" name="name" />
      <FormGender />
      <FormDate label="考生生日" name="birthday" />
      <FormImage
        form={form}
        label="照片"
        name="faceUrl"
        message="请上传头像"
        imageUrl={form.faceUrl}
      />
      <FormInput label="家长姓名" name="parentName" />
      <FormInput label="家长电话" name="phone" />
      <Form.Item
        label="家长关系"
        name="relationship"
        rules={[{ required: true }]}
      >
        <Select placeholder="请选择与家长关系">
          {Object.keys(Relationships).map((key) => (
            <Select.Option key={key} value={Number(key)}>
              {Relationships[key]}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <FormInput label="考生身份证号" name="cardId" />
      <FormSelect
        label="当前考生等级"
        name="currLevelId"
        options={allExamLevels}
        titleKey="name"
      />
      <FormSelect
        label="报考级别"
        name="levels"
        options={availableExamLevels}
        titleKey="name"
        mode="multiple"
      />
      <FormInput label="住址" name="address" type="textarea" />
      <FormRadioGroup label="已缴费" name="isPayed" options={payedOptions} />
      <FormInput label="备注" name="note" type="textarea" required={false} />
    </PageFormCustom>
  )
}

export default ExamSign

const payedOptions = [
  { title: '是', value: true },
  { title: '否', value: false },
]
