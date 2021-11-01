import { PaperclipIcon, ExpandAllIcon, RemoveIcon, Button, Image, Text } from "evergreen-ui";
import Bookmark from "@components/Bookmark/Main";

export default function Card({ collection }) {

  const bookmarks = collection?.bookmarks || [];
  
  return (<>
    <div className="card">
      <div className="card-top">
        <span> <PaperclipIcon color="rgb(9, 77, 73)" /> {collection?.title}</span>
        <div className="card-actions">
          <div className="card-action-btn"><ExpandAllIcon /></div>
          <div className="card-action-btn"><RemoveIcon /></div>
        </div>
      </div>
      <div className="card-body">
        {bookmarks.map((bookmark, index) => <Bookmark key={index} bookmark={bookmark} />)}
        {bookmarks.length === 0 ? <div style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4
        }}>
          <Image src="link.png" alt="Link icon" width={64} height={64}/>
          <Text paddingX='15px' paddingY='20px'>No bookmarks exist. Add bookmarks to the collection.</Text>
        </div> : null}
      </div>
      <div className="card-footer">
        <Button>Add Bookmark</Button>
      </div>
    </div>
  </>);
}