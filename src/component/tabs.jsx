import React from 'react';
import styled from "styled-components";
import Text from "./text";

const TabsWrapper = styled.div`    
    .tabs-wrapper {
        display: flex;
        overflow: auto;
        column-gap: 8px;
        border-bottom: 1px solid #EFF1F3;
    }
    
    .children-wrapper {
        width: 100%;
        padding-top: 32px;
    }
`;

const Tab = styled.div`
    cursor: pointer;
    padding: 0 12px 0 12px;
    
    &.active {
        .tab-title {
            font-weight: 700;
            color: #4B40EE;
            padding-bottom: 12px;
        }
    }
    
    &.active::after {
        content: "";
        display: block;
        width: 100%;
        height: 2px;
        background-color: #4B40EE;
    }
`;

const Tabs = ({ tabsConfig = [], className, childProps }) => {
    const [activeIndex, setActiveIndex] = React.useState(1);

    const handleTabClick = (index) => {
        setActiveIndex(index);
    }

    const Child = tabsConfig[activeIndex]?.children;

    if (tabsConfig.length === 0) {
        return null;
    }

    return (
        <TabsWrapper className={className}>
            <div className="tabs-wrapper">
                {tabsConfig.map((tab, index) => (
                    <Tab
                        key={tab.id}
                        onClick={() => handleTabClick(index)}
                        className={`tab ${activeIndex === index ? 'active' : 'inactive'}`}
                    >
                        <Text className="tab-title">{tab.title}</Text>
                    </Tab>
                ))}
            </div>
            <div className="children-wrapper">
                {Child ? <Child {...childProps} /> : null}
            </div>
        </TabsWrapper>
    );
}

export default Tabs;
