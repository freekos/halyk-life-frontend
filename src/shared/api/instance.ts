import axios from 'axios'

// TODO: rewrite to environment driven approach
export const instance = axios.create({
	baseURL: 'https://65f7-46-235-72-49.ngrok-free.app/api/v1',
})
