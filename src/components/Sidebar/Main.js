import "@components/Sidebar/Sidebar.css";
import { Button, AddIcon, DeleteIcon, Tooltip, SendToIcon, FolderCloseIcon } from "evergreen-ui";
import { API } from "@util/api";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as page from "@actions/page.action";
import { store } from "@util/redux.store";
import { useForm } from "react-hook-form";

export default function Main({ open = true }) {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);
  const [isAddHidden, setAddHidden] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = data => {
    API.CREATE_PAGE(data.page, JSON.parse(localStorage.getItem("token")).token)
      .then((res) => {
        dispatch(page.addPage({
          page_Id: res.data.page_Id,
          title: res.data.title
        }));
        setPages(store.getState().bookmark.pages);
        setAddHidden(true);
        reset();
      })
  }

  useEffect(() => {
    API.GET_DEFAULT_INFO(JSON.parse(localStorage.getItem("token")).token)
      .then(res => {
        if (res.data.success) {
          dispatch(page.setPages(res.data.defaultInfo));
          setPages(res.data.defaultInfo);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pages.length]);

  const handleDelete = (id) => {
    API.DELETE_PAGE(id, JSON.parse(localStorage.getItem("token")).token)
      .then(() => {
        dispatch(page.deletePage({ page_Id: id }));
        setPages(store.getState().bookmark.pages);
      })
      .catch(err => {
        console.log('ERROR in deleting page: ', err);
      })
  }

  const handleEdit = (title, page_id) => {
    API.EDIT_PAGE(title, page_id, JSON.parse(localStorage.getItem("token")).token)
      .then(() => {
        dispatch(page.updatePage({ page_Id: page_id, title }));
        setPages(store.getState().bookmark.pages);
      })
      .catch(err => {
        console.log('ERROR in deleting page: ', err);
      })
  }

  const handleVisit = (id) => {
    API.GET_PAGE_DETAILS_FOR_ID(id, JSON.parse(localStorage.getItem("token")).token)
    .then(res=>{
      dispatch(page.setPageForId({ page_Id: id, page: res.data.page }));
      dispatch(page.selectedPage({ page_Id: id }));
    })
  }

  return (<>
    <div className="sidebar-main">
      <div id="pages">
        {pages.map((page) => (<div key={page.page_Id} className="pages">
          <div className="page-icon">
            <FolderCloseIcon marginRight={5} color="white" />
          </div>
          <Tooltip content={page.title} >
            <div className="page-title" contentEditable={true} suppressContentEditableWarning={true} onBlur={(e) => { handleEdit(e.currentTarget.textContent, page.page_Id) }}>{page.title}</div>
          </Tooltip>
          <div className="page-action">
            <button style={{ padding: '0 4px', backgroundColor: '#BD4B4B' }}
              onClick={() => handleDelete(page.page_Id)}><DeleteIcon color="white"/></button>
            <button style={{ padding: '0 4px', backgroundColor: '#5C7AEA' }}
              onClick={() => handleVisit(page.page_Id)}><SendToIcon color="white"/></button>
          </div>
        </div>))}
        <form id="page-form" onSubmit={handleSubmit(onSubmit)} style={isAddHidden ? { visibility: 'hidden' } : { visibility: 'visible' }}>
          <input type='text' {...register("page")} />
        </form>
      </div>
      <Button appearance="default" id="add-page-button" onClick={() => setAddHidden(false)}>
        <AddIcon marginRight={7} />
        Add Page
      </Button>
    </div>
  </>);
}