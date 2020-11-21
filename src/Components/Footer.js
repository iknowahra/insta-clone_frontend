/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import styled from 'styled-components';

const Footer = styled.footer`
  position: relative;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  font-size: 12px;
  width: 100%;
  padding: 0 16px;
  margin: 50px 0 52px;
  top: 60px;
`;

const List = styled.ul`
  display: flex;
  justify-content: center;
  margin: 5px 16px;
  flex-wrap: wrap;
  align-items: stretch;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 20px;
    margin-bottom: 10px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkGreyColor};
`;

const Copyright = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">About</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Blog</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Jobs</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Help</Link>
      </ListItem>
      <ListItem>
        <Link href="#">API</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Privacy</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Terms</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Top Accounts</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Hashtags</Link>
      </ListItem>
      <ListItem>
        <Link href="#">Locations</Link>
      </ListItem>
    </List>
    <Copyright>© {new Date().getFullYear()} Instagram from Facebook</Copyright>
  </Footer>
);
