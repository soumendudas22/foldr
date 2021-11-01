import { useSelector } from 'react-redux';
import Navbar from "@components/Navbar/Navbar";
import Sidebar from "@components/Sidebar/Main";
import Collections from '@components/Collections/Main';
import "./Home.css";


export default function Home() {
  const { name, picture } = useSelector(state => state.auth);

  return (<>
    <div id="background-home"></div>
    <div id="home-container">
      <div id="navbar">
        <Navbar name={name} picture={picture} />
      </div>
      <div id="sidebar">
        <Sidebar />
      </div>
      <div id="content">
        <Collections />
      </div>
    </div>
  </>)
}