import './index.less'

import { Form, message } from 'antd'
import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import FormInput from 'src/components/FormInput'
import FormSelect from 'src/components/FormSelect'
import PageFormCustom from 'src/components/PageFormCustom'
import useFetch from 'src/hooks/useFetch'
import api from 'src/utils/api'
import {
  pathChangeStudGroup,
  pathExamRounds,
  pathGroupedStudDetail,
} from 'src/utils/httpUtil'

const StudentExamGroup = () => {
  const { id: examId, examGroupId } = useParams()
  const history = useHistory()
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
