import '@components/Collections/Collection.css';
import Card from "@components/Collections/Card";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { useEffect } from 'react';

export default function Collections() {
  const page = useSelector(state => state.bookmark.selected_page);
  const [collections, setCollections] = useState([]);
  
  useEffect(()=>{
    setCollections(page.collections);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page.page_Id]);

  return (<div id="collections-wrapper">
    { collections.map((collection, index)=><Card key={index} collection={collection}/>) }
</div>);
}