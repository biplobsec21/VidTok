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

const FacebookScreen = ({ route, navigation }) => {
    const { platform = PLATFORMS.FACEBOOK } = route.params;
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState('');

    const handleProcessUrl = async () => {
        if (!url.trim()) {
            setError('Please enter a valid Facebook URL');
            return;
        }

        // Validate Facebook URL
        if (!platform.regex.test(url)) {
            setError('Please enter a valid Facebook video URL');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // TODO: Replace with Facebook API call
            // const response = await facebookApi.processUrl(url);
            // setVideoInfo(response.data);

            // Mock response for now
            setTimeout(() => {
                setVideoInfo({
                    title: 'Facebook Video - Amazing Nature Documentary',
                    thumbnail: null,
                    duration: '5:20',
                    quality: '1080p',
                    size: '68.7 MB',
                    source: 'Facebook Watch',
                    views: '1.2M views',
                });
                setLoading(false);
            }, 2000);

        } catch (err) {
            setError('Failed to process Facebook URL. Please check the URL and try again.');
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!videoInfo) return;

        setDownloading(true);
        try {
            // TODO: Replace with download API call
            // await facebookApi.downloadVideo(url, videoInfo);

            // Mock download
            setTimeout(() => {
                Alert.alert('Success', 'Facebook video downloaded successfully!');
                setDownloading(false);
                // Reset form
                setUrl('');
                setVideoInfo(null);
                navigation.navigate('Downloads');
            }, 3000);

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

                {loading && <Loader message="Processing Facebook URL..." />}

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
                                <Text style={styles.tipTitle}>How to download from Facebook</Text>
                            </View>
                            <View style={styles.tipList}>
                                <Text style={styles.tipItem}>• Open the Facebook app or website</Text>
                                <Text style={styles.tipItem}>• Find the video you want to download</Text>
                                <Text style={styles.tipItem}>• Tap the three dots (⋯) on the video</Text>
                                <Text style={styles.tipItem}>• Select "Copy link" or "Copy video URL"</Text>
                                <Text style={styles.tipItem}>• Paste the link above</Text>
                            </View>
                        </View>

                        <View style={styles.supportedTypes}>
                            <Text style={styles.supportedTitle}>Supported Content Types</Text>
                            <View style={styles.typeList}>
                                <View style={styles.typeItem}>
                                    <Text style={styles.typeIcon}>📹</Text>
                                    <Text style={styles.typeText}>Facebook Watch</Text>
                                </View>
                                <View style={styles.typeItem}>
                                    <Text style={styles.typeIcon}>🎬</Text>
                                    <Text style={styles.typeText}>Facebook Reels</Text>
                                </View>
                                <View style={styles.typeItem}>
                                    <Text style={styles.typeIcon}>📱</Text>
                                    <Text style={styles.typeText}>User Posts</Text>
                                </View>
                                <View style={styles.typeItem}>
                                    <Text style={styles.typeIcon}>📺</Text>
                                    <Text style={styles.typeText}>Page Videos</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.noteCard}>
                            <Text style={styles.noteTitle}>Note</Text>
                            <Text style={styles.noteText}>
                                Some Facebook videos may have download restrictions based on the uploader's privacy settings.
                            </Text>
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
    supportedTypes: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.card,
        marginBottom: spacing.md,
    },
    supportedTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.md,
    },
    typeList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    typeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '48%',
        marginBottom: spacing.md,
    },
    typeIcon: {
        fontSize: 16,
        marginRight: spacing.sm,
    },
    typeText: {
        fontSize: 14,
        color: colors.textSecondary,
    },
    noteCard: {
        backgroundColor: colors.surface,
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.warning + '40',
    },
    noteTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.warning,
        marginBottom: spacing.sm,
    },
    noteText: {
        fontSize: 12,
        color: colors.textSecondary,
        lineHeight: 16,
    },
});

export default FacebookScreen;