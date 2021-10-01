import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
//import rest from "@feathersjs/rest-client";
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import { iff, discard } from 'feathers-hooks-common'
import feathersVuex from 'feathers-vuex'
import axios from 'axios';
import Vue from "vue";

//const restClient = rest("http://localhost:3030");

//const apiUrl = "https://svrdevweb.agglo.local:3050";//"https://www.hdcapp.pro";//import.meta.env.VITE_APP1_API_URL as string

console.log("Web origin :", window.location.origin)
console.log("DEV env :", process.env)

let apiUrl = (window.location.origin.split(':')[2] == "8080") ? "<%= prompts.locale_feathersjs %>" : window.location.origin


const socket = io(apiUrl, { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket, {
    timeout: 50000
  }))
  //.configure(restClient.axios(axiosInstance))
  .configure(
    auth({ storage: window.localStorage }),
  )
  .hooks({
    before: {
      all: [
        // Don't send FeathersVuex temp attributes to the server.
        iff(
          context => ['create', 'update', 'patch'].includes(context.method),
          discard('__id', '__isTemp'),
        ),
      ],
    },
  })

Vue.prototype.$feathersClient = feathersClient;

export default feathersClient

// Setting up feathers-vuex
const { makeServicePlugin, makeAuthPlugin, BaseModel, models, FeathersVuex } = feathersVuex(feathersClient, {
  serverAlias: 'api', // optional for working with multiple APIs (this is the default value)
  idField: '_id', // Must match the id field in your database table/collection
  whitelist: ['$regex', '$options'],
})

export { makeAuthPlugin, makeServicePlugin, BaseModel, models, FeathersVuex }

