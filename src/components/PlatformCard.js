// src/components/PlatformCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../themes/colors';
import { typography } from '../themes/typography';
import { spacing } from '../themes/spacing';

const PlatformCard = ({ platform, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <LinearGradient
                colors={[platform.color + '20', platform.color + '10']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <View style={styles.content}>
                    <View style={[styles.iconContainer, { backgroundColor: platform.color }]}>
                        <Icon
                            name={platform.icon}
                            size={28}
                            color={colors.text}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{platform.name}</Text>
                        <Text style={styles.description}>
                            Download videos from {platform.name}
                        </Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <Icon name="chevron-right" size={24} color={colors.textSecondary} />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },
    gradient: {
        padding: spacing.md,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        ...typography.h3,
        color: colors.text,
        marginBottom: spacing.xs,
    },
    description: {
        ...typography.caption,
        color: colors.textSecondary,
    },
    arrowContainer: {
        padding: spacing.sm,
    },
});

export default PlatformCard;