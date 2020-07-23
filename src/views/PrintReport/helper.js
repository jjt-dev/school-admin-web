import { Genders } from 'src/utils/const'
import { formatTime, addNumPrefix } from 'src/utils/common'

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
