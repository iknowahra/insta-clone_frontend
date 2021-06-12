import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Animation = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
`;

const Loader = styled.div`
  border: ${(props) =>
    props.size
      ? `${(16 / props.size) * 3}px solid #f3f3f3`
      : '16px solid #f3f3f3'}; /* Light grey */
  border-top: ${(props) =>
    props.size
      ? `${(16 / props.size) * 3}px solid #3498db`
      : '16px solid #3498db'}; /* Blue */
  border-radius: 50%;
  width: ${(props) => (props.size ? `${props.size}px` : '120px')};
  height: ${(props) => (props.size ? `${props.size}px` : '120px')};
  animation: ${Animation} 3s linear infinite;
`;

const Presenter = ({ size }) => <Loader size={size} />;

Presenter.propTypes = {
  size: PropTypes.number,
};

export default Presenter;
