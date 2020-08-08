import React, { useEffect, useState } from 'react'
import './index.less'
import { useDispatch, useSelector } from 'react-redux'
import * as examAction from 'src/actions/exam'
import api from 'src/utils/api'
import { enforceLevelList, updateExam, validateItems } from './helper'
import LevelExamItems from './LevelExamItems'
import PageFormCustom from 'src/components/PageFormCustom'
import useSearch from 'src/hooks/useSearch'
import FormInput from 'src/components/FormInput'
import FormEnableRadio from 'src/components/FormEnableRadio'
import FormDateRange from 'src/components/FormDateRange'
import LevelRangeItems from './LevelRangeItems'
import { message, Button } from 'antd'
import ImportExamModal from './ImportExamModal'

const { usePageForm } = PageFormCustom

const Exam = ({ history }) => {
  const dispatch = useDispatch()
  const { isFormal } = useSearch()
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

  const onFinish = (values) => {
    const itemsValid = validateItems(checkedLevels)
    if (itemsValid) {
      values.isFormal = isFormal
      updateExam(history, status, examId, values, checkedLevels)
    } else {
      message.error('请保证每一个级别的考项比例之和为100')
    }
  }

  // 如果编辑考试，需要等到获取到该考试后，再渲染考试。这样可以解决form初始值的问题
  if (isEdit && !examInEdit) {
    return null
  }

  const {
    title,
    address,
    isEnable,
    examStartTime,
    examEndTime,
    signStartTime,
    signEndTime,
    note,
  } = examInEdit || {}

  return (
    <PageFormCustom
      onFinish={onFinish}
      title={`${examType}考试`}
      customClass="exam"
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
      <FormInput label="名称" name="title" initialValue={title} />
      <FormInput label="地址" name="address" initialValue={address} />
      <FormDateRange
        label="考试时间"
        name="examTime"
        initialValue={[examStartTime, examEndTime]}
        defaultHours={['09:00', '18:00']}
      />
      <FormDateRange
        label="报名时间"
        name="signTime"
        initialValue={[signStartTime, signEndTime]}
        defaultHours={['00:00', '23:59']}
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
      <FormEnableRadio initialValue={isEnable} />
      <FormInput
        type="textarea"
        label="描述"
        name="note"
        initialValue={note}
        required={false}
      />
      {showImportExamModal && (
        <ImportExamModal hideModal={() => setShowImportExamModal(false)} />
      )}
    </PageFormCustom>
  )
}

export default Exam
