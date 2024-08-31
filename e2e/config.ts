import axios from 'axios'
import 'dotenv/config'

export const BASE_PAGE_URL = process.env.BASE_URL
export const BASE_URL = 'http://localhost:5173'

export const apiTest = axios.create({
  baseURL: BASE_PAGE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
