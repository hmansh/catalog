import React from 'react';
import Container from "./container";
import Text from "./text";

const EmptyState = () => {
    return (
        <Container
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItem: 'center',
                justifyContent: 'center'
            }}
        >
            <Text>Empty State</Text>
        </Container>
    )
}

export default EmptyState;
