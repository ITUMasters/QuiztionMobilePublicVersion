module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: "./assets",
            consts: "./consts",
            icons: "./icons",
            components: './components',
            hooks: "./hooks",
            ui: './ui',
            "recoil-store": './recoil-store',
            theme: './theme',
            utils: './utils',
            pages: './pages',
            "react-query": './react-query'
          },
        },
      ],
    ]
  };
};
