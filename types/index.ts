// Contact form types
export interface ContactFormData {
  name: string
  email: string
  message: string
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

