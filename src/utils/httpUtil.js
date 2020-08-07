export const pathExamRounds = (examId) => {
  return `/examination/examRoundInfo?examinationId=${examId}`
}

export const pathGroupedStudDetail = (examGroupId) => {
  return `/examination/studentGroupedDetail?examinationGroupId=${examGroupId}`
}

export const pathChangeStudGroup = (examGroupId, toRoundNum) => {
  return `/examination/changeStudentGroup?examinationGroupId=${examGroupId}&toRoundNum=${toRoundNum}`
}
