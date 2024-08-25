import styled from "styled-components";
import Text from "../../component/text";

export const StyledHeader = styled(Text)`
    font-size: 70px;
    font-weight: 400;
    color: #1A243A;
    margin-top: 16px;
    margin-bottom: 16px;
    
    &::after {
        content: "USD";
        font-size: 24px;
        font-weight: 400;
        color: #BDBEBF;
        position: relative;
        top: -32px;
    }
`;

export const PriceChange = styled(Text)`
    font-size: 16px;
    font-weight: 400;
    color: ${({ color }) => color};
`;
