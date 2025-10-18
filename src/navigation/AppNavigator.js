// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../themes/colors';

// Import screens
import HomeScreen from '../screens/HomeScreen';
import YouTubeScreen from '../screens/YouTubeScreen';
import InstagramScreen from '../screens/InstagramScreen';
import TikTokScreen from '../screens/TikTokScreen';
import FacebookScreen from '../screens/FacebookScreen';
import DownloadsHistoryScreen from '../screens/DownloadsHistoryScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PlatformStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="YouTube" component={YouTubeScreen} />
        <Stack.Screen name="Instagram" component={InstagramScreen} />
        <Stack.Screen name="TikTok" component={TikTokScreen} />
        <Stack.Screen name="Facebook" component={FacebookScreen} />
    </Stack.Navigator>
);

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: colors.primary,
                    tabBarInactiveTintColor: colors.textSecondary,
                    tabBarStyle: {
                        backgroundColor: colors.surface,
                        borderTopColor: colors.card,
                        paddingBottom: 8,
                        paddingTop: 8,
                        height: 60,
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: '500',
                    },
                    headerStyle: {
                        backgroundColor: colors.background,
                        shadowColor: 'transparent',
                    },
                    headerTintColor: colors.text,
                    headerTitleStyle: {
                        fontWeight: '600',
                    },
                }}
            >
                <Tab.Screen
                    name="Platforms"
                    component={PlatformStack}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'home' : 'home-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Downloads"
                    component={DownloadsHistoryScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'download' : 'download-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name={focused ? 'cog' : 'cog-outline'}
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;