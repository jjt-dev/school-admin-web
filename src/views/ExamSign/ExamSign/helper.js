import api from 'src/utils/api'
import {
  pathSignOfflineWhenExaming,
  pathSignOffline,
  pathSignEditBasicInfo,
  pathSignEditBeforeSignEnd,
  pathSignEditAfterSignEnd,
} from 'src/utils/httpUtil'
import { dateFormat } from 'src/utils/const'
import { routeExamSignList } from 'src/utils/routeUtil'
import { message } from 'antd'
import { buildParameters } from 'src/utils/common'

export const payedOptions = [
  { title: '是', value: true },
  { title: '否', value: false },
]

export const onFinish = (
  history,
  examId,
  isEdit,
  isExaming,
  selectedLevelIds
) => async (values) => {
  values.currState = values.isPayed ? 10 : 0
  values.examinationId = examId
  values.levels = values.levels.join(',')
  values.birthday = values.birthday.format(dateFormat)

  // 新增报名和临时新报名只需要分别调用单独的一个借口
  if (!isEdit) {
    if (!isExaming) {
      await api.post(pathSignOffline(values))
    } else {
      await signWhenExaming(
        pathSignOfflineWhenExaming,
        values,
        selectedLevelIds
      )
    }
  }
  // 编辑报名基本信息调用一个接口，然后级别和考场信息在考试报名截止前和截止后需要调用不同的两个接口
  // 两个接口的区别是报名截止后编辑级别需要手动输入级别的考场信息
  if (isEdit) {
    await api.post(buildParameters(pathSignEditBasicInfo, values))
    if (!isExaming) {
      // 这里传的参数和基本信息是一样的，是因为基本信息接口会忽略级别相关信息，而截止报名前接口会更新级别相关信息
      await api.post(buildParameters(pathSignEditBeforeSignEnd, values))
    } else {
      // 这里单独的接口是因为报名截止后需要人工指定级别考场
      await signWhenExaming(pathSignEditAfterSignEnd, values, selectedLevelIds)
    }
  }

  message.success(`报名成功`)
  history.push(routeExamSignList(examId))
}

export const signWhenExaming = async (path, values, selectedLevelIds) => {
  const levelRoomMap = {}
  selectedLevelIds.forEach((levelId) => {
    levelRoomMap[levelId] = values[`level_${levelId}_room`]
  })
  await api.post(path, {
    examinationSignInfo: values,
    levelRoomMap,
  })
}
