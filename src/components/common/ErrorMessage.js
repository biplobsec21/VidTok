import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { typography } from '../../themes/typography';
import { spacing } from '../../themes/spacing';

const ErrorMessage = ({ message, onRetry, style }) => {
    return (
        <View style={[styles.container, style]}>
            <Text style={styles.message}>{message}</Text>
            {onRetry && (
                <Text style={styles.retryText} onPress={onRetry}>
                    Tap to retry
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
        backgroundColor: colors.surface,
        borderRadius: 12,
        margin: spacing.md,
    },
    message: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginBottom: spacing.sm,
    },
    retryText: {
        ...typography.captionBold,
        color: colors.primary,
        textAlign: 'center',
    },
});

export default ErrorMessage;