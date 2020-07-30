import { Genders } from 'src/utils/const'
import { formatTime, addNumPrefix, parseSearches } from 'src/utils/common'

export const mapExamCertifValue = ({
  schoolInfo = {},
  signLevel = {},
  studentInfo = {},
}) => {
  return {
    schoolName: schoolInfo.name,
    schoolSite: schoolInfo.website,
    姓名: studentInfo.studentName,
    性别: Genders[studentInfo.studentGender],
    出生时间: formatTime(studentInfo.studentBirthday),
    报考级别: signLevel.levelName,
    申请带色: signLevel.levelAlias,
    指导教练: studentInfo.coach,
    考试时间: formatTime(studentInfo.examStartTime),
    考试地点: studentInfo.examAddress,
    cardId: studentInfo.studentCardId,
  }
}

export const mapReportValue = (student, examResult = {}) => {
  const {
    studentName,
    studentGender,
    studentBirthday,
    studentCardId,
    signLevelName,
  } = student
  const { roundNum, subOrderNum, levelName, levelAlias } = examResult
  return {
    考号: `${roundNum}-${addNumPrefix(subOrderNum)}`,
    姓名: studentName,
    性别: Genders[studentGender],
    出生时间: formatTime(studentBirthday),
    身份证号: studentCardId,
    当前级别: signLevelName,
    报考级别: levelName,
    申请带色: levelAlias,
  }
}

export const buildPath = (examId, signId, location) => {
  // 如果signId存在，则是获取单个考生的准考证内容
  if (!!signId) {
    return `/exam/sign/examineeIDCardInfo?signId=${signId}`
  }

  // 下面的逻辑是通过考试id，教练id和教练所带班级id获取要批量打印成绩单的考生列表
  let path = `/exam/sign/examineeIDCardInfoes?examId=${examId}`
  const { coachId, coachClassId } = parseSearches(location)
  if (!!coachId) {
    path += `&coachId=${coachId}`
  }
  if (!!coachClassId) {
    path += `&coachClassId=${coachClassId}`
  }
  return path
}
