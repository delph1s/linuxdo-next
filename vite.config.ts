import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';
import tsconfigPaths from 'vite-tsconfig-paths'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    monkey({
      // userscript entry file path
      entry: 'src/index.tsx',
      userscript: {
        // name: 'linuxdo-next',
        namespace: 'linuxdo-next',
        // version: '0.1.0',
        author: 'delph1s',
        description: '一个呼吸顺畅的 linux.do 论坛',
        // homepage: '',
        // homepageURL: '',
        // website: '',
        // source: '',
        // icon: '',
        iconURL: 'https://cdn.linux.do/uploads/default/original/1X/3a18b4b0da3e8cf96f7eea15241c3d251f28a39b.png',
        // defaulticon: '',
        // icon64: '',
        // icon64URL: '',
        // updateURL: '',
        // downloadURL: '',
        // supportURL: '',
        // include: [],
        match: [
          '*://linux.do/',
          '*://linux.do/*',
        ],
        // 'exclude-match': [],
        // exclude: [],
        // require: [],
        // resource: {},
        // connect: [],
        // sandbox: 'raw',
        // antifeature: [],
        // noframes: false,
        // webRequest: [],
        // 'inject-into': 'page',
        // unwrap: false,
        // greasyfork
        license: 'GPLv2',
        // contributionURL: '',
        // contributionAmount: '1',
        // compatible: '',
        // incompatible: '',
        'run-at': 'document-end',
        // grant: [],
      },
      // format: {
      //   generate: uOptions => {
      //     console.log(uOptions.userscript);
      //     if (uOptions.mode === 'serve') {
      //       return '测试';
      //     }
      //     if (uOptions.mode === 'build') {
      //       return '打包'
      //     }
      //     if (uOptions.mode === 'meta') {
      //       return '元'
      //     }
      //   }
      // },
      clientAlias: 'monkeyClient',
      server: {
        open: true,
        prefix: name => {
          return `${name}-dev`;
        },
        mountGmApi: false,
      },
      build: {
        // fileName: 'linuxdo-next',
        metaFileName: true,
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
        autoGrant: true,
        // externalResource: {},
        // systemjs: 'inline',
        // cssSideEffects: css => {
        //   return (css) => {
        //     console.log(css);
        //   }
        // }
      },
    }),
  ],
  build: {
    minify: false,
  },
});
