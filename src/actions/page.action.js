import * as actions from '@util/action.type';

export const addPage = ({ page_Id, title }) => {
  return {
    type: actions.ADD_PAGE,
    payload: { page_Id, title }
  }
}

export const deletePage = ({ page_Id }) => {
  return {
    type: actions.DELETE_PAGE,
    payload: { page_Id }
  }
}

export const updatePage = ({ page_Id, title }) => {
  return {
    type: actions.UPDATE_PAGE,
    payload: { page_Id, title }
  }
}

export const setPages = (pages) => {
  return {
    type: actions.SET_PAGES,
    payload: { pages }
  }
}

export const setPageForId = ({page_Id, page}) => {
  return {
    type: actions.SET_PAGE,
    payload: { page_Id, page }
  }
}

export const selectedPage = ({page_Id}) => {
  return {
    type: actions.SELECTED_PAGE,
    payload: { page_Id }
  }
}

export const reset = () => {
  return {
    type: actions.RESET
  }
}