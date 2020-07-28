import React, { useEffect, useState } from 'react'
import './index.less'
import api from 'src/utils/api'
import { Form, message, Input, Button, Select } from 'antd'
import { formItemLayout } from 'src/utils/const'

const StudentExamGroup = ({ match, form, history }) => {
  const [studExamGroup, setStudExamGroup] = useState()
  const [examRoundInfo, setExamRoundInfo] = useState()
  const examId = match.params.id
  const examGroupId = match.params.examGroupId
  const { getFieldDecorator } = form

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/examination/studentGroupedDetail?examinationGroupId=${examGroupId}`
      )
      setStudExamGroup(result)
    }
    fetchData()
  }, [examGroupId])

  useEffect(() => {
    const fetchData = async () => {
      const result = await api.get(
        `/examination/examRoundInfo?examinationId=${examId}`
      )
      setExamRoundInfo(result)
    }
    fetchData()
  }, [examId])

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

  return (
    <>
      {studExamGroup && examRoundInfo && (
        <div className="page exam-group">
          <div className="exam-group__edit-title">考试分组</div>
          <Form
            onSubmit={handleSubmit}
            {...formItemLayout}
            className="exam-group__edit-form"
          >
            <Form.Item label="考生姓名">
              <Input disabled value={studExamGroup.studentName} />
            </Form.Item>
            <Form.Item label="考评级别">
              <Input disabled value={studExamGroup.levelName} />
            </Form.Item>
            <Form.Item label="组号">
              {getFieldDecorator('toRoundNum', {
                initialValue: examRoundInfo.find(
                  (round) => round.roundNum === studExamGroup.currRoundNum
                ).roundNum,
                rules: [{ required: true }],
              })(
                <Select placeholder="请选择报考级别">
                  {examRoundInfo.map((round) => (
                    <Select.Option key={round.roundNum} value={round.roundNum}>
                      {round.roundNum}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
            <Form.Item className="coach__edit-form--btns">
              <Button className="edit-cancel-btn" onClick={goBack}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确定
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  )
}

export default Form.create()(StudentExamGroup)
