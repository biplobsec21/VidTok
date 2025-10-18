import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { typography } from '../../themes/typography';
import { spacing } from '../../themes/spacing';

const Loader = ({ size = 'large', message, style }) => {
    return (
        <View style={[styles.container, style]}>
            <ActivityIndicator size={size} color={colors.primary} />
            {message && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.xl,
    },
    message: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: spacing.md,
        textAlign: 'center',
    },
});

export default Loader;