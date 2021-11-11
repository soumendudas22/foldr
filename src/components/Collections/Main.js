import '@components/Collections/Collection.css';
import Card from "@components/Collections/Card";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';
import { CubeAddIcon, Button, Pane, toaster, Image, Text } from "evergreen-ui";
import { useForm } from "react-hook-form";
import { API } from '@util/api';
import { useDispatch } from 'react-redux';
import * as collectionAction from "@actions/collection.action";

export default function Collections() {
  const page = useSelector(state => state.bookmark.selected_page);
  const [collections, setCollections] = useState([]);
  const [enableAdd, setEnableAdd] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  useEffect(() => {
    setCollections(page.collections);
    return (() => {
      setCollections([])
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.page_Id]);

  const handleCollectionDelete = (id) => {
    API.DELETE_COLLECTION({
      pageid: page.page_Id,
      id,
      token: JSON.parse(localStorage.getItem("token")).token
    })
      .then(() => {
        dispatch(collectionAction.deleteCollection({
          page_Id: page.page_Id,
          collection_Id: id
        }))
        setCollections(prev => prev.filter(el => el.collection_Id !== id));
        toaster.success('✔ Collection successfully deleted.');
      })
      .catch(err => {
        console.log('ERROR IN DELETING COLLECTIONS', err);
        toaster.danger(' 😢 Something went wrong trying to delete Collection');
      })
  }

  const onSubmit = (data) => {
    API.ADD_COLLECTION({
      pageid: page.page_Id,
      title: data.title,
      token: JSON.parse(localStorage.getItem("token")).token
    })
      .then(res => {
        if (res.status === 201) {
          dispatch(collectionAction.addCollection({
            ...res.data,
            page_Id: page.page_Id
          }))
          setCollections(prev => [...prev, {
            ...res.data
          }])
          toaster.success('Collection successfully created.');
        } else {
          throw new Error('Not able to add collection');
        }
        setEnableAdd(false);
      })
      .catch(err => {
        console.log('ERROR IN ADDING COLLECTIONS', err);
        toaster.danger(' 😢 Something went wrong trying to add Collection');
      })
      .finally(() => {
        reset();
      })
  }

  return (<div id="collections-wrapper">
    {
      page.page_Id === 0 ? <div style={{
        display: 'grid',
        placeItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image src="empty-folder.png" alt="" height={200} width={200} />
          <Text fontSize={20} color='grey' marginTop={10}>Your collection looks empty. Add some pages to add collection. </Text>
        </div>
      </div> : (enableAdd ? <div>
        <div className="add-collection">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="collection-name">NEW COLLECTION</label>
              <input
                type="text"
                name='collection-name'
                placeholder="e.g FAVORITES"
                {...register('title')}
              />
              <div className="helper-text">Enter the title of the collection you wish to save.</div>
            </div>
            <Button appearance="primary" type="submit" iconBefore={CubeAddIcon}>
              SAVE
            </Button>
          </form>
        </div>
      </div> : <div className="add-collection">
        <Pane marginBottom={20} color='rgb(50, 177, 166)' fontWeight='bold' letterSpacing='1px'>ADD COLLECTION</Pane>
        <Button size="large"><CubeAddIcon height="50px" color='black' onClick={() => { setEnableAdd(true) }} /></Button>
      </div>)
    }
    {collections.map((collection, index) => <Card key={index} collection={collection} pageId={page.page_Id} handleCollectionDelete={handleCollectionDelete} />)}

  </div>);
}