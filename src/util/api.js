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
  DELETE_PAGE: async (id, basicAuth) => {
    return await fetch(`${BASE_URL}/api/page?id=${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${basicAuth}`,
      })
    })
      .then((res) => res.json())
  },

  /**
   * Delete a page
   * @param {number} id 
   * @param {string} token
   * @returns 
   */
  EDIT_PAGE: async (title, page_id, basicAuth) => {
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

  /**
   * Get page details for a page
   * @param {string} page_id
   * @param {string} token
   * @returns 
   */
  GET_PAGE_DETAILS_FOR_ID: async (page_id, token) => {
    return axios.get(`${BASE_URL}/api/page/${page_id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Delete a bookmark
   * @param {number} id 
   * @param {number} collectionid 
   * @param {number} pageid 
   * @param {string} basicAuth
   * @returns 
   */
  DELETE_BOOKMARK: async (id, collectionid, pageid, basicAuth) => {
    return await fetch(`${BASE_URL}/api/bookmark?id=${id}&collecctionid=${collectionid}&pageid=${pageid}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${basicAuth}`,
      })
    })
      .then((res) => res.json())
  },

  /**
   * Update a bookmark
   * @param {string} bookmark_id 
   * @param {string} title 
   * @param {string} collectionid 
   * @param {string} token 
   * @returns 
   */
  UPDATE_BOOKMARK: ({ bookmark_id, title, collectionid, token }) => {
    return axios.put(`${BASE_URL}/api/bookmark`, {
      bookmark: { bookmark_id, title },
      collectionid
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  /**
   * Add a bookmark
   * @param {string} pageid 
   * @param {string} url 
   * @param {string} collectionid 
   * @param {string} token 
   * @returns 
   */
  ADD_BOOKMARK: ({ pageid, url, collectionid, token }) => {
    return axios.post(`${BASE_URL}/api/bookmark`, {
      pageid,
      url,
      collectionid
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },

  ////////////////////////////// COLLECTION /////////////////////////////
  /**
   * Add a bookmark
   * @param {string} pageid 
   * @param {string} title 
   * @param {string} token 
   * @returns 
   */
  ADD_COLLECTION: ({ pageid, title, token }) => {
    return axios.post(`${BASE_URL}/api/collection`, {
      pageid,
      title
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  
  /**
   * Add a bookmark
   * @param {string} pageid 
   * @param {string} collectionid 
   * @param {string} token 
   * @returns 
   */
  DELETE_COLLECTION: async({ pageid, id, token }) => {
    return await fetch(`${BASE_URL}/api/collection?id=${id}&pageid=${pageid}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })
    })
    .then((res) => res.json());
  },
  
  /**
   * Add a bookmark
   * @param {string} pageid 
   * @param {string} collection_id 
   * @param {string} title 
   * @param {string} token 
   * @returns 
   */
  UPDATE_COLLECTION: ({ pageid, collection_id, title, token }) => {
    return axios.put(`${BASE_URL}/api/collection`, {
      collection: {
        collection_id,
        title
      },
      pageid
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  },
  
  
}