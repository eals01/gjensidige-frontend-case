import styled, { css } from 'styled-components';
import { lookupTypeIcon } from '../../resources/typeIcons/typeIcons';

interface TypeIconProps {
  typeName: string;
  index?: number;
  stacked?: boolean;
}

export default function TypeIcon({
  typeName,
  index = 0,
  stacked = false
}: TypeIconProps) {
  const { image, color } = lookupTypeIcon(typeName);

  return (
    <TypeIconContainer color={color} index={index} stacked={stacked}>
      <Icon src={image} alt={`${typeName} type icon`} />
    </TypeIconContainer>
  );
}

interface TypeIconContainerProps {
  color: string;
  index: number;
  stacked: boolean;
}

const TypeIconContainer = styled('div')(
  ({ color, index, stacked }: TypeIconContainerProps) => css`
    z-index: ${10 - index};
    width: 1.2em;
    height: 1.2em;
    margin-left: ${stacked && '-0.4em'};

    display: flex;
    justify-content: center;
    align-items: center;

    background: ${color};
    border: 1px solid white;
    border-radius: 50%;
    box-shadow: 2px 1px 1px 0px #00000070;

    &:first-child {
      margin-left: 0;
    }
  `
);

const Icon = styled.img`
  height: 65%;
`;
