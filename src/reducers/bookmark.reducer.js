import * as actions from '@util/action.type';
import produce from "immer";

const initialState = {
  pages: []
}

// const pageObj = {
//   page_Id: 0,
//   title: '',
//   collections: []
// }

// const collectionObj = {
//   collection_Id: 0,
//   title: '',
//   bookmarks: []
// }

// const bookmarkObj = {
//   bookmark_Id: 0,
//   title: '',
//   url: '',
//   dateAdded: ''
// }

const getPageIndex = (id, state) => state.pages.findIndex(x => x.page_Id === id);

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_PAGE: 
    return produce(state, draft => {
      draft.pages.push({
        page_Id: action.payload.page_Id,
        title: action.payload.title,
        collections: []
      });
    });

    case actions.DELETE_PAGE:
      return { 
        ...state, 
        pages: state.pages.filter(page=>page.page_Id!==getPageIndex(action.payload.page_Id, state)) 
      };

    case actions.UPDATE_PAGE:
      return produce(state, draft=> {
        const page = draft.find(page => page.page_Id === action.payload.page_Id);
        page.title = action.payload.title;
      });

    case actions.SET_PAGES:
      return {
        ...state,
        pages: action.payload.pages
      }
    default: return state;
  }
}

export default bookmarkReducer;