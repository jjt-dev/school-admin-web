import './index.less'

import { Button, DatePicker, Form } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import * as examAction from 'src/actions/exam'
import FormDateRange from 'src/components/FormDateRange'
import FormEnableRadio from 'src/components/FormEnableRadio'
import FormInput from 'src/components/FormInput'
import PageFormCustom from 'src/components/PageFormCustom'
import useSearch from 'src/hooks/useSearch'
import api from 'src/utils/api'
import { hourFormat, timeFormat } from 'src/utils/const'

import { enforceLevelList, updateExam } from './helper'
import ImportExamModal from './ImportExamModal'
import LevelExamItems from './LevelExamItems'
import LevelRangeItems from './LevelRangeItems'

const { RangePicker } = DatePicker
const { usePageForm } = PageFormCustom

const Exam = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { isFormal } = useSearch()
  const [signEndTime, setSignEndTime] = useState()
  const [examStartTime, setExamStartTime] = useState()
  const [showImportExamModal, setShowImportExamModal] = useState(false)
  const examType = isFormal === 'true' ? '正式' : '模拟'
  const [examId, isEdit, status] = usePageForm()
  const { examItemList, examLevelList, examInEdit } = useSelector(
    (state) => state.exam
  )
  const checkedLevels = examLevelList.filter((level) => level.items)

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
    return () => dispatch(examAction.resetStore())
  }, [dispatch, examId])

  useEffect(() => {
    if (examInEdit) {
      examInEdit.signTime = [
        moment(examInEdit.signStartTime),
        moment(examInEdit.signEndTime),
      ]
      examInEdit.examTime = [
        moment(examInEdit.examStartTime),
        moment(examInEdit.examEndTime),
      ]
      form.setFieldsValue(examInEdit)
      setSignEndTime(examInEdit.signTime[1])
      setExamStartTime(examInEdit.examTime[0])
    }
  }, [examInEdit, form])

  const updateItemRatio = useCallback(
    (levelId, itemId, ratio) => {
      dispatch(examAction.updateItemRatio({ levelId, itemId, ratio }))
    },
    [dispatch]
  )

  const selectItems = (levelId, selectedItems) => {
    dispatch(examAction.selectItems({ levelId, selectedItems }))
  }

  const handleLevelCheckChange = (levelId, e) => {
    dispatch(
      examAction.updateLevelCheck({ levelId, checked: e.target.checked })
    )
  }

  const onFinish = (values) => {
    values.isFormal = isFormal
    updateExam(history, status, examId, values, checkedLevels)
  }

  const onValuesChange = (values) => {
    values.signTime && setSignEndTime(values.signTime[1])
    values.examTime && setExamStartTime(values.examTime[0])
  }

  // 如果编辑考试，需要等到获取到该考试后，再渲染考试。这样可以解决form初始值的问题
  if (isEdit && !examInEdit) {
    return null
  }

  return (
    <PageFormCustom
      form={form}
      onFinish={onFinish}
      title={`${examType}考试`}
      customClass="exam"
      onValuesChange={onValuesChange}
      back="/exams"
    >
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
      <FormInput label="名称" name="title" />
      <FormInput label="地址" name="address" />
      <FormDateRange
        label="报名时间"
        name="signTime"
        defaultHours={['00:00', '23:59']}
      />
      <Form.Item label="考前准备">
        <RangePicker
          disabled
          showTime={{ format: hourFormat }}
          format={timeFormat}
          value={[signEndTime, examStartTime]}
        />
      </Form.Item>
      <FormDateRange
        label="考试时间"
        name="examTime"
        defaultHours={['09:00', '18:00']}
        disabledDate={(current) => current && current < signEndTime}
      />
      <LevelRangeItems
        examLevelList={examLevelList}
        handleLevelCheckChange={handleLevelCheckChange}
        initialValue={examInEdit?.levelsCanSign.split(',')}
      />
      {checkedLevels.map((level) => (
        <LevelExamItems
          key={level.id}
          level={level}
          examItemList={examItemList}
          selectItems={selectItems}
          updateItemRatio={updateItemRatio}
        />
      ))}
      <FormEnableRadio />
      <FormInput type="textarea" label="描述" name="note" required={false} />
      {showImportExamModal && (
        <ImportExamModal hideModal={() => setShowImportExamModal(false)} />
      )}
    </PageFormCustom>
  )
}

export default Exam
