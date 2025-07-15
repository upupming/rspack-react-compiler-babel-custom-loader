const babel = require('@babel/core');

module.exports = async function reactCompilerLoader(
  content,
) {
  const callback = this.async();
  const result = babel.transformSync(content, {
    plugins: [
      ['babel-plugin-react-compiler', { target: '19' }],
      '@babel/plugin-syntax-jsx',
      // isTSX ? [babelPluginSyntaxTypescriptPath, { isTSX: true }] : null,
    ].filter(Boolean),
    filename: this.resourcePath,
    ast: false,
    sourceMaps: this.sourceMap,
  });
  if (result?.code != null && result?.map != null) {
    return callback(null, result.code, JSON.stringify(result.map));
  } else {
    return callback(
      new Error(
        `babel-plugin-react-compiler transform failed for ${this.resourcePath}: ${result ? 'missing code or map' : 'no result'
        }`,
      ),
    );
  }
}
