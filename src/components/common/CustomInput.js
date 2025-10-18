import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { typography } from '../../themes/typography';
import { spacing } from '../../themes/spacing';

const CustomInput = ({
    label,
    value,
    onChangeText,
    placeholder,
    error,
    multiline = false,
    containerStyle,
    ...props
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={[
                    styles.input,
                    multiline && styles.multiline,
                    error && styles.inputError,
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                multiline={multiline}
                textAlignVertical={multiline ? 'top' : 'center'}
                selectionColor={colors.primary}
                {...props}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },
    label: {
        ...typography.captionBold,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    input: {
        backgroundColor: colors.surface,
        borderWidth: 2,
        borderColor: colors.card,
        borderRadius: 12,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        color: colors.text,
        ...typography.body,
        minHeight: 52,
    },
    multiline: {
        minHeight: 100,
        paddingTop: spacing.md,
    },
    inputError: {
        borderColor: colors.error,
    },
    errorText: {
        ...typography.small,
        color: colors.error,
        marginTop: spacing.xs,
        marginLeft: spacing.xs,
    },
});

export default CustomInput;