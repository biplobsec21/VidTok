// src/config/platforms.config.js
export const PLATFORMS = {
    YOUTUBE: {
        name: 'YouTube',
        key: 'youtube',
        icon: 'youtube', // Simple string
        placeholder: 'https://www.youtube.com/watch?v=',
        regex: /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
        color: '#FF0000',
    },
    INSTAGRAM: {
        name: 'Instagram',
        key: 'instagram',
        icon: 'instagram', // Simple string
        placeholder: 'https://www.instagram.com/p/',
        regex: /(?:https?:\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/(?:p|reel)\/([^\/?#&]+).*/,
        color: '#E4405F',
    },
    TIKTOK: {
        name: 'TikTok',
        key: 'tiktok',
        icon: 'music', // Simple string
        placeholder: 'https://www.tiktok.com/@username/video/',
        regex: /(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com)\/(?:@[\w\.-]+\/video\/|v\/)(\d+)/,
        color: '#000000',
    },
    FACEBOOK: {
        name: 'Facebook',
        key: 'facebook',
        icon: 'facebook', // Simple string
        placeholder: 'https://www.facebook.com/watch/?v=',
        regex: /(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\/(?:video\.php\?v=|watch\/?\?v=)?(\d+)/,
        color: '#1877F2',
    },
};

export const PLATFORM_LIST = Object.values(PLATFORMS);