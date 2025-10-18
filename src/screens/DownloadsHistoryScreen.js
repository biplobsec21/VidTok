import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';
import { typography } from '../themes/typography';
import { spacing } from '../themes/spacing';
import Header from '../components/common/Header';

const DownloadsHistoryScreen = () => {
    // TODO: Replace with actual download history data
    const downloadHistory = [];

    return (
        <View style={styles.container}>
            <Header
                title="Download History"
                subtitle="Your downloaded videos"
            />

            <ScrollView style={styles.scrollView}>
                {downloadHistory.length > 0 ? (
                    <Text style={styles.comingSoon}>Download history will appear here</Text>
                ) : (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyStateTitle}>No downloads yet</Text>
                        <Text style={styles.emptyStateText}>
                            Your downloaded videos will appear here
                        </Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
        padding: spacing.lg,
    },
    comingSoon: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
        marginTop: spacing.xl,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
    emptyStateTitle: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.sm,
    },
    emptyStateText: {
        ...typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
});

export default DownloadsHistoryScreen;