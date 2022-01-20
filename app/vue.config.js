module.exports = {
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options['compilerOptions'] = {
          isCustomElement: (tag) => tag === 'ion-icon',
        };
        return options;
      });
  },
};
