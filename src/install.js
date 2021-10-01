/**
 * Quasar App Extension install script
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/install-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/InstallAPI.js
 */

module.exports = function (api) {
  //
  api.extendPackageJson({
    dependencies: {
      "@feathersjs/authentication-client": "^4.5.11",
      "@feathersjs/feathers": "^4.5.11",
      "@feathersjs/rest-client": "^4.5.11",
      "@feathersjs/socketio-client": "^4.5.11",
      "feathers-hooks-common": "^5.0.5",
      "feathers-vuex": "^3.16.0",
      "socket.io-client": "^2.3.0",
    },
  });

  api.renderFile("./boot/feathers-client.ts", "src/boot/feathers-client.ts", {
    prompts: api.prompts,
  });
  api.renderFile("./boot/auth.new.ts", "src/boot/auth.new.ts", {
    prompts: api.prompts,
  });
  api.renderFile("./boot/auth.ts", "src/boot/auth.ts", {
    prompts: api.prompts,
  });
};
