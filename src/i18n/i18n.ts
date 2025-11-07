import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: {
    remote_title: 'Remote App',
    mf_sharing: 'Sharing components via Module Federation',
    token_received: 'Token Received from Host!',
    not_authenticated: 'Not Authenticated',
    view_jwt: 'View Full JWT Token',
    shared_counter: 'Shared Counter',
    shared_counter_desc: 'This counter is managed globally in the Host and shared with the Remote.',
    endpoint: 'Remote Endpoint'
  }},
  pt: { translation: {
    remote_title: 'Aplicação Remota',
    mf_sharing: 'Compartilhando componentes via Module Federation',
    token_received: 'Token recebido do Host!',
    not_authenticated: 'Não autenticado',
    view_jwt: 'Ver token JWT completo',
    shared_counter: 'Contador Compartilhado',
    shared_counter_desc: 'Este contador é gerenciado globalmente no Host e compartilhado com o Remote.',
    endpoint: 'Endpoint Remoto'
  }},
  es: { translation: {
    remote_title: 'Aplicación Remota',
    mf_sharing: 'Compartiendo componentes vía Module Federation',
    token_received: 'Token recibido del Host!',
    not_authenticated: 'No autenticado',
    view_jwt: 'Ver token JWT completo',
    shared_counter: 'Contador Compartido',
    shared_counter_desc: 'Este contador se gestiona globalmente en el Host y se comparte con el Remote.',
    endpoint: 'Endpoint Remoto'
  }}
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

export default i18n
