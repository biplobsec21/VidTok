import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';
import { typography } from '../themes/typography';
import { spacing } from '../themes/spacing';

const DownloadProgressBar = ({ progress, downloaded, total, status }) => {
    const percentage = Math.round(progress * 100);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.status}>{status}</Text>
                <Text style={styles.percentage}>{percentage}%</Text>
            </View>

            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${percentage}%` }
                    ]}
                />
            </View>

            <View style={styles.footer}>
                <Text style={styles.sizeText}>
                    {downloaded} / {total}
                </Text>
                <Text style={styles.speedText}>
                    {percentage === 100 ? 'Completed' : 'Downloading...'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.card,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    status: {
        ...typography.captionBold,
        color: colors.text,
    },
    percentage: {
        ...typography.bodyBold,
        color: colors.primary,
    },
    progressBar: {
        height: 6,
        backgroundColor: colors.card,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: colors.primary,
        borderRadius: 3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacing.sm,
    },
    sizeText: {
        ...typography.small,
        color: colors.textSecondary,
    },
    speedText: {
        ...typography.small,
        color: colors.textSecondary,
    },
});

export default DownloadProgressBar;