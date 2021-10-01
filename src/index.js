/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf(conf) {
  // make sure my-ext boot file is registered
  conf.boot.push('~quasar-app-extension-q-feathers-vuex/src/boot/feathers-client.js')

  // make sure boot file transpiles
  conf.build.transpileDependencies.push(/quasar-app-extension-q-feathers-vuex[\\/]src/)

  const requiredBoot = ["auth", "feathers-client"];

  requiredBoot.forEach((boot) => {
    if (!conf.boot.includes(boot)) {
      conf.boot.push(boot);
    }
  });
}

module.exports = function (api, ctx) {
  //

  api.extendQuasarConf(extendConf);
};
