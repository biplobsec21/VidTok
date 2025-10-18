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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const YouTubeScreen = ({ route, navigation }) => {
    const { platform = PLATFORMS.YOUTUBE } = route.params;
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);
    const [videoInfo, setVideoInfo] = useState(null);
    const [error, setError] = useState('');

    const handleProcessUrl = async () => {
        if (!url.trim()) {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);
        setError('');
        try {
            // TODO: Replace with YouTube API call
            // const response = await youtubeApi.processUrl(url);
            // setVideoInfo(response.data);

            // Mock response for now
            setTimeout(() => {
                setVideoInfo({
                    title: 'Sample YouTube Video Title',
                    thumbnail: null,
                    duration: '10:30',
                    quality: '1080p',
                    size: '45.2 MB',
                });
                setLoading(false);
            }, 2000);

        } catch (err) {
            setError('Failed to process URL. Please check the URL and try again.');
            setLoading(false);
        }
    };

    const handleDownload = async () => {
        if (!videoInfo) return;

        setDownloading(true);
        try {
            // TODO: Replace with download API call
            // await youtubeApi.downloadVideo(url, videoInfo);

            // Mock download
            setTimeout(() => {
                Alert.alert('Success', 'Video downloaded successfully!');
                setDownloading(false);
                navigation.navigate('DownloadsHistory');
            }, 3000);

        } catch (err) {
            Alert.alert('Error', 'Download failed. Please try again.');
            setDownloading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Header
                title={
                    <View style={styles.headerTitle}>
                        <Icon
                            name={platform.iconName}  // Use iconName, not icon()
                            size={28}
                            color={colors.text}
                        />
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

                {loading && <Loader message="Processing video URL..." />}

                <VideoPreview
                    videoInfo={videoInfo}
                    onDownload={handleDownload}
                    downloading={downloading}
                />
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
});

export default YouTubeScreen;