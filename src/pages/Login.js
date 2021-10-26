import GoogleButton from '@components/Login/GoogleLogin';
import { Pane, Image } from 'evergreen-ui';

export default function Login() {
  return (
    <>
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white'
      }}>
        <Pane
          width={300}
          height="auto"
          background="#ffffff"
          paddingTop={40}
          paddingBottom={40}
          borderRadius={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Pane
            width={200}
            height="auto"
            paddingTop={40}
            paddingBottom={40}
            borderRadius={4}
          >
            <Image src="logo128.png" />
            <div style={{ color: '#474d66', fontWeight: 'bold' }}>foldr</div>
            <div style={{ color: '#8f95b2', fontSize: 14 }}>Store and organize bookmarks</div>
          </Pane>
          <GoogleButton />
        </Pane>
      </div>
      <div className='design'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1240 320"><path fill="#00cba9" fillOpacity="1" d="M0,320L80,298.7C160,277,320,235,480,224C640,213,800,235,960,224C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
      </div>
    </>
  );
}