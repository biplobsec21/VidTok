// src/components/DownloadInputForm.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../themes/colors';
import { spacing } from '../themes/spacing';
import CustomInput from './common/CustomInput';
import CustomButton from './common/CustomButton';

const DownloadInputForm = ({
    platform,
    url,
    onUrlChange,
    onProcess,
    loading,
    error,
}) => {
    return (
        <View style={styles.container}>
            <CustomInput
                label={
                    <View style={styles.labelContainer}>
                        <Icon
                            name={platform.iconName}  // Use iconName, not icon()
                            size={20}
                            color={colors.primary}
                        />
                        <Text style={styles.labelText}>{platform.name} Video URL</Text>
                    </View>
                }
                placeholder={platform.placeholder}
                value={url}
                onChangeText={onUrlChange}
                error={error}
                multiline
                numberOfLines={3}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <CustomButton
                title="Process Video"
                onPress={onProcess}
                loading={loading}
                disabled={!url.trim()}
                icon={<Icon name={platform.iconName} size={20} color={colors.text} />}  // Use iconName here too
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: spacing.lg,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelText: {
        color: colors.text,
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 8,
    },
});

export default DownloadInputForm;