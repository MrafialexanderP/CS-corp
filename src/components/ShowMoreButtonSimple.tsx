import React from 'react';
import styled from 'styled-components';

const ShowMoreButtonSimple = () => {
  return (
    <StyledWrapper>
      <button className="simple-button">
        <span className="button-text">Show More</span>
        <svg 
          className="arrow-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2rem 0;

  button.simple-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    background: transparent;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #000000;
    transition: all 0.3s ease;
  }

  button.simple-button:hover {
    opacity: 0.7;
    transform: translateX(5px);
  }

  .button-text {
    font-family: inherit;
  }

  .arrow-icon {
    transition: transform 0.3s ease;
  }

  button.simple-button:hover .arrow-icon {
    transform: translateX(5px);
  }

  @media (max-width: 640px) {
    button.simple-button {
      font-size: 0.9rem;
    }

    .arrow-icon {
      width: 18px;
      height: 18px;
    }
  }
`;

export default ShowMoreButtonSimple;
