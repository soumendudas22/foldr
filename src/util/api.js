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

  /**
   * Create a page
   * @param {string} title 
   * @returns 
   */
  CREATE_PAGE: (title, token) => {
    return axios.post(`${BASE_URL}/api/page`, {
      title
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Delete a page
   * @param {number} id 
   * @param {string} token
   * @returns 
   */
  DELETE_PAGE: async(id, basicAuth) => {
    return await fetch(`${BASE_URL}/api/page/`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${basicAuth}`,
      }),
      body: JSON.stringify({
        id: `${id}`
      }),
    })
      .then((res) => res.json())
  },

  /**
   * Delete a page
   * @param {number} id 
   * @param {string} token
   * @returns 
   */
  EDIT_PAGE: async(title, page_id, basicAuth) => {
    return await fetch(`${BASE_URL}/api/page`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${basicAuth}`,
      }),
      body: JSON.stringify({
        page: {
          title, page_id
        }
      }),
    })
      .then((res) => res.json())
  },

  GET_PAGE_DETAILS_FOR_ID: async(page_id, token) => {
    return axios.get(`${BASE_URL}/api/page/${page_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  }

}