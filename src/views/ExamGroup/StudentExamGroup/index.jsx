import React, { useEffect } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Form, message } from 'antd'
import useFetch from 'src/hooks/useFetch'
import PageFormCustom from 'src/components/PageFormCustom'
import FormInput from 'src/components/FormInput'
import FormSelect from 'src/components/FormSelect'
import {
  pathExamRounds,
  pathGroupedStudDetail,
  pathChangeStudGroup,
} from 'src/utils/httpUtil'

const StudentExamGroup = ({ match, history }) => {
  const { id: examId, examGroupId } = match.params
  const [form] = Form.useForm()
  const [examRoundInfo] = useFetch(pathExamRounds(examId))
  const [studExamGroup] = useFetch(pathGroupedStudDetail(examGroupId))
  const backPath = `/exam/${examId}/group`

  useEffect(() => {
    if (examRoundInfo && studExamGroup) {
      const round = examRoundInfo.find(
        (round) => round.roundNum === studExamGroup.currRoundNum
      )
      form.setFieldsValue({ toRoundNum: round.roundNum })
    }
  }, [form, examRoundInfo, studExamGroup])

  const onFinish = async ({ toRoundNum }) => {
    await api.post(pathChangeStudGroup(examGroupId, toRoundNum))
    message.success(`修改场次成功`)
    history.push(`/exam/${examId}/group`)
  }

  if (!studExamGroup || !examRoundInfo) return null

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish}
      title="考试分组"
      back={backPath}
    >
      <FormInput label="考生姓名" disabled value={studExamGroup.studentName} />
      <FormInput label="考评级别" disabled value={studExamGroup.levelName} />
      <FormSelect
        label="组号"
        name="toRoundNum"
        options={examRoundInfo}
        valueKey="roundNum"
        titleKey="roundNum"
        message="请选择报考级别"
      />
    </PageFormCustom>
  )
}

export default StudentExamGroup
