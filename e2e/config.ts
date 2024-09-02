import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

export const BASE_URL = `http://localhost:5173`

export const apiTest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
