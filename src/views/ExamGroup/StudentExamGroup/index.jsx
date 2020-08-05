import React from 'react'
import './index.less'
import api from 'src/utils/api'
import { Form, message } from 'antd'
import useFetch from 'src/hooks/useFetch'
import PageFormCustom from 'src/components/PageFormCustom'
import FormInput from 'src/components/FormInput'
import FormSelect from 'src/components/FormSelect'

const StudentExamGroup = ({ match, history }) => {
  const examId = match.params.id
  const examGroupId = match.params.examGroupId
  const [form] = Form.useForm()
  const [examRoundInfo] = useFetch(
    `/examination/examRoundInfo?examinationId=${examId}`
  )
  const [studExamGroup] = useFetch(
    `/examination/studentGroupdDetail?examinationGroupId=${examGroupId}`
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    form.validateFields(async (err, values) => {
      if (!err) {
        const { toRoundNum } = values
        let path = `/examination/changeStudentGroup?examinationGroupId=${examGroupId}&toRoundNum=${toRoundNum}`
        await api.post(path)
        message.success(`修改场次成功`)
        goBack()
      }
    })
  }

  const goBack = () => {
    history.push(`/exam/${examId}/group`)
  }

  if (!studExamGroup || !examRoundInfo) return null

  return (
    <PageFormCustom form={form} title="考试分组">
      <FormInput label="考生姓名" disabled value={studExamGroup.studentName} />
      <FormInput label="考评级别" disabled value={studExamGroup.levelName} />
      <FormSelect
        label="组号"
        name="toRoundNum"
        options={examRoundInfo}
        valueKey="roundNum"
        tileKey="roundNUm"
        message="请选择报考级别"
        initialValue={
          examRoundInfo.find(
            (round) => round.roundNum === studExamGroup.currRoundNum
          ).roundNum
        }
      />
    </PageFormCustom>
  )
}

export default StudentExamGroup
