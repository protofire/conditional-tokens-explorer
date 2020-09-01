import React from 'react'
import styled from 'styled-components'

const outcomeDimensions = '24px'

export const Wrapper = styled.div`
  align-items: center;
  display: flex;

  &:last-child {
    .outcomeHorizontalLine {
      display: none;
    }
  }
`

export const OutcomeCircle = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkerGray};
  border-radius: 50%;
  border: 2px solid ${(props) => props.theme.colors.darkerGray};
  color: #fff;
  display: flex;
  font-size: 15px;
  font-weight: 700;
  height: ${outcomeDimensions};
  justify-content: center;
  line-height: 1;
  position: relative;
  user-select: none;
  width: ${outcomeDimensions};
`

export const OutcomeHorizontalLine = styled.div`
  background-color: ${(props) => props.theme.colors.darkerGray};
  height: 2px;
  width: 12px;
`

interface Props {
  id?: string
  makeDraggable?: boolean
  onClick?: () => void
  onDragEnd?: (e: any) => void
  onDragStart?: (e: any) => void
  outcome: string | number
}

export const Outcome: React.FC<Props> = (props) => {
  const { id, makeDraggable, onClick, onDragEnd, onDragStart, outcome, ...restProps } = props

  return (
    <Wrapper id={id} onClick={onClick} {...restProps}>
      <OutcomeCircle
        className="outcomeCircle"
        draggable={makeDraggable}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
      >
        {outcome}
      </OutcomeCircle>
      <OutcomeHorizontalLine className="outcomeHorizontalLine" />
    </Wrapper>
  )
}

export const DraggableOutcome = styled(Outcome)`
  cursor: pointer;

  .outcomeCircle {
    &:hover {
      background-color: ${(props) => props.theme.colors.error};
      border-color: ${(props) => props.theme.colors.error};
      color: #fff;
    }

    &.isDragging {
      background-color: #fff;
      border-color: ${(props) => props.theme.colors.darkerGray};
      cursor: move;
    }
  }
`

export const PlaceholderOutcome = styled(Outcome)`
  left: -100vw;
  opacity: 1;
  position: absolute;
  top: -100vh;
  z-index: -12345;

  .outcomeCircle {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  .outcomeHorizontalLine {
    display: none;
  }
`

export const EditableOutcome = styled(Outcome)`
  cursor: pointer;

  .outcomeCircle {
    background-color: #fff;
    border-style: solid;
    border-width: 2px;
    font-size: 16px;
    height: 28px;
    transition: all 0.15s ease-out;
    width: 28px;
  }

  .outcomeHorizontalLine {
    display: none;
  }
`

export const AddableOutcome = styled(EditableOutcome)`
  .outcomeCircle {
    border-color: ${(props) => props.theme.colors.mediumGrey};
    color: ${(props) => props.theme.colors.mediumGrey};

    &:hover {
      border-color: ${(props) => props.theme.colors.primary};
      color: ${(props) => props.theme.colors.primary};
    }
  }
`

export const RemovableOutcome = styled(EditableOutcome)`
  .outcomeCircle {
    border-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: ${(props) => props.theme.colors.error};
      border-color: ${(props) => props.theme.colors.error};
      color: #fff;
    }
  }
`
