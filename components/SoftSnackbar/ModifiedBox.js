import React, { forwardRef } from "react";
import PropTypes from "prop-types";

const getColor = (color) => {
    const colors = {
        transparent: 'transparent',
        white: '#FFFFFF',
        black: '#000000',
        primary: '#1d8cf8',
        secondary: '#f4b400',
        info: '#00bcd4',
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        light: '#f5f5f5',
        dark: '#212121',
        text: '#333333',
        // Add grey scale colors
        'grey-100': '#f5f5f5',
        'grey-200': '#eeeeee',
        'grey-300': '#e0e0e0',
        'grey-400': '#bdbdbd',
        'grey-500': '#9e9e9e',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
    };
    return colors[color] || color;
};

const getBorderRadius = (radius) => {
    const radii = {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        xxl: '24px',
        section: '32px',
    };
    return radii[radius] || radius;
};

const getBoxShadow = (shadow) => {
    const shadows = {
        xs: '0px 1px 2px rgba(0, 0, 0, 0.05)',
        sm: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0px 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0px 20px 25px rgba(0, 0, 0, 0.1)',
        xxl: '0px 25px 50px rgba(0, 0, 0, 0.2)',
        inset: 'inset 0px 2px 4px rgba(0, 0, 0, 0.1)',
    };
    return shadows[shadow] || shadow;
};
const getGradient = (bgColor) => {
    const gradients = {
        primary: "linear-gradient(90deg, #1d8cf8, #3358f4)",
        secondary: "linear-gradient(90deg, #f4b400, #f5a623)",
        info: "linear-gradient(90deg, #00bcd4, #0abde3)",
        success: "linear-gradient(90deg, #4caf50, #66bb6a)",
        warning: "linear-gradient(90deg, #ff9800, #ffb74d)",
        error: "linear-gradient(90deg, #f44336, #ef5350)",
        dark: "linear-gradient(90deg, #212121, #424242)",
        light: "linear-gradient(90deg, #f5f5f5, #eeeeee)",
    };
    return gradients[bgColor] || bgColor;
};

const ModifiedBox = forwardRef(
    ({ variant, bgColor, color, opacity, borderRadius, shadow, children, ...rest }, ref) => {


        const styles = {
            opacity,
            background: variant === "gradient" ? getGradient(bgColor) : bgColor,
            color: getColor(color),
            borderRadius: getBorderRadius(borderRadius),
            boxShadow: getBoxShadow(shadow),
            display: 'flex', // Added to align content similarly
            flexDirection: 'column', // Align items vertically
            padding: '8px', // Default padding, adjust as needed
            ...rest.style, // Spread any additional inline styles passed via props
        };

        return (
            <div className="kapil" ref={ref} style={styles} >
                {children}
            </div>
        );
    }
);

// Setting default values for the props of ModifiedBox
ModifiedBox.defaultProps = {
    variant: "contained",
    bgColor: "transparent",
    color: "dark",
    opacity: 1,
    borderRadius: "0px",
    shadow: "none",
};

// Typechecking props for ModifiedBox
ModifiedBox.propTypes = {
    variant: PropTypes.oneOf(["contained", "gradient"]),
    bgColor: PropTypes.string,
    color: PropTypes.string,
    opacity: PropTypes.number,
    borderRadius: PropTypes.string,
    shadow: PropTypes.string,
    children: PropTypes.node,
};

export default ModifiedBox;
