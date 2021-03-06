import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const DEFAULT =
  'https://i1.wp.com/talentedfish.com/wp-content/uploads/2019/04/no-avatar.jpg?ssl=1';
const getSize = (size) => {
  let number;
  if (size === 'sm') {
    number = 30;
  } else if (size === 'smd') {
    number = 45;
  } else if (size === 'md') {
    number = 60;
  } else if (size === 'lg') {
    number = 150;
  } else {
    number = size;
  }
  return `
        width:${number}px;
        height:${number}px;
        `;
};

const Container = styled.div`
  ${(props) => getSize(props.size)}
  background-image:url(${(props) => props.url});
  background-size: cover;
  border-radius: 50%;
  border: ${(props) => props.theme.boxBorder};
`;

const Avatar = ({ size = 'sm', url }) => {
  return <Container size={size} url={url || DEFAULT} />;
};

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
};

export default Avatar;
