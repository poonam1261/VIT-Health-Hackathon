const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('lottie');
defaultConfig.resolver.sourceExts.push('cjs');


module.exports = defaultConfig;







// const { getDefaultConfig } = require('@expo/metro-config');

// const defaultConfig = getDefaultConfig(__dirname);

// // Ensure the resolver object exists
// defaultConfig.resolver = defaultConfig.resolver || {};

// // Initialize assetExts and sourceExts if they don't exist
// defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts || [];
// defaultConfig.resolver.sourceExts = defaultConfig.resolver.sourceExts || [];

// // Add 'lottie' to assetExts if not already present
// if (!defaultConfig.resolver.assetExts.includes('lottie')) {
//   defaultConfig.resolver.assetExts.push('lottie');
// }

// // Add 'cjs' to sourceExts if not already present
// if (!defaultConfig.resolver.sourceExts.includes('cjs')) {
//   defaultConfig.resolver.sourceExts.push('cjs');
// }

// module.exports = defaultConfig;
