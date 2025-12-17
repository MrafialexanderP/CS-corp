import React from 'react';
import styled from 'styled-components';
import { useIsMobile } from '../hooks/use-mobile';

const ShowMoreButtonSimple = () => {
  const isMobile = useIsMobile();

  return (
    <StyledWrapper $isMobile={isMobile}>
      <button className="learn-more">
        <span className="circle" aria-hidden="true">
          <span className="icon arrow" />
        </span>
        <span className="button-text">Show More</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $isMobile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    position: relative;
    display: inline-block;
    cursor: pointer;
    outline: none;
    border: 0;
    vertical-align: middle;
    text-decoration: none;
    background: transparent;
    padding: 0;
    font-size: inherit;
    font-family: inherit;
  }

  button.learn-more {
    width: 12rem;
    height: auto;
  }

  button.learn-more .circle {
    transition: ${props => props.$isMobile ? 'none' : 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)'};
    position: relative;
    display: block;
    margin: 0;
    width: 3rem;
    height: 3rem;
    background: #1356b4;
    border-radius: 1.625rem;
  }

  button.learn-more .circle .icon {
    transition: ${props => props.$isMobile ? 'none' : 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)'};
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
  }

  button.learn-more .circle .icon.arrow {
    transition: ${props => props.$isMobile ? 'none' : 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)'};
    left: 0.625rem;
    width: 1.125rem;
    height: 0.125rem;
    background: none;
  }

  button.learn-more .circle .icon.arrow::before {
    position: absolute;
    content: "";
    top: -0.29rem;
    right: 0.0625rem;
    width: 0.625rem;
    height: 0.625rem;
    border-top: 0.125rem solid #fff;
    border-right: 0.125rem solid #fff;
    transform: rotate(45deg);
  }

  button.learn-more .button-text {
    transition: ${props => props.$isMobile ? 'none' : 'all 0.45s cubic-bezier(0.65, 0, 0.076, 1)'};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.75rem 0;
    margin: 0 0 0 1.85rem;
    color: #1356b4;
    font-weight: 700;
    line-height: 1.6;
    text-align: center;
    text-transform: uppercase;
  }

  ${props => !props.$isMobile && `
    button:hover .circle {
      width: 100%;
    }

    button:hover .circle .icon.arrow {
      background: #fff;
      transform: translate(1rem, 0);
    }

    button:hover .button-text {
      color: #fff;
    }
  `}

  @media (max-width: 640px) {
    button.learn-more {
      width: 10rem;
    }

    button.learn-more .circle {
      width: 2.75rem;
      height: 2.75rem;
    }

    button.learn-more .circle .icon.arrow {
      left: 0.55rem;
      width: 1rem;
    }

    button.learn-more .button-text {
      font-size: 0.85rem;
      padding: 0.65rem 0;
      margin: 0 0 0 1.6rem;
    }
  }
`;

export default ShowMoreButtonSimple;
