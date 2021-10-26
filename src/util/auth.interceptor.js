import axios from 'axios';

const isLoggedIn = () => {
  const token = localStorage.getItem("token") || "";
  return token !== "";
}

export function jwtInterceptor() {
  axios.interceptors.request.use(
    request => {
      console.log('workingg......')
      if (isLoggedIn()) request.headers.common.Authorization = `Bearer ${localStorage.getItem("token")}`;
      return request;
    }
  )

  axios.interceptors.response.use(response => {
    return response;
  }, err => {
    return new Promise((resolve, reject) => {
      const originalReq = err.config;
      if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        originalReq._retry = true;
        let res = fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/refreshtoken`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrer: 'no-referrer',
          body: JSON.stringify({
            token: JSON.parse(localStorage.getItem("token")).token,
            refreshToken: JSON.parse(localStorage.getItem("token")).refreshToken
          }),
        }).then(res => res.json()).then(res => {
          console.log('AFTER INTERCEPT',res);
          this.setSession({ token: res.token, refreshToken: res.refreshToken });
          return axios(originalReq);
        });
  
        resolve(res);
      }
  
      return Promise.reject(err);
    });
  });
}

export function parseJwt(token) {
  if (!token) {
    return null
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  return JSON.parse(window.atob(base64))
}