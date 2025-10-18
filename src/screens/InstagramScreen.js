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

const InstagramScreen = ({ route, navigation }) => {
    const { platform = PLATFORMS.INSTAGRAM } = route.params;
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState('');

    const handleProcessUrl = async () => {
        if (!url.trim()) {
            setError('Please enter a valid Instagram URL');
            return;
        }

        // Validate Instagram URL
        if (!platform.regex.test(url)) {
            setError('Please enter a valid Instagram URL (post or reel)');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // TODO: Replace with Instagram API call
            // const response = await instagramApi.processUrl(url);
            // setVideoInfo(response.data);

            // Mock response for now
            setTimeout(() => {
                setVideoInfo({
                    title: 'Instagram Reel - Beautiful Sunset',
                    thumbnail: null,
                    duration: '0:30',
                    quality: '720p',
                    size: '8.5 MB',
                    type: url.includes('/reel/') ? 'Reel' : 'Post',
                });
                setLoading(false);
            }, 1500);

        } catch (err) {
            setError('Failed to process Instagram URL. Please check the URL and try again.');
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!videoInfo) return;

        setDownloading(true);
        try {
            // TODO: Replace with download API call
            // await instagramApi.downloadVideo(url, videoInfo);

            // Mock download
            setTimeout(() => {
                Alert.alert('Success', 'Instagram video downloaded successfully!');
                setDownloading(false);
                // Reset form
                setUrl('');
                setVideoInfo(null);
                navigation.navigate('Downloads');
            }, 2000);

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

                {loading && <Loader message="Processing Instagram URL..." />}

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
                                <Text style={styles.tipTitle}>How to download from Instagram</Text>
                            </View>
                            <View style={styles.tipList}>
                                <Text style={styles.tipItem}>• Open the Instagram app</Text>
                                <Text style={styles.tipItem}>• Tap the three dots (⋯) on the post/reel</Text>
                                <Text style={styles.tipItem}>• Select "Copy link"</Text>
                                <Text style={styles.tipItem}>• Paste the link above</Text>
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
});

export default InstagramScreen;