import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from './Loader';

const Container = styled.div`
  width: ${({ size }) => (size ? `${size}px` : '100%')};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  font-weight: 600;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.inactiveBlueColor : theme.blueColor};
  text-align: center;
  padding: 7px 0px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;

const Button = ({
  text,
  onClick,
  size,
  disabled = false,
  type,
  loading = false,
}) => {
  return (
    <Container
      onClick={disabled ? null : onClick}
      size={size}
      disabled={disabled}
      type={type}
    >
      {loading ? <Loader size={15} /> : text}
    </Container>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.number,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
};

export default Button;
