module.exports = {
  env: {
    test: {
      'plugins': ['@babel/plugin-transform-modules-commonjs']
    }
  },
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: '3',
        targets: {
          browsers: [
            'last 10 versions',
            'ie > 9'
          ]
        }
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime'
    ]
  ],
  ignore: [
    'node_modules/**'
  ]
}
