import React from 'react'
import { formatTime } from 'src/utils/common'
import { Divider, Menu } from 'antd'

export const certificateListColumns = (history, confirmDeleteCertif) => [
  {
    title: '序号',
    key: 'index',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '证书类型',
    dataIndex: 'type',
    key: 'type',
    render: (text, record) => (
      <span>{CertificateTypes[record.type]?.fullTitle}</span>
    ),
  },
  {
    title: '最后编辑时间',
    dataIndex: 'lastEditTime',
    key: 'lastEditTime',
    render: (text, record) => (
      <span>{formatTime(record.lastEditTime, 'YYYY-MM-DD HH:ss')}</span>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <>
        <span
          className="table-action"
          onClick={() =>
            history.push(`/certificate/${record.id}?type=${record.type}`)
          }
        >
          编辑
        </span>
        <Divider type="vertical" />
        <span
          className="table-action"
          onClick={() => {
            confirmDeleteCertif(record)
          }}
        >
          删除
        </span>
      </>
    ),
  },
]

export const CertificateTypes = {
  0: {
    id: 0,
    key: 'reportVertical',
    title: '考试成绩单',
    fullTitle: '考试成绩单(竖版)',
  },
  1: {
    id: 1,
    key: 'reportHoriz',
    title: '考试成绩单',
    fullTitle: '考试成绩单(横板)',
  },
  2: {
    id: 2,
    key: 'examCertificate',
    title: '准考证',
    fullTitle: '准考证',
  },
}

export const BasicInfoPositions = [1, 2, 3, 4, 5, 6, 7, 8]
export const ItemPositions = [
  { id: 1, title: '基本礼仪' },
  { id: 2, title: '理论知识' },
  { id: 3, title: '笔试答题' },
  { id: 4, title: '笔试答题' },
  { id: 5, title: '手部防御' },
  { id: 6, title: '' },
  { id: 7, title: '' },
  { id: 8, title: '' },
  { id: 9, title: '' },
  { id: 10, title: '' },
  { id: 11, title: '基本礼仪' },
  { id: 12, title: '理论知识' },
  { id: 13, title: '笔试答题' },
  { id: 14, title: '笔试答题' },
  { id: 15, title: '手部防御' },
  { id: 16, title: '' },
  { id: 17, title: '' },
  { id: 18, title: '' },
  { id: 19, title: '' },
  { id: 20, title: '' },
  { id: 21, title: '基本礼仪' },
  { id: 22, title: '理论知识' },
  { id: 23, title: '笔试答题' },
  { id: 24, title: '笔试答题' },
  { id: 25, title: '手部防御' },
  { id: 26, title: '' },
  { id: 27, title: '' },
  { id: 28, title: '' },
  { id: 29, title: '' },
  { id: 30, title: '' },
]

export const ReportBasicInfos = [
  '取消选择',
  '考号',
  '姓名',
  '性别',
  '出生时间',
  '身份证号',
  '当前级别',
  '报考级别',
  '申请带色',
]
export const ExamBasicInfos = [
  '取消选择',
  '姓名',
  '性别',
  '出生时间',
  '报考级别',
  '申请带色',
  '指导教练',
  '考试时间',
  '考试地点',
]

export const getMenus = (infos, updateBasicInfo, position) => (
  <Menu>
    {infos.map((item) => (
      <Menu.Item
        key={item}
        onClick={() => {
          updateBasicInfo(position, item)
        }}
      >
        {item}
      </Menu.Item>
    ))}
  </Menu>
)
