// lib/types.ts
export interface Student {
  id: string
  name: string
  matricNumber: string
  department: string
  email: string
  phone: string
  registeredAt: string
  status: 'active' | 'inactive'
}

export interface VerificationLog {
  id: string
  studentName: string
  matricNumber: string
  timestamp: string
  status: 'success' | 'failed'
  location: string
  confidence?: number
}

export interface VerificationResponse {
  success: boolean
  message: string
  student?: {
    id: string
    name: string
    matricNumber: string
    department: string
  }
  timestamp?: string
}