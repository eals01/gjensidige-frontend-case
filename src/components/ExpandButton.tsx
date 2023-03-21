import { Dispatch, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

import arrow from '../resources/arrow.svg';

interface ExpandButtonProps {
  expanded: boolean;
  setExpanded: Dispatch<SetStateAction<boolean>>;
}

export default function ExpandButton({
  expanded,
  setExpanded
}: ExpandButtonProps) {
  return (
    <ExpandButtonContainer
      onClick={() => setExpanded((oldExpanded) => !oldExpanded)}
    >
      <motion.img
        src={arrow}
        alt='arrow'
        animate={{ rotateZ: expanded ? 180 : 0 }}
        transition={{ duration: 0.25 }}
      />
    </ExpandButtonContainer>
  );
}

const ExpandButtonContainer = styled.div`
  position: absolute;
  top: 0;
  left: -50px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 50px;
  height: 50px;
  background: #e7e7e730;

  &:hover {
    background: #c6c6c625;
  }

  > img {
    height: 60%;
  }
`;
