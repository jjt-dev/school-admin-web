import { buildFormPath } from './common'
import { local, TOKEN } from './storage'

// exam group
export const pathExamRounds = (examId) =>
  `/examination/examRoundInfo?examinationId=${examId}`

export const pathGroupedStudDetail = (examGroupId) =>
  `/examination/studentGroupedDetail?examinationGroupId=${examGroupId}`

export const pathChangeStudGroup = (examGroupId, toRoundNum) =>
  `/examination/changeStudentGroup?examinationGroupId=${examGroupId}&toRoundNum=${toRoundNum}`

export const pathRoundAndRoom = `/examination/getExamRoundAndItsRoom`

export const pathUpdRoundRoom = (sourceId, newRoomId) =>
  `/examination/updateRoundRoom?sourceId=${sourceId}&newRoomId=${newRoomId}`

export const pathRoomStudents = '/examination/pageStudentsOfSomeRoom'

export const pathDownloadRoomStudInfos = (examId, roomId) =>
  `${
    process.env.REACT_APP_API_ROOT
  }/statistics/exportSomeRoomStudent?examinationId=${examId}&roomId=${roomId}&token=${encodeURIComponent(
    local.getItem(TOKEN)
  )}`

// exam
export const pathMockBtn = `/examination/canShowMockBtn`
export const pathExamList = `/examination/page`

export const pathExam = (examId) => `/examination/item?id=${examId}`

// exam sign
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
  buildFormPath(`/exam/sign/signOffLine`, values)

export const pathSignOfflineWhenExaming = `/exam/sign/signOffLineAfterStartExam`

export const pathExamRooms = (examId) =>
  `/examination/getExamRooms?examinationId=${examId}`

export const pathSignEditBasicInfo = `/exam/sign/editStudentBaseInfo`
export const pathSignEditBeforeSignEnd = `/exam/sign/updateSignInfoBeforeSignEndTime`
export const pathSignEditAfterSignEnd = `/exam/sign/updateSignInfoAfterSignEndTime`

export const pathUserByCardId = (cardId) =>
  `/exam/sign/getStudentInfoByCardId?cardId=${cardId}`

// coach
export const pathCoachClasses = (coachId) =>
  `/coach/class/page?page=1&rows=10000&coachId=${coachId}`

// change password
export const pathChangePsd = (values) =>
  buildFormPath(`/user/changePsw`, values)
