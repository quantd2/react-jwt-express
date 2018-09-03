import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
var baseURL = '';
if (isProduction) {
  baseURL = 'http://localhost:3001/';
} else {
  baseURL = 'http://localhost:3001/';
}

const axiosClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
});

axiosClient.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

const getAccessToken = () => {
  let authToken = window.localStorage.getItem('authToken');
  if (authToken) {
    return authToken;
  }
  return null;
};

export default axiosClient;
