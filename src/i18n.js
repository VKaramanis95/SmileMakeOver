import { createI18n } from 'vue-i18n'

function loadLocaleMessages () {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            messages[locale] = locales(key)
        }
    })
    return messages
}

export default createI18n({
    locale: process.env.SITE_DEFAULT_LOCALE || 'en',
    fallbackLocale: process.env.SITE_FALLBACK_LOCALE || 'en',
    messages: loadLocaleMessages()
})