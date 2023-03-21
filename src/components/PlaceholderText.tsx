import { ReactNode } from 'react';
import styled from 'styled-components';

import pikachuIcon from '../resources/pikachuIcon.svg';

interface PlaceHolderTextProps {
  text: string;
}

export default function PlaceholderText({ text }: PlaceHolderTextProps) {
  return (
    <PlaceholderTextContainer>
      <span>{text}</span>
      <img src={pikachuIcon} alt='pikachu icon' />
    </PlaceholderTextContainer>
  );
}

const PlaceholderTextContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  max-width: 250px;
  padding: 0 1em;
  text-align: center;
  pointer-events: none;

  > img {
    height: 2em;
  }

  > span {
    font-weight: bold;
    color: #c5c5c5;
  }
`;
