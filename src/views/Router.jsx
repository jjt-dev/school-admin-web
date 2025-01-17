import React from 'react'
import { Switch, Redirect } from 'react-router'
import { Route } from 'react-router-dom'
import Login from './Login'
import Parameter from './Parameter'
import CoachList from './Coach/CoachList'
import Coach from './Coach/Coach'
import ExamList from './Exam/ExamList'
import Exam from './Exam/Exam'
import ExamSign from './ExamSign/ExamSign'
import ExamSignList from './ExamSign/ExamSignList'
import ExamSignDetail from './ExamSign/ExamSignDetail'
import ExamGroup from './ExamGroup/ExamGroup'
import StudentExamGroup from './ExamGroup/StudentExamGroup'
import ExamineeList from './Examinee/ExamineeList'
import ExaminerList from './Examiner/ExaminerList'
import Examiner from './Examiner/Examiner'
import RoundAndRoom from './ExamGroup/RoundAndRoom'
import RoomList from './Room/RoomList'
import Room from './Room/Room'
import RoomAndExaminer from './ExamGroup/RoomAndExaminer'
import RoomAndExaminerList from './ExamGroup/RoomAndExaminerList'
import Examinee from './Examinee/Examinee'
import Certificates from './Certificate/Certificates'
import Certificate from './Certificate/Certificate'
import PrintExamCertif from './PrintExamCertif'
import PrintReport from './PrintReport'
import CoachClassList from './Coach/CoachClassList'
import Account from './Account'
import ResourcePool from './ResourcePool'

