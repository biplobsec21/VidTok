// src/components/common/CustomButton.js
import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../themes/colors';
import { typography } from '../../themes/typography';
import { spacing } from '../../themes/spacing';

const CustomButton = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    icon,
    style,
    textStyle,
}) => {
    const renderButtonContent = () => (
        <View style={styles.content}>
            {loading ? (
                <ActivityIndicator
                    color={variant === 'outline' ? colors.primary : colors.text}
                    size="small"
                />
            ) : (
                <>
                    {icon && <View style={styles.iconContainer}>{icon}</View>}
                    <Text style={[
                        styles.text,
                        variant === 'outline' && styles.outlineText,
                        variant === 'secondary' && styles.secondaryText,
                        textStyle
                    ]}>
                        {title}
                    </Text>
                </>
            )}
        </View>
    );

    if (variant === 'primary') {
        return (
            <TouchableOpacity
                style={[
                    styles.button,
                    styles.primaryButton,
                    disabled && styles.disabledButton,
                    style
                ]}
                onPress={onPress}
                disabled={disabled || loading}
            >
                <LinearGradient
                    colors={colors.gradient.primary}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    {renderButtonContent()}
                </LinearGradient>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={[
                styles.button,
                variant === 'secondary' && styles.secondaryButton,
                variant === 'outline' && styles.outlineButton,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled || loading}
        >
            {renderButtonContent()}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 12,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        overflow: 'hidden',
    },
    secondaryButton: {
        backgroundColor: colors.secondary,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.primary,
    },
    disabledButton: {
        opacity: 0.6,
    },
    gradient: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        marginRight: spacing.sm,
    },
    text: {
        ...typography.bodyBold,
        color: colors.text,
        textAlign: 'center',
    },
    outlineText: {
        color: colors.primary,
    },
    secondaryText: {
        color: colors.text,
    },
});

export default CustomButton;