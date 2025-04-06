import axios from "axios";

const api = axios.create({
  baseURL: 'https://7b83-2804-14c-3bac-18dc-35a9-ec4d-c6d-a640.ngrok-free.app',
  timeout: 30000,
  
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhNzMzYTMxZi01MjI4LTRhZDUtYWU5OC05YTFkODJmNDQ0ZjUiLCJpYXQiOjE3NDM4NjYxNDAsImV4cCI6MTc0NDQ3MDk0MH0.ymqHqJ07NrW8PJne0W_zicG5OUpPNDTY7wHKxbQGrec'
  }
});

export default api;