export const routes = [
  { path: '/login', comp: Login },
  {
    path: '/coaches',
    editPath: '/coach',
    title: '教练',
    titleProp: 'username',
    comp: CoachList,
  },
  {
    path: '/coach/:id/classes',
    editPath: '/coach/class',
    title: '教练班级',
    comp: CoachClassList,
    back: { path: '/coaches', breadcrumbs: ['教练管理', '教练班级'] },
  },
  {
    path: '/coach',
    title: '教练',
    comp: Coach,
    back: { path: '/coaches', breadcrumbs: ['教练管理', '新增教练'] },
  },
  {
    path: '/coach/:id',
    defaultPath: '/coach',
    title: '教练',
    comp: Coach,
    back: { path: '/coaches', breadcrumbs: ['教练管理', '编辑教练'] },
  },
  {
    path: '/exams',
    editPath: '/exam',
    title: '考试',
    titleProp: 'title',
    apiPath: '/examination',
    comp: ExamList,
  },
  {
    path: '/exam',
    title: '考试',
    comp: Exam,
    back: { path: '/exams', breadcrumbs: ['考试管理', '新增考试'] },
  },
  {
    path: '/exam/:id',
    title: '考试',
    comp: Exam,
    back: { path: '/exams', breadcrumbs: ['考试管理', '编辑考试'] },
  },
  {
    path: '/exam/:id/signs',
    comp: ExamSignList,
    back: {
      path: '/exams',
      breadcrumbs: ['考试管理', '报考列表'],
    },
  },
  {
    path: '/exam/:id/sign',
    comp: ExamSign,
    back: {
      path: '/exam/:id/signs',
      params: ['id'],
      breadcrumbs: ['考试管理', '报考列表', '人工报名'],
    },
  },
  {
    path: '/exam/:id/sign/:signId',
    comp: ExamSign,
    back: {
      path: '/exam/:id/signs',
      params: ['id'],
      breadcrumbs: ['考试管理', '报考列表', '编辑报名'],
    },
  },
  {
    path: '/exam/:id/resource-pool-sign/:signId',
    comp: ExamSign,
    back: {
      path: '/exam/:id/resource-pool',
      params: ['id'],
      breadcrumbs: ['考试管理', '资源池列表', '编辑报名'],
    },
  },
  {
    path: '/exam/:id/sign/:signId/detail',
    comp: ExamSignDetail,
    back: {
      path: '/exam/:id/signs',
      params: ['id'],
      breadcrumbs: ['考试管理', '报考列表', '报名详情'],
    },
  },
  {
    path: '/exam/:id/resource-pool-sign/:signId/detail',
    comp: ExamSignDetail,
    back: {
      path: '/exam/:id/resource-pool',
      params: ['id'],
      breadcrumbs: ['考试管理', '资源池列表', '报名详情'],
    },
  },
  {
    path: '/exam/:id/sign/:signId/print/exam-certif',
    comp: PrintExamCertif,
    back: {
      path: '/exam/:id/sign/:signId/detail',
      params: ['id', 'signId'],
      breadcrumbs: ['考试管理', '报考列表', '报名详情', '打印准考证'],
    },
    isPrintCertif: true,
  },
  {
    path: '/exam/:id/print-batch/exam-certif',
    comp: PrintExamCertif,
    back: {
      path: '/exam/:id/signs',
      params: ['id'],
      breadcrumbs: ['考试管理', '报考列表', '批量打印准考证'],
    },
    isPrintCertif: true,
  },
  {
    path: '/exam/:id/sign/:signId/print/report',
    comp: PrintReport,
    back: {
      path: '/exam/:id/sign/:signId/detail',
      params: ['id', 'signId'],
      breadcrumbs: ['考试管理', '报考列表', '报名详情', '打印成绩单'],
    },
  },
  {
    path: '/exam/:id/group',
    title: '考试分组',
    comp: ExamGroup,
    back: {
      path: '/exams',
      breadcrumbs: ['考试管理', '分组管理'],
    },
  },
  {
    path: '/exam/:id/group/:examGroupId',
    comp: StudentExamGroup,
    back: {
      path: '/exam/:id/group',
      params: ['id'],
      breadcrumbs: ['考试管理', '分组管理', '编辑考试分组'],
    },
  },
  {
    path: '/exam/:id/round-room',
    comp: RoundAndRoom,
    back: {
      path: '/exams',
      breadcrumbs: ['考试管理', '考场分配'],
    },
  },
  {
    path: '/exam/:id/room-examiner',
    comp: RoomAndExaminerList,
    back: {
      path: '/exams',
      breadcrumbs: ['考试管理', '考场与考官'],
    },
  },
  {
    path: '/exam/:id/room/:roomId/examiners',
    comp: RoomAndExaminer,
    back: {
      path: '/exam/:id/room-examiner',
      params: ['id'],
      breadcrumbs: ['考试管理', '分组管理', '考场与考官', '绑定考官'],
    },
  },
  {
    path: '/examinees',
    editPath: '/examinee',
    title: '考生',
    titleProp: 'username',
    comp: ExamineeList,
  },
  {
    path: '/examinee/:id',
    title: '考生',
    comp: Examinee,
    back: { path: '/examinees', breadcrumbs: ['考生管理', '考生详情'] },
  },
  {
    path: '/examiners',
    editPath: '/examiner',
    title: '考官',
    titleProp: 'username',
    comp: ExaminerList,
  },
  {
    path: '/examiner',
    title: '考官',
    comp: Examiner,
    back: { path: '/examiners', breadcrumbs: ['考官管理', '新增考官'] },
  },
  {
    path: '/examiner/:id',
    title: '考官',
    defaultPath: '/examiner',
    comp: Examiner,
    back: { path: '/examiners', breadcrumbs: ['考官管理', '编辑考官'] },
  },
  {
    path: '/rooms',
    editPath: '/room',
    apiPath: '/config/room',
    title: '考场',
    comp: RoomList,
  },
  {
    path: '/room',
    defaultPath: '/config/room',
    title: '考场',
    comp: Room,
    back: { path: '/rooms', breadcrumbs: ['考场管理', '新增考场'] },
  },
  {
    path: '/room/:id',
    defaultPath: '/config/room',
    title: '考场',
    comp: Room,
    back: { path: '/rooms', breadcrumbs: ['考场管理', '编辑考场'] },
  },
  {
    path: '/exam/:id/resource-pool',
    comp: ResourcePool,
    title: '资源池',
    back: {
      path: '/exams',
      breadcrumbs: ['考试管理', '资源池列表'],
    },
  },
  {
    path: '/certificate',
    comp: Certificate,
    back: {
      path: '/certificates',
      breadcrumbs: ['证书管理', '新增模板'],
    },
  },
  {
    path: '/certificate/:id',
    comp: Certificate,
    back: {
      path: '/certificates',
      breadcrumbs: ['证书管理', '模板管理'],
    },
  },
  { path: '/certificates', comp: Certificates },
  {
    path: '/parameter/:id',
    title: '学校',
    defaultPath: '/school',
    comp: Parameter,
  },
  {
    path: '/accounts',
    comp: Account,
  },
]

const Router = () => (
  <Switch>
    {routes.map((route) => {
      const { path, comp } = route
      return <Route key={path} path={path} exact component={comp} />
    })}
    <Redirect
      to={{
        pathname: '/coaches',
      }}
    />
  </Switch>
)

export default Router
