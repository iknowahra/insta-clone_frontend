import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.input`
  border: 0;
  border: ${(props) => props.theme.inputBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.bgColor};
  height: 38px;
  font-size: 12px;
  padding: 9px 0 7px 8px;
  ::placeholder {
    color: ${(props) => props.theme.darkGreyColor};
  }
`;

const Input = ({ placeholder }) => <Container placeholder={placeholder} />;

Input.propTypes = {
  placeholder: PropTypes.string.isRequired,
};

export default Input;
