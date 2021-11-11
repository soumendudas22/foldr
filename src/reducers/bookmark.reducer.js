import * as actions from '@util/action.type';
import produce from "immer";

const initialState = {
  pages: [],
  selected_page: {
    page_Id: 0,
    collections: []
  }
}

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
        pages: state.pages.filter(page => page.page_Id !== action.payload.page_Id)
      };

    case actions.UPDATE_PAGE:
      return produce(state, draft => {
        const page = draft.pages.find(page => page.page_Id === action.payload.page_Id);
        page.title = action.payload.title;
      });

    case actions.SET_PAGES:
      return {
        ...state,
        pages: action.payload.pages
      }

    case actions.SET_PAGE:
      return produce(state, draft => {
        let index = draft.pages.findIndex(page => page.page_Id === action.payload.page_Id);
        draft.pages[index] = action.payload.page;
      });

    case actions.SELECTED_PAGE:
      return produce(state, draft => {
        let page = draft.pages.find(page => page.page_Id === action.payload.page_Id);
        draft.selected_page = page;
      });

    case actions.DELETE_URL:
      return produce(state, draft => {
        const pageIndex = draft.pages.findIndex(page => page.page_Id === action.payload.page_Id);
        const collectionIndex = draft.pages[pageIndex].collections.findIndex(coll => coll.collection_Id === action.payload.collection_Id);
        draft.pages[pageIndex].collections[collectionIndex].bookmarks.filter(bm => bm.bookmark_Id === action.payload.collection_Id);
      });

    case actions.RESET:
      return {
        ...initialState
      };

    default: return state;
  }
}

export default bookmarkReducer;