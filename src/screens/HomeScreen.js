// src/screens/HomeScreen.js
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import Header from '../components/common/Header';
import PlatformCard from '../components/PlatformCard';
import { PLATFORM_LIST } from '../config/platforms.config';

const HomeScreen = ({ navigation }) => {
    const handlePlatformPress = (platform) => {
        navigation.navigate(platform.name, { platform });
    };

    return (
        <View style={styles.container}>
            <Header
                title="Video Downloader"
                subtitle="Download videos from your favorite platforms"
            />

            <ScrollView style={styles.scrollView}>
                <View style={styles.platformsContainer}>
                    {PLATFORM_LIST.map((platform) => (
                        <PlatformCard
                            key={platform.key}
                            platform={platform}
                            onPress={() => handlePlatformPress(platform)}
                        />
                    ))}
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
    },
    platformsContainer: {
        padding: spacing.lg,
    },
});

export default HomeScreen;