import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
} from '@material-ui/icons';
import { red } from '@material-ui/core/colors';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import HttpService from 'services/HttpService';
import AuthService from 'services/AuthService';
import formatDate from 'utils/DateUtils';
import 'containers/productList/ProductBoard.css';

import soldout from 'assets/images/soldout.jpg';

const { REACT_APP_API_URI } = process.env;

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    maxHeight: 600,
  },
  media: {
    height: 50,
    paddingTop: '56.25%', // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const shareButtonOnClick = () => {
  alert('링크가 복사되었습니다.');
};

const ProductList = (props) => {
  const classes = useStyles();
  const { product, setIsChanged } = props;
  const onClickFav = (productId) => {
    axios
      .put(
        `${REACT_APP_API_URI}/api/v1/product/like`,
        {
          productId,
        },
        HttpService.AuthorizationHeader(AuthService.getCurrentToken()),
      )
      .then((response) => {
        setIsChanged(response.data.data.id, response.data.data.isLike);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  return (
    <div key={product.id} className="card">
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={product.senderProfileUrl}
              aria-label={product.senderName}
              className={classes.avatar}
              alt={product.senderName}
            />
          }
          title={product.name}
          subheader={formatDate(product.createdDateTime)}
        />
        <Link to={`/board/detail/${product.id}`}>
          {product.isSold ? (
            // 판매 완료시
            <CardMedia
              className={classes.media}
              image={soldout}
              title={product.name}
            />
          ) : (
            // 아직 판매 중일 경우
            <CardMedia
              className={classes.media}
              image={product.profileUrl}
              title={product.name}
            />
          )}
        </Link>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {product.place === '' ? '미정' : product.place},{' '}
            {product.price <= 0 ? '무료나눔' : `${product.price}원`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => onClickFav(product.id)}
          >
            {product.isLike ? (
              <FavoriteIcon style={{ fill: 'red' }} />
            ) : (
              <FavoriteIcon />
            )}
          </IconButton>
          <CopyToClipboard
            text={`${window.location.href.split('?')[0]}/detail/${product.id}`}
          >
            <IconButton aria-label="share" onClick={shareButtonOnClick}>
              <ShareIcon />
            </IconButton>
          </CopyToClipboard>
        </CardActions>
      </Card>
    </div>
  );
};

export default ProductList;
