module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          node: 'current',
          browsers: [
            '>5%',
            'not dead',
            'not op_mini all',
            'Explorer >= 11',
            'Edge >= 16',
            'Android >= 4.4',
            'Samsung >= 6',
            'Chrome >= 63',
            'Firefox >= 57',
            'Safari >= 11',
          ]
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};
