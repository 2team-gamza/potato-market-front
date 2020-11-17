import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import querystring from 'querystring';

const { REACT_APP_API_URI, REACT_APP_REDIRECT_URI } = process.env;

const GoogleAuthCallback = () => {
  const history = useHistory();
  useEffect(() => {
    if (window.location.search) {
      const { code } = querystring.parse(window.location.search);
      axios
        .get(
          `${REACT_APP_API_URI}/api/v1/auth/google?code=${code}&redirectUri=${REACT_APP_REDIRECT_URI}`,
        )
        .then((response) => {
          if (response.data.data.type === 'SIGN_UP') {
            history.push('/auth/signup');
            return;
          }
          localStorage.setItem('token', response.data.data.token);
          history.push('/auth/login');
        })
        .catch(() => {
          alert('에러가 발생하였습니다');
          history.push('/auth/login');
        });
    }
  });

  return <>Loading</>;
};

export default GoogleAuthCallback;