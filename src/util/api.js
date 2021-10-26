import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const API = {
  /**
   * 👉 Get default info from token
   * @param {string} token 
   * @returns {object}
   */
  GET_DEFAULT_INFO: async (token) => {
    return axios.get(`${BASE_URL}/api/page`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Get tokens from google tokens
   * @param {string} idtoken 
   * @returns 
   */
  GET_TOKENS_FROM_GOOGLE_TOKEN: (idtoken) => {
    return axios.post(`${BASE_URL}/api/auth/googlelogin`, {
      IdToken: idtoken
    });
  },

  /**
   * Get refrest tokens
   * @param {string} idtoken 
   * @returns 
   */
  GENERATE_REFRESH_TOKENS: (idtoken) => {
    return axios.post(`${BASE_URL}/api/auth/refreshtoken`, {
      IdToken: idtoken
    });
  },

  CREATE_PAGE: (title) => {
    return axios.post(`${BASE_URL}/api/page`, {
      title
    });
  }

}