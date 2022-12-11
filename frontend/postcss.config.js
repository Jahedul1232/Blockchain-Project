module.exports = {
  resolve: {
    fallback: {
      // crypto: require.resolve("crypto-browserify"),
      crypto: false,
    },
  },
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
