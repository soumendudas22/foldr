import * as actions from '@util/action.type';

export const addCollection = ({ collection_Id, title, page_Id }) => {
  return {
    type: actions.ADD_COLLECTION,
    payload: { collection_Id, title, page_Id }
  }
}

export const deleteCollection = ({ collection_Id, page_Id }) => {
  return {
    type: actions.DELETE_COLLECTION,
    payload: { collection_Id, page_Id }
  }
}

export const updateCollection = ({ collection_Id, title, page_Id }) => {
  return {
    type: actions.UPDATE_COLLECTION,
    payload: { collection_Id, title }
  }
}