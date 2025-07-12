import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BotFire",
  description:
    "Modern PHP library for building Telegram bots based on Telegram standard documents",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
    ],

    sidebar: [
      {
        text: "Introduction",
        items: [
          { text: "What is BotFire", link: "/what-is-botfire" },
          { text: "Getting Started", link: "/getting-started" },
        ],
      },
      {
        text:"Input Methods",
        items:[
          {text:'Get Event', link:'/get-event'},
          {text:'Get Message', link:'/get-message'},
          {text:'Get Callback', link:'/get-callback'},

        ]
      },
      {
        text:"Send Methods",
        items:[
          {text:'Send Message', link:'/input-methods/send-message'},
          {text:'Send Photo', link:'/input-methods/send-photo'},
          {text:'Send Video', link:'/input-methods/send-video'},
          {text:'Send Audio', link:'/input-methods/send-audio'},
          {text:'Send Document', link:'/input-methods/send-document'},
          {text:'Send Location', link:'/input-methods/send-location'},
          {text:'Send Contact', link:'/input-methods/send-contact'},
          // {text:'Send Poll', link:'/send-poll'},
        ]
      },
      {
        text: "Helpers",
        items:[
          {text:'Markdown Builder', link:'/markdown-builder'},
        ]
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/botfire/botfire" },
    ],
  },
});
