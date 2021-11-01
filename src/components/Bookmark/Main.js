import "@components/Bookmark/Bookmark.css";
import { BookmarkIcon } from "evergreen-ui";
import { useEffect } from "react";
import { useState } from "react";

export default function Bookmark({ bookmark }) {
  const [bookmarkState, setBookmarkState] = useState({
    title: '',
    url: ''
  });
  
  const [loaded, setLoaded] = useState(false);

  useEffect(()=>{
    setBookmarkState(bookmark);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[bookmark.bookmark_Id]);

  return(<div className="bookmark-wrapper">
    <a href={bookmarkState.url} target="_blank" rel="noreferrer" className="bookmark-link">
      <img height={16} width={16} src={`https://www.google.com/s2/favicons?domain=${bookmarkState.url}`} alt={ bookmarkState.title } style={loaded ? {} : { display: 'none' }} onLoad={()=>setLoaded(true)}/>
      <BookmarkIcon display={loaded ? "none": "inline"}/>
      <span style={{ marginLeft: 7 }}>{ bookmarkState.title }</span>
    </a>
  </div>);
}