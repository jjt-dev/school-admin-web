/**
 * 分页默认配置
 */
export const pagConfig = JSON.parse(
  JSON.stringify({
    size: 'small',
    showLessItems: true,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
  })
)

export const ExamStates = {
  0: '等待报名',
  10: '报名中',
  20: '等待考试',
  30: '考试中',
  40: '完成',
}

export const SignStates = {
  0: '待付款',
  10: '已支付等待分组',
  20: '已分组等待考试',
  30: '考试中',
  40: '考试结束',
}

export const EntityStatus = {
  CREATE: '新增',
  EDIT: '编辑',
}

export const Genders = {
  0: ' 女',
  1: '男',
}

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

export const timeFormat = 'YYYY-MM-DD HH:mm'
export const dateFormat = 'YYYY-MM-DD'

export const Relationships = {
  0: '父亲',
  1: '母亲',
  2: '爷爷',
  3: '奶奶',
  4: '外婆',
  5: '外公',
  6: '姐姐',
  7: '哥哥',
}

export const NumberByGroup = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export const GroupType = {
  0: '按照等级分组',
  1: '按照教练分组',
}

export const DefaultImgs = {
  examCertif: '/images/jjt/config/exam-certif-template.png',
  reportVertical: '/images/jjt/config/report-vertical-template.jpg',
  reportHoriz: '/images/jjt/config/report-horiz-template.jpg',
}
