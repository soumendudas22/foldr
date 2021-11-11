import * as actions from '@util/action.type';

export const addBookmark = ({ collection_Id, title, page_Id, url, bookmark_Id }) => {
  return {
    type: actions.ADD_URL,
    payload: { collection_Id, title, page_Id, url, bookmark_Id }
  }
}

export const deleteBookmark = ({ collection_Id, page_Id, bookmark_Id }) => {
  return {
    type: actions.DELETE_URL,
    payload: { collection_Id, page_Id, bookmark_Id }
  }
}

export const updateBookmark = ({ collection_Id, title, page_Id, url, bookmark_Id }) => {
  return {
    type: actions.UPDATE_URL,
    payload: { collection_Id, title, page_Id, url, bookmark_Id }
  }
}