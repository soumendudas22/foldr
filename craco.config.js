const path = require(`path`);

/******************************************************************************************************
 *                                        ALIASES
 ******************************************************************************************************/

const alias = (prefix = `src`) => ({
  '@assets': `${prefix}/assets`,
  '@components': `${prefix}/components`,
  '@contexts': `${prefix}/contexts`,
  '@util': `${prefix}/util`,
  '@pages': `${prefix}/pages`,
  '@reducers': `${prefix}/reducers`,
  '@actions': `${prefix}/actions`
});

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [key, path.resolve(__dirname, value)]),
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
    devServer: {
      historyApiFallback: true,
      contentBase: './',
      hot: true
    }
  },
};