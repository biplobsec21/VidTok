import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

// Import the legacy API for now to make it work immediately
import * as FileSystemLegacy from 'expo-file-system/legacy';

export default function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Function to request permissions
  const requestPermissions = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'We need permission to save videos to your gallery.'
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  };

  // Function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  // Download function using LEGACY API (for immediate solution)
  const downloadVideoLegacy = async () => {
    if (!videoUrl.trim()) {
      Alert.alert('Error', 'Please enter a video URL');
      return;
    }

    if (!isValidUrl(videoUrl)) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      console.log('Starting download with legacy API...');

      // Create a unique file name
      const fileName = `video_${Date.now()}.mp4`;
      const fileUri = FileSystemLegacy.documentDirectory + fileName;

      console.log('Downloading from:', videoUrl);
      console.log('Saving to:', fileUri);

      // Download with progress using legacy API
      const downloadResumable = FileSystemLegacy.createDownloadResumable(
        videoUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
          setDownloadProgress(progress);
          console.log(`Download progress: ${progress}`);
        }
      );

      const result = await downloadResumable.downloadAsync();

      if (result && result.status === 200) {
        console.log('Download completed, saving to gallery...');

        // Save to media library
        try {
          const asset = await MediaLibrary.createAssetAsync(result.uri);
          const album = await MediaLibrary.getAlbumAsync('Downloaded Videos');

          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            await MediaLibrary.createAlbumAsync('Downloaded Videos', asset, false);
          }

          Alert.alert('Success', 'Video downloaded and saved to gallery!');
          setVideoUrl('');
        } catch (saveError) {
          console.error('Save to gallery error:', saveError);
          Alert.alert('Success', 'Video downloaded but there was an issue saving to gallery.');
        }
      } else {
        throw new Error(`Download failed with status: ${result?.status}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert(
        'Download Failed',
        `Failed to download video: ${error.message}\n\nThis might be due to:\n• URL restrictions\n• Network issues\n• File size limitations`
      );
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  // Simple download without progress (most reliable)
  const downloadVideoSimple = async () => {
    if (!videoUrl.trim()) {
      Alert.alert('Error', 'Please enter a video URL');
      return;
    }

    if (!isValidUrl(videoUrl)) {
      Alert.alert('Error', 'Please enter a valid URL');
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setIsDownloading(true);

    try {
      const fileName = `video_${Date.now()}.mp4`;
      const fileUri = FileSystemLegacy.documentDirectory + fileName;

      console.log('Downloading from:', videoUrl);
      console.log('Saving to:', fileUri);

      // Simple download using legacy API
      const result = await FileSystemLegacy.downloadAsync(videoUrl, fileUri);

      console.log('Download result:', result);

      if (result.status === 200) {
        console.log('Saving to gallery...');

        // Save to media library
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        const album = await MediaLibrary.getAlbumAsync('Downloaded Videos');

        if (album) {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        } else {
          await MediaLibrary.createAlbumAsync('Downloaded Videos', asset, false);
        }

        Alert.alert('Success', 'Video downloaded successfully!');
        setVideoUrl('');
      } else {
        throw new Error(`Download failed with status: ${result.status}`);
      }
    } catch (error) {
      console.error('Download error:', error);
      Alert.alert(
        'Error',
        `Download failed: ${error.message}\n\nTry:\n• A different video URL\n• Checking your internet connection\n• A shorter video`
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // Test with a sample video URL
  const useSampleVideo = () => {
    setVideoUrl('https://www.sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4');
  };

  // Clear the input
  const clearInput = () => {
    setVideoUrl('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🎬 Video Downloader</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Video URL:</Text>
        <TextInput
          style={styles.textInput}
          placeholder="https://example.com/video.mp4"
          placeholderTextColor="#999"
          value={videoUrl}
          onChangeText={setVideoUrl}
          autoCapitalize="none"
          autoCorrect={false}
          editable={!isDownloading}
          keyboardType="url"
          multiline
        />
        {videoUrl.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.sampleButton}
          onPress={useSampleVideo}
          disabled={isDownloading}
        >
          <Text style={styles.sampleButtonText}>Use Sample Video</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.downloadButton,
          (isDownloading || !videoUrl.trim()) && styles.disabledButton
        ]}
        onPress={downloadVideoSimple}
        disabled={isDownloading || !videoUrl.trim()}
      >
        {isDownloading ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator color="#fff" size="small" />
            <Text style={styles.buttonText}>Downloading...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Download Video</Text>
        )}
      </TouchableOpacity>

      {isDownloading && (
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Downloading... {Math.round(downloadProgress * 100)}%
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${downloadProgress * 100}%` }
              ]}
            />
          </View>
        </View>
      )}

      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>How to use:</Text>
        <Text style={styles.instruction}>1. Paste direct video URL (must end with .mp4, .mov, etc.)</Text>
        <Text style={styles.instruction}>2. Click "Download Video" button</Text>
        <Text style={styles.instruction}>3. Allow permissions when asked</Text>
        <Text style={styles.instruction}>4. Video will be saved to your gallery</Text>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Tips for success:</Text>
          <Text style={styles.tip}>• Use the sample video to test first</Text>
          <Text style={styles.tip}>• Ensure URLs are direct video links</Text>
          <Text style={styles.tip}>• Some sites block downloads for copyright</Text>
          <Text style={styles.tip}>• Try shorter videos first</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#1a1a1a',
  },
  inputContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 60,
    textAlignVertical: 'top',
    paddingRight: 45,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 45,
    backgroundColor: '#6c757d',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sampleButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  sampleButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginBottom: 20,
    width: '100%',
  },
  progressText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  instructions: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1a1a1a',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 20,
  },
  tipsContainer: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  tipsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  tip: {
    fontSize: 13,
    color: '#495057',
    marginBottom: 4,
    lineHeight: 18,
  },
});