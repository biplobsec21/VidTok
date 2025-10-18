import React, { useState } from 'react'; // Add useState import
import { View, ScrollView, Alert, StyleSheet, Text } from 'react-native';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import Header from '../components/common/Header';
import DownloadInputForm from '../components/DownloadInputForm';
import VideoPreview from '../components/VideoPreview';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { PLATFORMS } from '../config/platforms.config';

const TikTokScreen = ({ route, navigation }) => {
    const { platform = PLATFORMS.TIKTOK } = route.params;
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState('');

    const handleProcessUrl = async () => {
        if (!url.trim()) {
            setError('Please enter a valid TikTok URL');
            return;
        }

        // Validate TikTok URL
        if (!platform.regex.test(url)) {
            setError('Please enter a valid TikTok video URL');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // TODO: Replace with TikTok API call
            // const response = await tiktokApi.processUrl(url);
            // setVideoInfo(response.data);

            // Mock response for now
            setTimeout(() => {
                setVideoInfo({
                    title: 'TikTok Video - Fun Dance Challenge',
                    thumbnail: null,
                    duration: '0:45',
                    quality: '720p',
                    size: '12.3 MB',
                    author: '@tiktokuser',
                    music: 'Original Sound',
                });
                setLoading(false);
            }, 1800);

        } catch (err) {
            setError('Failed to process TikTok URL. Please check the URL and try again.');
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!videoInfo) return;

        setDownloading(true);
        try {
            // TODO: Replace with download API call
            // await tiktokApi.downloadVideo(url, videoInfo);

            // Mock download
            setTimeout(() => {
                Alert.alert('Success', 'TikTok video downloaded successfully!');
                setDownloading(false);
                // Reset form
                setUrl('');
                setVideoInfo(null);
                navigation.navigate('Downloads');
            }, 2500);

        } catch (err) {
            Alert.alert('Error', 'Download failed. Please try again.');
            setDownloading(false);
        }
    };

    const handleRetry = () => {
        setError('');
        setUrl('');
        setVideoInfo(null);
    };

    return (
        <View style={styles.container}>
            <Header
                title={
                    <View style={styles.headerTitle}>
                        {platform.icon(24, colors.text)}
                        <Text style={styles.headerTitleText}>{platform.name}</Text>
                    </View>
                }
                subtitle="Paste video URL to download"
                navigation={navigation}
            />

            <ScrollView style={styles.scrollView}>
                <DownloadInputForm
                    platform={platform}
                    url={url}
                    onUrlChange={setUrl}
                    onProcess={handleProcessUrl}
                    loading={loading}
                    error={error}
                />

                {loading && <Loader message="Processing TikTok URL..." />}

                {error && !loading && (
                    <ErrorMessage
                        message={error}
                        onRetry={handleRetry}
                    />
                )}

                <VideoPreview
                    videoInfo={videoInfo}
                    onDownload={handleDownload}
                    downloading={downloading}
                />

                {!videoInfo && !loading && !error && (
                    <View style={styles.tipsContainer}>
                        <View style={styles.tipCard}>
                            <View style={styles.tipHeader}>
                                <View style={[styles.tipIcon, { backgroundColor: platform.color }]} />
                                <Text style={styles.tipTitle}>How to download from TikTok</Text>
                            </View>
                            <View style={styles.tipList}>
                                <Text style={styles.tipItem}>• Open the TikTok app</Text>
                                <Text style={styles.tipItem}>• Tap the share arrow (↗) on the video</Text>
                                <Text style={styles.tipItem}>• Select "Copy link"</Text>
                                <Text style={styles.tipItem}>• Paste the link above</Text>
                                <Text style={styles.tipNote}>* Videos are downloaded without watermark</Text>
                            </View>
                        </View>

                        <View style={styles.featureCard}>
                            <Text style={styles.featureTitle}>TikTok Features</Text>
                            <View style={styles.featureList}>
                                <Text style={styles.featureItem}>✓ No watermark</Text>
                                <Text style={styles.featureItem}>✓ Original quality</Text>
                                <Text style={styles.featureItem}>✓ Fast download</Text>
                                <Text style={styles.featureItem}>✓ Support for all video types</Text>
                            </View>
                        </View>
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
    },
    tipsContainer: {
        padding: spacing.lg,
    },
    tipCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.card,
        marginBottom: spacing.md,
    },
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    tipIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: spacing.sm,
    },
    tipTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
    },
    tipList: {
        paddingLeft: spacing.sm,
    },
    tipItem: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.xs,
    },
    tipNote: {
        fontSize: 12,
        color: colors.primary,
        fontStyle: 'italic',
        marginTop: spacing.sm,
    },
    featureCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.primary + '40',
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.primary,
        marginBottom: spacing.md,
    },
    featureList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    featureItem: {
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: spacing.sm,
        width: '48%',
    },
});

export default TikTokScreen;