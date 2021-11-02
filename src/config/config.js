/*import React, { lazy } from 'react'*/
import { lazy } from 'react'
import locales from './locales'
import routes from './routes'
import getMenuItems from './menuItems'
import themes from './themes'
import parseLanguages from 'base-shell/lib/utils/locale'

const config = {
  auth: {
    signInURL: '/signin',
  },
  routes,
  locale: {
    locales,
    defaultLocale: parseLanguages('es'),
    onError: (e) => {
      //console.warn(e)

      return
    },
  },
  menu: {
    getMenuItems,
  },
  theme: {
    themes,
    defaultThemeID: 'default',
    defaultType: 'light',
  },
  pages: {
    LandingPage: lazy(() => import('../components/LandingPage/LandingPage')),
    PageNotFound: lazy(() => import('../components/PageNotFound/PageNotFound')),
  },
}

export default config
