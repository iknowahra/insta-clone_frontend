import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

/* todo : 1. input autoscroll 2. suggestion 3. tag must be one of friends list */

const InputTag = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const Input = styled.input`
  border: none;
  width: 40%;
  height: 85%;
  padding: 6px 1px;
  margin-top: 2px;
`;

const InputTagUl = styled.ul`
  display: inline-flex;
  flex-wrap: wrap;
  margin: 3px;
  padding: 0;
  width: 100%;
`;

const InputTagLi = styled.li`
  align-items: center;
  background: ${({ theme }) => theme.blueColor};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: white;
  display: flex;
  font-weight: 300;
  list-style: none;
  margin-bottom: 2px;
  margin-right: 2px;
  padding: 6px 3px 6px 6px;
  height: 30px;
`;

const InputTagLiCover = styled.li`
  list-style: none;
  padding-top: 2px;
`;

const Close = styled.button`
  background: ${({ theme }) => theme.blueColor};
  color: white;
  border: none;
`;

export default ({
  reset,
  invited = [],
  invitedId = [],
  onInvite,
  findUser,
}) => {
  const inputRef = useRef();
  const [tags, setTags] = useState([invited]);
  const [toIds, setToIds] = useState([]);
  const onFocus = () => {
    inputRef.current.focus();
  };
  const handleDelete = (i) => {
    const filteredtags = [...tags].filter((tag, index) => index !== i);
    const filteredIds = [...toIds].filter((id, index) => index !== i);
    setTags(filteredtags);
    setToIds(filteredIds);
    onInvite(filteredtags, filteredIds);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === 'Backspace' && !val) {
      handleDelete(tags.length - 1);
    } else if (val || e.key === 'Enter') {
      findUser(val);
    }
  };

  useEffect(() => {
    inputRef.current.value = null;
  }, [reset]);

  useEffect(() => {
    setTags(invited);
  }, [invited]);

  return (
    <InputTag onClick={() => onFocus()}>
      <InputTagUl>
        {tags.map((tag, i) => (
          <InputTagLi key={tag}>
            {tag}
            <Close onClick={() => handleDelete(i)}>
              <CloseOutlined style={{ color: 'white', fontSize: '0.8em' }} />
            </Close>
          </InputTagLi>
        ))}

        <InputTagLiCover>
          <Input
            type="text"
            onKeyDown={inputKeyDown}
            ref={inputRef}
            autoFocus
            placeholder="Search..."
          />
        </InputTagLiCover>
      </InputTagUl>
    </InputTag>
  );
};
