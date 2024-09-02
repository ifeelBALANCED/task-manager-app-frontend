import axios from 'axios'
import 'dotenv/config'

export const BASE_URL = process.env.VITE_BASE_URL

export const apiTest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
