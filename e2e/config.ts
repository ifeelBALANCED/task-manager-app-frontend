import axios from 'axios'
import 'dotenv/config'

export const BASE_URL =
  process.env.VITE_BASE_URL || `http://localhost:${process.env.VITE_CI ? 4173 : 5173}`

export const apiTest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
