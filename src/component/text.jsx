import React from 'react';

const Text = ({
    tag,
    children,
    className,
}) => {
    const defaultTag = tag ?? 'p';

    return React.createElement(
        defaultTag,
        {
            className,
        },
        children
    );
}

export default Text;
