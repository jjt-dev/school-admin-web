import { buildParameters } from './common'
import { local, TOKEN } from './storage'

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

export const pathExam = (examId) => `/examination/item?id=${examId}`

/**
 * exam sign
 */
export const pathExamSignList = '/exam/sign/signPage'

export const pathExamSign = (signId) =>
  signId ? `/exam/sign/signInfo?signId=${signId}` : ''

export const pathDelSign = (examSign) =>
  `/exam/sign/delSign?signId=${examSign.signId}`

export const pathPaySign = (examSign) =>
  `/exam/sign/payOffline?signId=${examSign.signId}`

export const pathDownloadResults = (examinationId) =>
  `${
    process.env.REACT_APP_API_ROOT
  }/statistics/getSomeExamAllResults?examinationId=${examinationId}&token=${encodeURIComponent(
    local.getItem(TOKEN)
  )}`

export const pathCanSignLevels = (examId) =>
  `/exam/sign/canSignLevelList?examinationId=${examId}`

export const pathSignOffline = (values) =>
  buildParameters(`/exam/sign/signOffLine`, values)

export const pathSignOfflineWhenExaming = `/exam/sign/signOffLineAfterStartExam`

export const pathExamRooms = (examId) =>
  `/examination/getExamRooms?examinationId=${examId}`

/**
 * coach
 */
export const pathCoachClasses = (coachId) =>
  `/coach/class/page?page=1&rows=10000&coachId=${coachId}`
