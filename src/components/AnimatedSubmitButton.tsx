import React from 'react';
import styled from 'styled-components';
import { Loader } from 'lucide-react';

interface AnimatedSubmitButtonProps {
  onClick?: (e: React.FormEvent) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const AnimatedSubmitButton: React.FC<AnimatedSubmitButtonProps> = ({ 
  onClick, 
  disabled = false, 
  isLoading = false 
}) => {
  return (
    <StyledWrapper>
      <button 
        type="submit" 
        onClick={onClick}
        disabled={disabled || isLoading}
        className={`${disabled || isLoading ? 'disabled' : ''} ${isLoading ? 'loading' : ''}`}
      >
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            {isLoading ? (
              <Loader size={24} className="animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                <path fill="none" d="M0 0h24v24H0z" />
                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
              </svg>
            )}
          </div>
        </div>
        <span>{isLoading ? '' : 'Submit'}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    font-family: inherit;
    font-size: 18px;
    font-weight: 600;
    background: linear-gradient(90deg, #EB670E 0%, #2A3582 100%);
    color: white;
    padding: 0.7em 1.2em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 50px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
    width: 100%;
    gap: 0.5em;
  }

  button.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  button.disabled:hover .svg-wrapper {
    animation: none;
  }

  button.disabled:hover svg {
    transform: none;
  }

  button.disabled:hover span {
    transform: none;
  }

  button.loading {
    padding: 0.7em !important;
    padding-left: 0.7em !important;
  }

  button.loading span {
    display: none;
  }

  button:not(.disabled):hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
    width: 24px;
    height: 24px;
  }

  button:not(.disabled):hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:not(.disabled):hover span {
    transform: translateX(5em);
  }

  button:active:not(.disabled) {
    transform: scale(0.95);
  }

  button:active:not(.disabled) span {
    transform: translateX(50em);
    opacity: 0;
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }
`;

export default AnimatedSubmitButton;
