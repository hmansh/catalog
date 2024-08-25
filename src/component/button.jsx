import React from 'react';
import styled from "styled-components";

const DefaultButton = styled.button`
    border: none;
    padding: 8px 16px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-radius: 6px;
    
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 8px;
    
    background-color: ${({ variant }) => variant === 'primary' ? '#4B40EE' : 'white'};
    color: ${({ variant }) => variant === 'primary' ? 'white' : '#1A243A'};
    
    &:hover {
        ${({ variant }) => variant === 'primary' ? 'background-color: #2516ff;' : 'background-color: #e2e2e2;'}
    }
    
    &:active {
        ${({ variant }) => variant === 'primary' ? 'background-color: #2516ff;' : 'background-color: #e2e2e2;'}
    }
    
    &:disabled {
        ${({ variant }) => variant === 'primary' ? 'background-color: #655bf4;' : 'background-color: #e2e2e2;'}
    }
    
    &:focus {
        outline: none;
    }
`;

const Button = ({
    children,
    onClick,
    className,
    variant = 'primary',
    ...props
}) => {
    return (
        <DefaultButton
            variant={variant}
            onClick={onClick}
            className={className}
            {...props}
        >
            {children}
        </DefaultButton>
    )
};

export default Button;
