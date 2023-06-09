import styled from 'styled-components';

interface FooterProps {
  handleDraw: () => void;
}

export default function Footer({ handleDraw }: FooterProps) {
  return (
    <FooterContainer>
      <DrawButton onClick={handleDraw}>Trekk nytt kort</DrawButton>
    </FooterContainer>
  );
}

const FooterContainer = styled.div`
  z-index: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 4em;
  background: #141414;
`;

const DrawButton = styled.button`
  padding: 1em;
  font-weight: bold;
  border: none;
  border-radius: 0;
  background: #a0a0a0;

  &:hover {
    background: #e7e7e7;
  }
`;
