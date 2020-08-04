import { handleActions } from 'redux-actions'
import set from 'lodash/fp/set'
import flow from 'lodash/fp/flow'
import {
  GET_CERTIFICATE,
  GET_CERTIFICATE_LIST,
  UPDATE_BASIC_INFO,
  CERTIFICATE_UPDATE_FILTER,
  RESET_CERTIFICATE,
} from 'src/actions/certificate'
import { deepClone } from 'src/utils/common'

const initState = {
  certificateList: [],
  total: 0,
  filter: {
    search: '',
    paginator: {
      page: 1,
      rows: 10,
    },
  },
  certificateInEdit: null,
  basicInfos: [
    { name: '考号', position: null },
    { name: '姓名', position: null },
    { name: '性别', position: null },
    { name: '身份证号', position: null },
    { name: '出生时间', position: null },
    { name: '当前级别', position: null },
    { name: '报考级别', position: null },
    { name: '申请带色', position: null },
    { name: '指导教练', position: null },
    { name: '考试时间', position: null },
    { name: '考试地点', position: null },
  ],
}

const certificate = handleActions(
  {
    [GET_CERTIFICATE]: (state, { payload }) => {
      const content = JSON.parse(payload.content)
      return {
        ...state,
        certificateInEdit: payload,
        basicInfos: content.basicInfos,
        remark: content.remark,
      }
    },
    [GET_CERTIFICATE_LIST]: (state, { payload }) => {
      return flow(
        set(`certificateList`, payload.data),
        set(`total`, payload.totalRecords)
      )(state)
    },
    [CERTIFICATE_UPDATE_FILTER]: (state, { payload }) => {
      return set(`filter[${payload.field}]`, payload.value, state)
    },
    [UPDATE_BASIC_INFO]: (state, { payload }) => {
      const { position, name } = payload
      const basicInfos = deepClone(state.basicInfos)
      const oldIndex = basicInfos.findIndex(
        (item) => item.position === position
      )
      if (oldIndex > -1) {
        basicInfos[oldIndex].position = null
      }
      const index = basicInfos.findIndex((item) => item.name === name)
      if (index > -1) {
        basicInfos[index].position = position
      }
      return {
        ...state,
        basicInfos,
      }
    },
    [RESET_CERTIFICATE]: () => {
      return initState
    },
  },
  initState
)

export default certificate
