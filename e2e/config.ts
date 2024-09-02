import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const CI_ENABLED = process.env.VITE_CI === 'true'
const PORT = CI_ENABLED ? 4173 : 5173
export const BASE_URL = `http://localhost:${PORT}`

export const apiTest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
