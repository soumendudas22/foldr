import { Avatar, Pane, LogOutIcon, Button, Image, Text } from "evergreen-ui";
import { parseJwt } from '@util/auth.interceptor';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as auth from '@actions/auth.action';
import * as page from '@actions/page.action';

export default function Navbar({ name, picture }) {
  const tokenId = localStorage.getItem("tokenId");
  const history = useHistory();
  const dispatch = useDispatch();

  if ((tokenId !== undefined && tokenId !== null) && (name === '' && name !== undefined && name !== null) && (picture === '' && picture !== undefined && picture !== null)) {
    const auth = parseJwt(tokenId);
    name = auth.name;
    picture = auth.picture;
  }

  const routeChange = () => {
    localStorage.clear();
    dispatch(auth.loginSuccess({ email: '', exp: 0, name: '', picture: '', success: false }));
    history.replace('/login');
    dispatch(page.reset());
  }

  return (<>
    <div style={{
      width: '100%',
      height: 50,
      backgroundColor: '#00CBA9',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image src="logo32.png" userSelect="none" />
          <Text color="white" fontWeight="bold" fontSize={24} marginLeft={7} letterSpacing={1} userSelect="none">foldr</Text>
        </div>
      </div>
      <div>
        <Pane
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginRight={10}
        >
          <Avatar
            src={picture}
            name={name}
            size={40}
            marginRight={10}
          />
          <Button appearance="default" onClick={routeChange}><LogOutIcon marginRight={7} />Logout</Button>
        </Pane>
      </div>
    </div>
  </>);
}