import '@components/404/404.css';
import { Image, Text, Button, HomeIcon } from "evergreen-ui";
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (<>
    <div className="not-found-wrapper">
      <div className="not-found-content">
        <Image src='404.png' height={300} width={500} />
        <Text fontSize={20} fontWeight='bold' color='grey'>PAGE NOT FOUND</Text>
        <Button appearance="primary" iconBefore={HomeIcon} marginTop={15} textDecoration='none'>
          <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}>HOME</Link>
        </Button>
      </div>
    </div>
  </>);
}