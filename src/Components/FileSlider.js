import React, { useState } from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';

const MyImg = styled.img`
  max-height: 450px;
`;

export default ({ files }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      {files && (
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          controls={files.length > 1}
          indicators={files.length > 1}
        >
          {files.map((file) => (
            <Carousel.Item key={file.url}>
              <MyImg className="d-block w-100" src={file.url} alt={file.id} />
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};
