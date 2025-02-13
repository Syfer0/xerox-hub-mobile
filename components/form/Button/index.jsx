import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableHighlight } from 'react-native';
import colors from '../../../utils/colors';

/**
 * Button component for styled buttons.
 * 
 * @param {Object} props - Component props.
 * @param {string} props.title - The text to display on the button.
 * @param {'mini' | 'small' | 'medium' | 'large'} [props.size='medium'] - The button size.
 * @param {keyof typeof colors} [props.color='primary'] - Button background color (from predefined color palette).
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {() => void} props.onPress - Callback function for button press.
 */
const Button = ({
    title,
    size = 'medium',
    variant = 'contained',
    color = 'primary',
    disabled = false,
    onPress = () => { },
    style = { button: {}, text: {} }
}) => {
    const { buttonStyle, textStyle } = getSize(size, color, disabled);
    const variantStyle = getVariant(disabled ? "disabled" : variant)

    return (
        <TouchableHighlight
            underlayColor={variantStyle.underlayColor}
            style={[styles.button, variantStyle.button, buttonStyle, style.button]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.text, variantStyle.text, textStyle, style.text]}>{title}</Text>
        </TouchableHighlight>
    );
};

export default Button;

/**
 * Helper function to determine styles.
 * 
 * @param {'mini' | 'small' | 'medium' | 'large'} size - The button size.
 * @param {keyof typeof colors} color - Button background color.
 * @param {boolean} disabled - Whether the button is disabled.
 * @returns {Object} - Button and text style objects.
 */
const getSize = (size) => {

    const sizes = {
        mini: {
            buttonStyle: { paddingVertical: 12, paddingHorizontal: 8, borderRadius: 8 },
            textStyle: { fontSize: 12, fontWeight: 600 },
        },
        small: {
            buttonStyle: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 8 },
            textStyle: { fontSize: 14, fontWeight: 600 },
        },
        medium: {
            buttonStyle: { paddingVertical: 16, paddingHorizontal: 12, borderRadius: 8 },
            textStyle: { fontSize: 16, fontWeight: 600 },
        },
        large: {
            buttonStyle: { paddingVertical: 20, paddingHorizontal: 16, borderRadius: 48 },
            textStyle: { fontSize: 18, fontWeight: 600 },
        },
    };

    const { buttonStyle, textStyle } = sizes[size] || sizes.medium;

    return {
        buttonStyle: { ...buttonStyle },
        textStyle: { ...textStyle, fontWeight: '500' },
    };
};

const getVariant = variant => {
    // borderWidth and its color
    const variants = {
        contained: {
            button: { backgroundColor: colors.primary, borderColor: colors.primary },
            text: { color: colors.white },
            underlayColor: colors.primaryDark
        },
        outlined: {
            button: { backgroundColor: colors.white, borderColor: colors.primary },
            text: { color: colors.primary },
            underlayColor: colors.primaryLight

        },
        'outlined-dark': {
            button: { backgroundColor: colors.transparent, borderColor: colors.black },
            text: { color: colors.black },
            underlayColor: colors.grayLight

        },
        text: {
            button: { backgroundColor: colors.transparent, borderColor: colors.transparent },
            text: { color: colors.primary },
            underlayColor: colors.gray

        },
        disabled: {
            button: { backgroundColor: colors.grayLight, borderColor: colors.grayLight },
            text: { color: colors.gray },
        },
    }

    const variantStyle = variants[variant] || variants.contained;
    return variantStyle
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        borderWidth: 1,
        minWidth: 90
    },
    text: {
        fontWeight: '500',
    },
});
