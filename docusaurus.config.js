const { themes } = require('prism-react-renderer');

const code_themes = {
  light: themes.github,
  dark: themes.dracula,
};

/** @type {import('@docusaurus/types').Config} */
const meta = {
  title: 'Thinking Engine',
  tagline:
    '가이드, 참고 문헌, 모범 사례 등 Thinking Engine에 대한 포괄적인 문서를 살펴보세요.',
  url: 'https://wo123kr.github.io',
  baseUrl: '/td-docs/', // 사이트의 기본 URL
  favicon: '/favicon.ico', // 파비콘 경로
  i18n: {
    defaultLocale: 'ko', 
    locales: ['ko'],
  },
};

/** @type {import('@docusaurus/plugin-content-docs').Options[]} */
const docs = [
  {
    id: 'cli',
    path: 'docs/cli',
    routeBasePath: '/cli',
  },
  {
    id: 'plugin-sdk',
    path: 'docs/plugin-sdk',
    routeBasePath: '/plugin-sdk',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },

  // Community packages
  {
    id: 'community-packages',
    path: 'docs/community-packages',
    routeBasePath: '/community-packages',
  },

  // Web UI Kits
  {
    id: 'ui-kit',
    path: 'docs/ui-kit',
    routeBasePath: '/ui-kit',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
  {
    id: 'react-ui-kit',
    path: 'docs/react-ui-kit',
    routeBasePath: '/react-ui-kit',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
  {
    id: 'angular-ui-kit',
    path: 'docs/angular-ui-kit',
    routeBasePath: '/angular-ui-kit',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },

  // Web Core
  {
    id: 'web-core',
    path: 'docs/web-core',
    routeBasePath: '/web-core',
    versions: {
      current: {
        label: '2.x.x',
      },
    },
  },
  // React Web Core
  {
    id: 'react-web-core',
    path: 'docs/react-web-core',
    routeBasePath: '/react-web-core',
    versions: {
      current: {
        label: '2.x.x',
      },
    },
  },

  // Mobile Core
  {
    id: 'android-core',
    path: 'docs/android-core',
    routeBasePath: '/android-core',
    versions: {
      current: {
        label: '2.x.x',
      },
    },
  },
  {
    id: 'flutter-core',
    path: 'docs/flutter-core',
    routeBasePath: '/flutter-core',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
  {
    id: 'ios-core',
    path: 'docs/ios-core',
    routeBasePath: '/ios-core',
    versions: {
      current: {
        label: '2.x.x',
      },
    },
  },
  {
    id: 'rn-core',
    path: 'docs/rn-core',
    routeBasePath: '/rn-core',
    versions: {
      current: {
        label: '0.x.x',
      },
    },
  },

  // Mobile UI Kits
  {
    id: 'android',
    path: 'docs/android',
    routeBasePath: '/android',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
  {
    id: 'flutter',
    path: 'docs/flutter',
    routeBasePath: '/flutter',
    versions: {
      current: {
        label: '0.7.x',
      },
    },
  },
  {
    id: 'ios',
    path: 'docs/ios',
    routeBasePath: '/ios',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
  {
    id: 'react-native',
    path: 'docs/rn-ui-kit',
    routeBasePath: '/react-native',
    versions: {
      current: {
        label: '1.x.x',
      },
    },
  },
];

/** @type {import('@docusaurus/plugin-content-docs').Options} */
const defaultSettings = {
  breadcrumbs: true,
  editUrl: 'https://github.com/wo123kr/td-docs/tree/main/',
  showLastUpdateTime: true,
  sidebarCollapsible: true,
  remarkPlugins: [
    [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
  ],
  sidebarPath: require.resolve('./sidebars-default.js'),
};

/**
 * Create a section
 * @param {import('@docusaurus/plugin-content-docs').Options} options
 */
function create_doc_plugin({
  sidebarPath = require.resolve('./sidebars-default.js'),
  ...options
}) {
  return [
    '@docusaurus/plugin-content-docs',
    /** @type {import('@docusaurus/plugin-content-docs').Options} */
    ({
      ...defaultSettings,
      sidebarPath,
      ...options,
    }),
  ];
}

const { webpackPlugin } = require('./plugins/webpack-plugin.cjs');
const tailwindPlugin = require('./plugins/tailwind-plugin.cjs');
const docs_plugins = docs.map((doc) => create_doc_plugin(doc));

const plugins = [
  tailwindPlugin,
  ...docs_plugins,
  webpackPlugin,
    [
    '@easyops-cn/docusaurus-search-local',
    {
      hashed: true,
      indexDocs: true,
      indexBlog: false,
      indexPages: true,
      language: ['ko'],
      highlightSearchTermsOnTargetPage: true,
      explicitSearchResultPath: true,
    },
  ],
  [
    '@docusaurus/plugin-client-redirects',
    {
      createRedirects(path) {
        if (path.startsWith('/guides/capabilities/chat/export-chat-dump')) {
          return ['/capabilities/export-chat-dump'];
        }

        if (path.startsWith('/guides/capabilities/misc/embed')) {
          return ['/guides/capabilities/embed'];
        }

        if (path.startsWith('/react-ui-kit/basics/integrate')) {
          return ['/react-ui-kit/basics/components-basics'];
        }

        if (
          path.startsWith(
            '/guides/capabilities/misc/livestreaming-other-platforms',
          )
        ) {
          return [
            '/guides/capabilities/livestreaming-other-platforms',
            '/guides/capabilities/recording/livestream-recording',
          ];
        }

        if (
          path.startsWith('/guides/capabilities/video/add-virtual-background')
        ) {
          return [
            '/guides/capabilities/middleware/add-virtual-background',
            '/guides/capabilities/customization/add-virtual-background',
          ];
        }

        if (path.startsWith('/guides/live-video/concepts')) {
          return ['/guides/live-video/concepts-live-video'];
        }

        if (path.startsWith('/guides/voice-conf/concepts')) {
          return ['/guides/voice-conf/concepts-voice-conf'];
        }

        if (path.startsWith('/guides/livestream/concepts')) {
          return ['/guides/livestream/concepts-ils'];
        }

        if (path.startsWith(''))
          if (path.startsWith('/web-core/livestreaming')) {
            return [
              path.replace(
                '/web-core/livestreaming',
                '/web-core/livestreaming/livestream-apis',
              ),
            ];
          }
        if (path.startsWith('/rn-core/livestreaming')) {
          return [
            path.replace(
              '/rn-core/livestreaming',
              '/rn-core/livestreaming/livestream-apis',
            ),
          ];
        }
        if (path.startsWith('/react-web-core/livestreaming')) {
          return [
            path.replace(
              '/react-web-core/livestreaming',
              '/react-web-core/livestreaming/livestream-apis',
            ),
          ];
        }
        if (path.startsWith('/web-core/stage')) {
          return [
            path.replace(
              '/web-core/stage',
              '/web-core/livestreaming/state-management-apis',
            ),
          ];
        }
        if (path.startsWith('/rn-core/stage')) {
          return [
            path.replace(
              '/rn-core/stage',
              '/rn-core/livestreaming/state-management-apis',
            ),
          ];
        }
        if (path.startsWith('/react-web-core/stage')) {
          return [
            path.replace(
              '/react-web-core/stage',
              '/react-web-core/livestreaming/state-management-apis',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/webhooks')) {
          return [
            path.replace('/guides/capabilities/webhooks', '/guides/webhooks'),
            path.replace(
              '/guides/capabilities/webhooks',
              '/guides/features/webhooks',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/recording')) {
          return [
            path.replace('/guides/capabilities/recording', '/guides/recording'),
            path.replace(
              '/guides/capabilities/recording',
              '/guides/features/recording',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/recording')) {
          return [
            path.replace('/guides/capabilities/recording', '/guides/recording'),
            path.replace(
              '/guides/capabilities/recording',
              '/guides/features/recording',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/embed')) {
          return [
            path.replace('/guides/capabilities/embed', '/guides/embed'),
            path.replace(
              '/guides/capabilities/embed',
              '/guides/features/embed',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/export-chat-dump')) {
          return [
            path.replace(
              '/guides/capabilities/export-chat-dump',
              '/guides/export-chat-dump',
            ),
            path.replace(
              '/guides/capabilities/export-chat-dump',
              '/guides/features/export-chat-dump',
            ),
          ];
        }
        if (path.startsWith('/guides/capabilities/breakoutroom')) {
          return [
            path.replace(
              '/guides/capabilities/breakoutroom',
              '/guides/breakoutroom',
            ),
            path.replace(
              '/guides/capabilities/breakoutroom',
              '/guides/features/breakoutroom',
            ),
          ];
        }
        /* for everything else */
        if (path.startsWith('/guides/capabilities')) {
          return [path.replace('/guides/capabilities', '/guides/features')];
        }
        if (path === '/ui-kit') {
          return [
            '/javascript/advanced-usage',
            '/javascript/customize-meeting-ui',
            '/javascript/events',
            '/javascript/installation',
            '/javascript/quickstart',
            '/javascript/reference/chat-message',
            '/javascript/reference/connection-config',
            '/javascript/reference/dyte-client',
            '/javascript/reference/dyte-control-bar',
            '/javascript/reference/dyte-errors',
            '/javascript/reference/dyte-grid',
            '/javascript/reference/dyte-meeting-events',
            '/javascript/reference/dyte-plugin',
            '/javascript/reference/dyte-ui-config',
            '/javascript/reference/meeting',
            '/javascript/reference/participant',
            '/javascript/reference/self-participant',
            '/javascript/sample-app',
            '/javascript/usage',
            '/javascript/virtual-background',
            '/javascript/',
          ];
        }
        if (path === '/react-ui-kit') {
          return [
            '/react/advanced-usage',
            '/react/customize-meeting-ui',
            '/react/events',
            '/react/installation',
            '/react/quickstart',
            '/react/reference/chat-message',
            '/react/reference/connection-config',
            '/react/reference/dyte-client',
            '/react/reference/dyte-control-bar',
            '/react/reference/dyte-errors',
            '/react/reference/dyte-grid',
            '/react/reference/dyte-meeting-events',
            '/react/reference/dyte-plugin',
            '/react/reference/dyte-ui-config',
            '/react/reference/meeting',
            '/react/reference/participant',
            '/react/reference/self-participant',
            '/react/sample-app',
            '/react/usage',
            '/react/virtual-background',
            '/react/',
          ];
        }
        return undefined; // Return a falsy value: no redirect created
      },
    },
  ],
];

const fs = require('fs');
const sdksHTML = fs.readFileSync('./src/snippets/sdks.html', 'utf-8');
const resourcesHTML = fs.readFileSync('./src/snippets/resources.html', 'utf-8');

/** @type {import('@docusaurus/types').Config} */
const config = {
  ...meta,
  plugins,
  future: {
    experimental_faster: true,
  },

  // 아래 GitHub Pages 배포 설정 추가
  organizationName: 'wo123kr', // GitHub 사용자명
  projectName: 'td-docs',      // GitHub 저장소 이름
  deploymentBranch: 'gh-pages', // 배포될 브랜치
  
  trailingSlash: false,
  themes: ['@docusaurus/theme-live-codeblock', '@docusaurus/theme-mermaid'],

  clientModules: [
    require.resolve('./src/client/define-ui-kit.js'),
    require.resolve('./src/client/set-framework.js'),
  ],
  scripts: [{ src: 'https://cdn.statuspage.io/se-v2.js', async: true }],
  markdown: {
    mermaid: true,
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'docs/guides',
          id: 'guides',
          routeBasePath: '/guides',
          ...defaultSettings,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/api-reference.css'),
          ],
        },
        sitemap: {
          ignorePatterns: ['**/tags/**', '/api/*'],
        },
        googleTagManager: {
          containerId: 'GTM-5FDFFSS',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: '/img/dyte-docs-card.png',
      colorMode: {
        defaultMode: 'light',
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
          hideable: true,
        },
      },
      navbar: {
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Dyte Documentation | Dyte Docs',
          height: '40px',
          width: '101px',
        },
        items: [
          {
            label: 'Guides',
            to: 'guides',
            className: 'guides-top-header',
          },
          {
            label: 'SDKs',
            type: 'dropdown',
            className: 'dyte-dropdown',
            items: [
              {
                type: 'html',
                value: sdksHTML,
                className: 'dyte-dropdown',
              },
            ],
          },
          {
            label: 'REST API',
            to: '/api/',
          },
          {
            label: 'Resources',
            type: 'dropdown',
            className: 'dyte-dropdown resources-dropdown',
            items: [
              {
                type: 'html',
                value: resourcesHTML,
                className: 'dyte-dropdown',
              },
            ],
          },
          {
            label: 'Support',
            to: 'https://dyte.io/contact?type=docs',
          },

          {
            type: 'search',
            position: 'right',
          },
          {
            label: 'Book a demo',
            href: 'https://dyte.io/schedule-demo',
            position: 'right',
            className: 'navbar-book-demo',
          },
          {
            label: 'Sign Up',
            href: 'https://dev.dyte.io/register',
            position: 'right',
            className: 'dev-portal-signup dev-portal-link',
          },
        ],
      },
      footer: {
        logo: {
          href: '/',
          src: '/logo/light.svg',
          srcDark: '/logo/dark.svg',
          alt: 'Dyte Documentation | Dyte Docs',
          height: '36px',
        },
        links: [
          {
            title: 'Product',
            items: [
              {
                label: 'Demo',
                href: 'https://app.dyte.io',
              },
              {
                label: 'Developer Portal',
                href: 'https://dev.dyte.io',
              },
              {
                label: 'Pricing',
                href: 'https://dyte.io/#pricing',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About Us',
                href: 'https://dyte.io',
              },
              {
                label: 'Join Us',
                href: 'https://dyte.freshteam.com/jobs',
              },
              {
                label: 'Privacy Policy',
                href: 'https://dyte.io/privacy-policy',
              },
              {
                label: 'Contact Us',
                href: 'https://dyte.io/contact',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Documentation',
                href: '/',
              },
              {
                label: 'Blog',
                href: 'https://dyte.io/blog',
              },
            ],
          },
        ],
        copyright: 'Copyright © Dyte since 2023. All rights reserved.',
      },
      prism: {
        theme: code_themes.light,
        darkTheme: code_themes.dark,
        additionalLanguages: [
          'dart',
          'ruby',
          'groovy',
          'kotlin',
          'java',
          'swift',
          'objectivec',
          'json',
          'bash',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'highlight-next-line-error',
          },
        ],
      },
    }),

  // webpack: {
  //   jsLoader: (isServer) => ({
  //     loader: require.resolve('swc-loader'),
  //     options: {
  //       jsc: {
  //         parser: {
  //           syntax: 'typescript',
  //           tsx: true,
  //         },
  //         target: 'es2017',
  //       },
  //       module: {
  //         type: isServer ? 'commonjs' : 'es6',
  //       },
  //     },
  //   }),
  // },
};

module.exports = config;
