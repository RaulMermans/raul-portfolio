export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

const EXTERNAL_PROTOCOL_PATTERN = /^(?:[a-z]+:)?\/\//i
const SPECIAL_LINK_PATTERN = /^(mailto:|tel:|sms:|data:|blob:)/i

export function getLocalePrefix(locale: Locale) {
  return locale === defaultLocale ? '' : `/${locale}`
}

export function getLocaleFromPath(pathname = '/'): Locale {
  const normalized = normalizePathname(pathname)
  const matchedLocale = locales.find((locale) => normalized === `/${locale}` || normalized.startsWith(`/${locale}/`))

  return matchedLocale ?? defaultLocale
}

function splitHref(href: string) {
  const hashIndex = href.indexOf('#')
  const searchIndex = href.indexOf('?')
  const suffixIndex =
    hashIndex === -1
      ? searchIndex
      : searchIndex === -1
        ? hashIndex
        : Math.min(hashIndex, searchIndex)

  if (suffixIndex === -1) {
    return {
      pathname: href,
      suffix: '',
    }
  }

  return {
    pathname: href.slice(0, suffixIndex),
    suffix: href.slice(suffixIndex),
  }
}

function normalizePathname(pathname: string) {
  if (!pathname || pathname === '/') return '/'
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`
  return normalized.replace(/\/+$/, '') || '/'
}

export function stripLocaleFromPath(pathname = '/') {
  const normalized = normalizePathname(pathname)

  for (const locale of locales) {
    const prefix = `/${locale}`

    if (normalized === prefix) {
      return '/'
    }

    if (normalized.startsWith(`${prefix}/`)) {
      return normalized.slice(prefix.length) || '/'
    }
  }

  return normalized
}

export function localizePath(href: string, locale: Locale) {
  if (!href) return href
  if (href.startsWith('#')) {
    return locale === defaultLocale ? `/${href}` : `${getLocalePrefix(locale)}${href}`
  }
  if (EXTERNAL_PROTOCOL_PATTERN.test(href) || SPECIAL_LINK_PATTERN.test(href)) {
    return href
  }

  const { pathname, suffix } = splitHref(href)
  const basePath = stripLocaleFromPath(pathname || '/')
  const prefix = getLocalePrefix(locale)
  const localizedBase =
    basePath === '/'
      ? prefix || '/'
      : `${prefix}${basePath}`

  return `${localizedBase}${suffix}`
}

export function switchLocalePath(pathname: string, locale: Locale) {
  return localizePath(pathname, locale)
}
