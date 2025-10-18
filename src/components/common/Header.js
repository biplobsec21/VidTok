// src/components/common/Header.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { typography } from '../../themes/typography';
import { spacing } from '../../themes/spacing';

const Header = ({ title, subtitle, rightComponent }) => {
    const renderTitle = () => {
        if (typeof title === 'string') {
            return <Text style={styles.title}>{title}</Text>;
        }
        return title;
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderTitle()}
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            {rightComponent && (
                <View style={styles.rightContainer}>
                    {rightComponent}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
        paddingBottom: spacing.lg,
        backgroundColor: colors.background,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        ...typography.h1,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    subtitle: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    rightContainer: {
        marginLeft: spacing.md,
    },
});

export default Header;