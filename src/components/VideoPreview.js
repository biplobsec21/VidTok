// src/components/VideoPreview.js
import React, { useState } from 'react'; // Add if you need state
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../themes/colors';
import { typography } from '../themes/typography';
import { spacing } from '../themes/spacing';
import CustomButton from './common/CustomButton';

const VideoPreview = ({ videoInfo, onDownload, downloading }) => {
    if (!videoInfo) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Video Preview</Text>

            <View style={styles.previewCard}>
                <View style={styles.thumbnail}>
                    {videoInfo.thumbnail ? (
                        <Image
                            source={{ uri: videoInfo.thumbnail }}
                            style={styles.thumbnailImage}
                            resizeMode="cover"
                        />
                    ) : (
                        <View style={styles.placeholderContainer}>
                            <Icon name="play-circle-outline" size={48} color={colors.textSecondary} />
                            <Text style={styles.placeholderText}>Video Preview</Text>
                        </View>
                    )}
                </View>

                <View style={styles.details}>
                    <Text style={styles.videoTitle} numberOfLines={2}>
                        {videoInfo.title || 'Untitled Video'}
                    </Text>

                    <View style={styles.metaContainer}>
                        {videoInfo.duration && (
                            <View style={styles.metaItem}>
                                <Icon name="clock-outline" size={16} color={colors.textSecondary} />
                                <Text style={styles.metaText}>{videoInfo.duration}</Text>
                            </View>
                        )}
                        {videoInfo.quality && (
                            <View style={styles.metaItem}>
                                <Icon name="high-definition" size={16} color={colors.textSecondary} />
                                <Text style={styles.metaText}>{videoInfo.quality}</Text>
                            </View>
                        )}
                        {videoInfo.size && (
                            <View style={styles.metaItem}>
                                <Icon name="harddisk" size={16} color={colors.textSecondary} />
                                <Text style={styles.metaText}>{videoInfo.size}</Text>
                            </View>
                        )}
                    </View>

                    {/* Additional platform-specific info */}
                    {videoInfo.author && (
                        <View style={styles.authorContainer}>
                            <Icon name="account" size={14} color={colors.textSecondary} />
                            <Text style={styles.authorText}>{videoInfo.author}</Text>
                        </View>
                    )}

                    {videoInfo.views && (
                        <View style={styles.viewsContainer}>
                            <Icon name="eye" size={14} color={colors.textSecondary} />
                            <Text style={styles.viewsText}>{videoInfo.views}</Text>
                        </View>
                    )}
                </View>
            </View>

            <CustomButton
                title="Download Video"
                onPress={onDownload}
                loading={downloading}
                style={styles.downloadButton}
                icon={<Icon name="download" size={20} color={colors.text} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
    },
    title: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.md,
    },
    previewCard: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.lg,
        borderWidth: 1,
        borderColor: colors.card,
    },
    thumbnail: {
        width: '100%',
        height: 200,
        backgroundColor: colors.card,
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumbnailImage: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderText: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: spacing.sm,
    },
    details: {
        padding: spacing.md,
    },
    videoTitle: {
        ...typography.bodyBold,
        color: colors.text,
        marginBottom: spacing.md,
        lineHeight: 22,
    },
    metaContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
        marginBottom: spacing.sm,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    metaText: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.xs,
    },
    authorText: {
        ...typography.small,
        color: colors.textSecondary,
    },
    viewsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    viewsText: {
        ...typography.small,
        color: colors.textSecondary,
    },
    downloadButton: {
        marginTop: spacing.sm,
    },
});

export default VideoPreview;