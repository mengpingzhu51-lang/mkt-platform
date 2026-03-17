import { http, HttpResponse } from 'msw'
import { subjectFixture } from '../fixtures/subject'
import type { CreateSubjectPayload, SubjectItem, UpdateSubjectPayload } from '../../types/subject'

let subjectStore: SubjectItem[] = [...subjectFixture]

function nowDate() {
  const now = new Date()
  const pad = (num: number) => String(num).padStart(2, '0')
  const year = now.getFullYear()
  const month = pad(now.getMonth() + 1)
  const day = pad(now.getDate())
  return `${year}-${month}-${day}`
}

function validateCreateRequired(payload: CreateSubjectPayload) {
  return !!(
    payload.subjectCode.trim() &&
    payload.subjectShortName.trim() &&
    payload.subjectFullName.trim()
  )
}

function validateUpdateRequired(payload: UpdateSubjectPayload) {
  return !!(payload.subjectCode.trim() && payload.subjectShortName.trim() && payload.subjectFullName.trim())
}

function hasDuplicate(payload: CreateSubjectPayload | UpdateSubjectPayload, excludeCode?: string) {
  return subjectStore.some((item) => {
    if (excludeCode && item.subjectCode === excludeCode) return false
    return (
      item.subjectCode === payload.subjectCode ||
      item.subjectShortName === payload.subjectShortName ||
      item.subjectFullName === payload.subjectFullName
    )
  })
}

export const subjectHandlers = [
  http.get('/marketing/show/tenant/tenantList', () => {
    return HttpResponse.json(subjectStore)
  }),
  http.post('/marketing/show/tenant/create', async ({ request }) => {
    const payload = (await request.json()) as CreateSubjectPayload
    if (!validateCreateRequired(payload)) {
      return HttpResponse.json({ message: '主体编码、主体简称、主体全称均为必填项' }, { status: 400 })
    }
    if (hasDuplicate(payload)) {
      return HttpResponse.json({ message: '主体编码、主体简称、主体全称必须唯一' }, { status: 409 })
    }

    const next: SubjectItem = {
      ...payload,
      updatedBy: '当前用户',
      updatedAt: nowDate()
    }
    subjectStore = [next, ...subjectStore]
    return HttpResponse.json(next)
  }),
  http.put('/marketing/show/tenant/update', async ({ request }) => {
    const payload = (await request.json()) as UpdateSubjectPayload
    if (!validateUpdateRequired(payload)) {
      return HttpResponse.json({ message: '主体简称、主体全称为必填项' }, { status: 400 })
    }
    if (hasDuplicate(payload, payload.subjectCode)) {
      return HttpResponse.json({ message: '主体简称、主体全称必须唯一' }, { status: 409 })
    }

    const targetIndex = subjectStore.findIndex((item) => item.subjectCode === payload.subjectCode)
    if (targetIndex < 0) {
      return HttpResponse.json({ message: '主体不存在或已被删除' }, { status: 404 })
    }

    const current = subjectStore[targetIndex]
    if (!current) {
      return HttpResponse.json({ message: '主体不存在或已被删除' }, { status: 404 })
    }

    const updated: SubjectItem = {
      ...current,
      subjectShortName: payload.subjectShortName,
      subjectFullName: payload.subjectFullName,
      updatedBy: '当前用户',
      updatedAt: nowDate()
    }
    subjectStore[targetIndex] = updated
    return HttpResponse.json(updated)
  })
]
