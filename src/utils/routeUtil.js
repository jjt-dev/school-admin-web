import { buildParameters } from './common'

/**
 * exam sign
 */
export const routeExamSignList = (examId) => `/exam/${examId}/signs`

export const routeExamSign = (examId) => `/exam/${examId}/sign`

export const routePrintExamCertif = (examId, params) =>
  buildParameters(`/exam/${examId}/print-batch/exam-certif`, params)
