import { Button, message, Select } from 'antd'
import React from 'react'
import { useState } from 'react'
import ListHeaderCustom from 'src/components/ListHeaderCustom'
import ListHeaderLeft from 'src/components/ListHeaderLeft'
import ListHeaderRight from 'src/components/ListHeaderRight'
import api from 'src/utils/api'
import { ExamStatus, SignStatus } from 'src/utils/const'
import { pathUploadTaekwondo } from 'src/utils/httpUtil'

import CoachClassSelect from './CoachClassSelect'
import ImportModal from './ImportModal'

const { Option } = Select

const Header = ({
  examSignList,
  fetchTable,
  handleSign,
  exam,
  fetchExam,
  allCoaches,
  printExamCertifs,
  downloadExamineeInfo,
  defaultSearch,
}) => {
  const { currState: examState } = exam
  const { coachId } = defaultSearch
  const defaultSelectedClasses = []
  if (coachId) {
    defaultSelectedClasses.push(coachId)
  }
  const [selectedClasses, setSelectedClasses] = useState(defaultSelectedClasses)
  const [showImportModal, setShowImportModal] = useState(false)

  const clearSearch = () => {
    setSelectedClasses([])
    fetchTable({ coachId: '', coachClassId: '', keyword: '' })
  }

  const handleChangeSignStatus = (signStatusId) => {
    fetchTable({ currState: signStatusId })
  }

  return (
    <ListHeaderCustom>
      <ListHeaderLeft>
        {examState <= ExamStatus.signing.id && (
          <>
            <Button size="small" type="primary" onClick={handleSign}>
              报名
            </Button>
            <Button
              size="small"
              type="primary"
              onClick={() => setShowImportModal(true)}
            >
              导入考生
            </Button>
          </>
        )}
        {(examState === ExamStatus.waitForExam.id ||
          examState === ExamStatus.examing.id) && (
          <Button size="small" type="primary" onClick={handleSign}>
            临时报名
          </Button>
        )}
        {examState !== ExamStatus.finish.id && examSignList.length > 0 && (
          <Button size="small" type="primary" onClick={printExamCertifs}>
            打印准考证
          </Button>
        )}
        {examState === ExamStatus.finish.id && (
          <>
            <Button size="small" onClick={downloadExamineeInfo}>
              下载考试信息
            </Button>
            <UploadTaekwondo exam={exam} fetchExam={fetchExam} />
          </>
        )}
      </ListHeaderLeft>
      <ListHeaderRight
        fetchTable={fetchTable}
        clearSearchCallback={clearSearch}
        keyword={defaultSearch.keyword}
      >
        <span className="mr-15">当前状态</span>
        <Select
          defaultValue={defaultSearch.currState ?? ''}
          style={{ width: 140 }}
          onChange={handleChangeSignStatus}
        >
          <Option value="">所有</Option>
          {Object.values(SignStatus).map((status) => (
            <Option key={status.id} value={status.id}>
              {status.title}
            </Option>
          ))}
        </Select>
        {allCoaches.length > 0 && (
          <CoachClassSelect
            allCoaches={allCoaches}
            fetchSignList={fetchTable}
            selectedClasses={selectedClasses}
            setSelectedClasses={setSelectedClasses}
            defaultSearch={defaultSearch}
          />
        )}
      </ListHeaderRight>
      {showImportModal && (
        <ImportModal
          hideModal={() => setShowImportModal(false)}
          fetchTable={fetchTable}
        />
      )}
    </ListHeaderCustom>
  )
}

export default Header

const UploadTaekwondo = ({ exam, fetchExam }) => {
  const { uploadState } = exam
  const canUpload = exam.uploadState === 0
  const isUploading = exam.uploadState === 1
  const titles = {
    0: '申请上传台协',
    1: '上传台协中',
    2: '上传台协完成',
  }

  const uploadToTaekwondo = async () => {
    if (canUpload) {
      await api.post(pathUploadTaekwondo(exam.id))
      message.success('正在上传中，请稍后刷新页面查看是否完成。')
      fetchExam()
    }
  }

  return (
    <Button
      size="small"
      loading={isUploading}
      disabled={!canUpload}
      onClick={uploadToTaekwondo}
    >
      {titles[uploadState]}
    </Button>
  )
}
