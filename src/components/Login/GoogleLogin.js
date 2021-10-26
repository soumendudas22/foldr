import { useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { API } from "./../../util/api";
import { useState } from 'react';
import * as auth from '@actions/auth.action';
import { useDispatch } from 'react-redux';
import { jwtInterceptor, parseJwt } from '@util/auth.interceptor';
import { useHistory } from "react-router-dom";

export default function GoogleLoginButton() {
  const [tokenId, setTokenId] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
    jwtInterceptor();
  },[])

  useEffect(() => {
    if (tokenId.length !== 0) {
      API.GET_TOKENS_FROM_GOOGLE_TOKEN(tokenId)
        .then((res) => {
          if(res.data.success) {
            localStorage.setItem("tokenId", tokenId);
            localStorage.setItem("token", JSON.stringify(res.data));
            const { email, exp, name, picture } = parseJwt(tokenId);
            dispatch(auth.loginSuccess({email, exp, name, picture}));
            history.replace('/home');
          } else {
            dispatch(auth.loginFail(res.data.errors));
          }
        })
        .catch(err=>{
          console.error('ERROR', err);
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId])

  return (<>
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText='Login with Google'
      onSuccess={(res) => { 
        localStorage.removeItem("token");
        localStorage.removeItem("tokenId");
        setTokenId(res.tokenId)
      }}
      onFailure={(res) => { 
        localStorage.removeItem("token");
        localStorage.removeItem("tokenId");
        console.log('FAIL!', res);
      }} ></GoogleLogin>
  </>);
}