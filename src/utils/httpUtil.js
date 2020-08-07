import { buildParameters } from './common'

/**
 * exam group
 */
export const pathExamRounds = (examId) =>
  `/examination/examRoundInfo?examinationId=${examId}`

export const pathGroupedStudDetail = (examGroupId) =>
  `/examination/studentGroupedDetail?examinationGroupId=${examGroupId}`

export const pathChangeStudGroup = (examGroupId, toRoundNum) =>
  `/examination/changeStudentGroup?examinationGroupId=${examGroupId}&toRoundNum=${toRoundNum}`

export const pathRoundAndRoom = (examId) =>
  `/examination/getExamRoundAndItsRoom?examinationId=${examId}`

export const pathUpdRoundRoom = (sourceId, newRoomId) =>
  `/examination/updateRoundRoom?sourceId=${sourceId}&newRoomId=${newRoomId}`

/**
 * exam
 */
export const pathMockBtn = `/examination/canShowMockBtn`
export const pathExamList = `/examination/page`

export const pathExamEnable = (params) =>
  buildParameters(`/examination/enable`, params)
