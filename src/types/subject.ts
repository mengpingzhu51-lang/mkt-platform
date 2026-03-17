export interface SubjectItem {
  subjectCode: string
  subjectShortName: string
  subjectFullName: string
  updatedBy: string
  updatedAt: string
}

export interface CreateSubjectPayload {
  subjectCode: string
  subjectShortName: string
  subjectFullName: string
}

export interface UpdateSubjectPayload {
  subjectCode: string
  subjectShortName: string
  subjectFullName: string
}
