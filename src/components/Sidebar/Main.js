import "@components/Sidebar/Sidebar.css";
import { Button, AddIcon, EditIcon, ModalIcon, DeleteIcon, Tooltip } from "evergreen-ui";
import { API } from "@util/api";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import * as page from "@actions/page.action";

export default function Main({ open = true }) {
  const dispatch = useDispatch();
  const [pages, setPages] = useState([]);

  useEffect(() => {
    API.GET_DEFAULT_INFO(JSON.parse(localStorage.getItem("token")).token)
      .then(res => {
        if (res.data.success) {
          dispatch(page.setPages(res.data.defaultInfo));
          setPages(res.data.defaultInfo);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (<>
    <div className="sidebar-main">
      <div id="pages">
        {pages.map((page, index) => (<div key={index} className="pages">
          <div className="page-icon">
            <ModalIcon marginRight={5} color="white" />
          </div>
          <Tooltip content={page.title}>
            <div className="page-title">{page.title}</div>
          </Tooltip>
          <div className="page-action">
            <button><EditIcon /></button>
            <button style={{ padding:'0 4px' }}><DeleteIcon/></button>
          </div>
        </div>))}
      </div>
      <Button appearance="default" id="add-page-button">
        <AddIcon marginRight={7} />
        Add Page
      </Button>
    </div>
  </>);
}