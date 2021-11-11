import "@components/Bookmark/Bookmark.css";
import { BookmarkIcon, TrashIcon, EditIcon } from "evergreen-ui";
import { useEffect } from "react";
import { useState } from "react";
import { API } from "@util/api";
import { useForm } from "react-hook-form";

export default function Bookmark({ bookmark, collectionId, handleDelete }) {
  const [bookmarkState, setBookmarkState] = useState({
    title: '',
    url: ''
  });

  const [loaded, setLoaded] = useState(false);
  const [edittable, setEdittable] = useState(false);
  const { register, getValues } = useForm({
    mode: 'onBlur',
  });

  const formChanged = () => {
    const formValues = getValues();
    API.UPDATE_BOOKMARK({
      bookmark_id: bookmark.bookmark_Id,
      title: formValues.title,
      collectionid: collectionId,
      token: JSON.parse(localStorage.getItem("token")).token
    }).then((res) => {
      if (res.data.success) setBookmarkState({
        ...bookmarkState,
        title: formValues.title
      })
    })
  };

  useEffect(() => {
    setBookmarkState(bookmark);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookmark.bookmark_Id]);

  return (<div className="bookmark-wrapper">
    {edittable ? <form style={{
      boxSizing: 'border-box',
      width: '100%'
    }}>
      <textarea className="bookmark-input" {...register("title")} defaultValue={bookmarkState.title} onBlur={() => {
        formChanged();
        setEdittable(false);
      }}></textarea>
    </form> :
      <a href={bookmarkState.url} target="_blank" rel="noreferrer" className="bookmark-link">
        <img height={16} width={16} src={`https://www.google.com/s2/favicons?domain=${bookmarkState.url}`} alt={bookmarkState.title} style={loaded ? {} : { display: 'none' }} onLoad={() => setLoaded(true)} />
        <BookmarkIcon display={loaded ? "none" : "inline"} />
        <span style={{ marginLeft: 7 }} className="bookmark-title" >{bookmarkState.title}</span>
      </a>
    }

    <div className="bookmark-delete">
      <button onClick={() => setEdittable(!edittable)}>
        <EditIcon color="white" />
      </button>
      <button onClick={() => handleDelete(bookmark.bookmark_Id)}>
        <TrashIcon color="white" />
      </button>
    </div>
  </div>);
}