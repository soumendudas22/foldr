import { PaperclipIcon, ExpandAllIcon, RemoveIcon, Button, Image, Text, TextInputField, BookmarkIcon, toaster, Dialog, Pane, SideSheet } from "evergreen-ui";
import Bookmark from "@components/Bookmark/Main";
import { useEffect, useState } from "react";
import { API } from "@util/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as bm from "@actions/bookmark.action";

export default function Card({ collection, pageId, handleCollectionDelete }) {
  const [bookmarkState, setBookmarkState] = useState([]);
  const [collectionState, setCollecctionState] = useState(collection);
  const [enableAdd, setEnableAdd] = useState(false);
  const [isShown, setIsShown] = useState(false)
  const [showSidesheet, setShowSidesheet] = useState(false)
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setBookmarkState(collection?.bookmarks || []);
    setCollecctionState(collection);
    return(()=>{
      setCollecctionState([]);
    })
  }, [collection])

  const onSubmit = (data) => {
    API.ADD_BOOKMARK({
      pageid: pageId,
      url: data.url,
      collectionid: collection.collection_Id,
      token: JSON.parse(localStorage.getItem("token")).token
    })
      .then((res) => {
        setBookmarkState(prev => [...prev, {
          bookmark_Id: res.data.bookmark_Id,
          dateAdded: res.data.dateAdded,
          title: res.data.title,
          url: res.data.url
        }]);
      })
      .then(() => {
        setEnableAdd(false);
      })
      .catch(err => {
        console.log(err);
        toaster.danger(' 😢 Something went wrong trying to add Bookmark');
      })
  }

  const add = () => {
    setEnableAdd(prev => !prev);
  }

  const handleDelete = async (bookmarkId) => {
    API.DELETE_BOOKMARK(bookmarkId, collection?.collection_Id, pageId, JSON.parse(localStorage.getItem("token")).token)
      .then(() => {
        dispatch(bm.deleteBookmark({
          collection_Id: collection?.collection_Id,
          page_Id: pageId,
          bookmark_Id: bookmarkId
        }))
        setBookmarkState(prev => prev.filter(el => el.bookmark_Id !== bookmarkId))
      })
      .catch(err => {
        console.error(err);
        toaster.danger(' 😢 Something went wrong trying to delete Bookmark');
      })
  }

  const handleEdit = (title) => {
    console.log({
      pageid: pageId,
      collection_id: collection?.collection_Id,
      title,
      token: JSON.parse(localStorage.getItem("token")).token
    });
    API.UPDATE_COLLECTION({
      pageid: pageId,
      collection_id: collection?.collection_Id,
      title,
      token: JSON.parse(localStorage.getItem("token")).token
    })
      .then(() => {
        
      })
      .catch(err => {
        console.log('ERROR in editing page: ', err);
      })
  }

  return (<>
    <div className="card">
      <div className="card-top">
        <div>
          <span> <PaperclipIcon color="rgb(9, 77, 73)" /> </span><span
           contentEditable={true} 
           suppressContentEditableWarning={true} 
           onBlur={(e) => { handleEdit(e.currentTarget.textContent) }}
           style={{
             padding: 5
           }}
          >{collectionState?.title}</span>
        </div>
        <div className="card-actions">
          <div className="card-action-btn" onClick={() => setShowSidesheet(true)}><ExpandAllIcon /></div>
          <div className="card-action-btn" onClick={() => setIsShown(true)}><RemoveIcon /></div>
        </div>
      </div>
      {enableAdd ? <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            label="URL"
            hint="Enter the URL of the website you wish to bookmark."
            placeholder="e.g https://www.foldr.com"
            {...register('url')}
          />
          <Button appearance="primary" type="submit" iconBefore={BookmarkIcon}>
            SAVE
          </Button>
        </form>
      </div> : <div className="card-body">
        {bookmarkState.map((bookmark, index) => <Bookmark key={index} bookmark={bookmark} pageId={pageId} collectionId={collectionState?.collection_Id} handleDelete={handleDelete} />)}
        {bookmarkState.length === 0 ? <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4
        }}>
          <Image src="link.png" alt="Link icon" width={64} height={64} marginTop={15}/>
          <Text paddingX='15px' paddingY='20px'>No bookmarks exist. Add bookmarks to the collection.</Text>
        </div> : null}
      </div>}
      <div className="card-footer">
        <Button onClick={add}>{enableAdd ? 'Back' : 'Add Bookmark'}</Button>
      </div>
      <Pane>
        <Dialog
          isShown={isShown}
          title="Are you sure to delete the collection?"
          onCloseComplete={() => {
            setIsShown(false);
            handleCollectionDelete(collection?.collection_Id);
          }}
          confirmLabel="DELETE"
        >
          [NOTE] All the bookmarks under the collection will be lost.
        </Dialog>
      </Pane>
    </div>

    {/* SIDE PANE TO ENLARGE THE VIEW OF BOOKMARKS */}
    <SideSheet isShown={showSidesheet} onCloseComplete={() => setShowSidesheet(false)}>
      <div className="card-body">
        {bookmarkState.map((bookmark, index) => <Bookmark key={index} bookmark={bookmark} pageId={pageId} collectionId={collection?.collection_Id} handleDelete={handleDelete} />)}
        {bookmarkState.length === 0 ? <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          height: '90vh'
        }}>
          <Image src="link.png" alt="Link icon" width={64} height={64} />
          <Text paddingX='15px' paddingY='20px'>No bookmarks exist. Add bookmarks to the collection.</Text>
        </div> : null}
      </div>
    </SideSheet>
  </>);
}