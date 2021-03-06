import React, { useState } from 'react';
import { Button, DialogActions, DialogTitle } from '@material-ui/core';

import Dialog from 'elements/Dialog';
import SaleRegistrationCard from 'components/registerProduct/SaleRegistrationCard';
import ProductApi from 'apis/ProductApi';
import UploadApi from 'apis/UploadApi';

import baseImage from 'assets/images/gamza.jpg';

const SaleRegistrationModal = ({
  toolTipsOpen,
  handleCloseTooltips,
  products,
  setProducts,
}) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [place, setPlace] = useState('');
  const [profileUrl, setProfileUrl] = useState(baseImage);

  const clearField = () => {
    setName('');
    setPrice(0);
    setContent('');
    setProfileUrl(baseImage);
    setPlace('');
  };

  const handleOnCloseTooltips = () => {
    handleCloseTooltips();
    clearField();
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleOnChangePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleOnChangeContent = (event) => {
    setContent(event.target.value);
  };

  const handleOnClickPlace = (event) => {
    setPlace(event.target.value);
  };

  const onClickRegisterButton = async () => {
    if (!(name && price)) {
      alert('정보를 입력해주세요!');
      return;
    }
    try {
      await ProductApi.registerProduct(name, price, content, profileUrl, place);
    } catch (error) {
      alert(error.response.data.message);
    }
    clearField();
    handleCloseTooltips();
    setProducts(
      products.concat({
        id: products.length + 1,
        name,
        price,
        content,
        profile_url: profileUrl,
        place,
      }),
    );
    window.location.reload();
  };

  const fileOnChange = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const response = await UploadApi.uploadFile(formData);
    setProfileUrl(response.data.data);
  };
  return (
    <Dialog
      toolTipsOpen={toolTipsOpen}
      handleCloseTooltips={handleCloseTooltips}
    >
      <DialogTitle id="alert-dialog-slide-title">상품 등록하기</DialogTitle>
      <SaleRegistrationCard
        name={name}
        price={price}
        content={content}
        place={place}
        handleChange={handleChange}
        handleOnChangePrice={handleOnChangePrice}
        handleOnChangeContent={handleOnChangeContent}
        handleOnClickPlace={handleOnClickPlace}
        profileUrl={profileUrl}
        fileOnChange={fileOnChange}
      />
      <DialogActions>
        <Button onClick={handleOnCloseTooltips} color="primary">
          취소하기
        </Button>
        <Button onClick={onClickRegisterButton} color="primary">
          등록하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default SaleRegistrationModal;
