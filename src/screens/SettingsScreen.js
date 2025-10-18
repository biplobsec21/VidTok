import React from 'react';
import { View, Text, ScrollView, Switch, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';
import { typography } from '../themes/typography';
import { spacing } from '../themes/spacing';
import Header from '../components/common/Header';

const SettingsScreen = () => {
    const [notifications, setNotifications] = React.useState(true);
    const [autoDownload, setAutoDownload] = React.useState(false);
    const [highQuality, setHighQuality] = React.useState(true);

    return (
        <View style={styles.container}>
            <Header
                title="Settings"
                subtitle="Customize your app experience"
            />

            <ScrollView style={styles.scrollView}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Download Settings</Text>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>High Quality</Text>
                            <Text style={styles.settingDescription}>
                                Download videos in highest available quality
                            </Text>
                        </View>
                        <Switch
                            value={highQuality}
                            onValueChange={setHighQuality}
                            trackColor={{ false: colors.card, true: colors.primary }}
                            thumbColor={colors.text}
                        />
                    </View>

                    <View style={styles.settingItem}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Auto Download</Text>
                            <Text style={styles.settingDescription}>
                                Automatically start download after processing
                            </Text>
                        </View>
                        <Switch
                            value={autoDownload}
                            onValueChange={setAutoDownload}
                            trackColor={{ false: colors.card, true: colors.primary }}
                            thumbColor={colors.text}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>About</Text>

                    <View style={styles.aboutItem}>
                        <Text style={styles.aboutLabel}>Version</Text>
                        <Text style={styles.aboutValue}>1.0.0</Text>
                    </View>
                </View>
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
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.md,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.card,
    },
    settingInfo: {
        flex: 1,
        marginRight: spacing.md,
    },
    settingTitle: {
        ...typography.bodyBold,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    settingDescription: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    aboutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.card,
    },
    aboutLabel: {
        ...typography.bodyBold,
        color: colors.text,
    },
    aboutValue: {
        ...typography.body,
        color: colors.textSecondary,
    },
});

export default SettingsScreen;