import React from 'react';

/**
 * Create React Element from a sring
 * @param {*} string HTML elements as string
 * @param {*} classNameRootElement Class to apply on root element
 * @param {*} rootElement Type of root element
 */
export function createJSXFromString(string, classNameRootElement, rootElement = "span") {
    return React.createElement(
        rootElement,
        {
            className: classNameRootElement,
            dangerouslySetInnerHTML: {
                __html: string
            }}
        )
}