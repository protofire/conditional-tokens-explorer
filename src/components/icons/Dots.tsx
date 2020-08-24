import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
  rect {
    fill: ${(props) => props.theme.colors.darkGrey};
  }
`

export const Dots: React.FC = (props) => (
  <Wrapper
    {...props}
    className="dots"
    height="16"
    viewBox="0 0 3.2 16"
    width="3.2"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="rotate(90 1.6 1.6)">
      <rect height="3.2" rx="1.6" transform="translate(12.8)" width="3.2" />
      <rect height="3.2" rx="1.6" transform="translate(6.4)" width="3.2" />
      <rect height="3.2" rx="1.6" width="3.2" />
    </g>
  </Wrapper>
)
