import { createI18n } from 'vue-i18n';

import es from '../locales/es.json';
import en from '../locales/en.json';

// Se Crea un Schema del JSON de es
type MessageSchema = typeof es;

// Se crea Messages con el schema de es, igualandolo al de en, 
// por lo que ambos tienen que tener los mismos valores en las llaves,
// sino mostrará error al ejecutarse.
const messages: Record<string, MessageSchema> = { es, en };

const i18n = createI18n({
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages
});

export default i18n;