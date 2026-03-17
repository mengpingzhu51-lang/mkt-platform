import http from '../http'
import type { CreateSubjectPayload, SubjectItem, UpdateSubjectPayload } from '../../types/subject'

export function fetchSubjectList() {
  return http.get<never, SubjectItem[]>('/show/tenant/tenantList')
}

export function createSubject(payload: CreateSubjectPayload) {
  return http.post<CreateSubjectPayload, SubjectItem>('/show/tenant/create', payload)
}

export function updateSubject(payload: UpdateSubjectPayload) {
  return http.put<UpdateSubjectPayload, SubjectItem>('/show/tenant/update', payload)
}
