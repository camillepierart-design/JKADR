export const languages = { en: 'EN', fr: 'FR' } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = 'en';

/** Logical (English) route → both locales share the same slugs. */
export function getLangFromUrl(url: URL): Lang {
  const seg = url.pathname.split('/').filter(Boolean)[0];
  return seg === 'fr' ? 'fr' : 'en';
}

/** Canonical (locale-stripped) path, always starting with '/'. */
export function canonicalPath(pathname: string): string {
  const p = pathname.replace(/^\/fr(?=\/|$)/, '');
  return p === '' ? '/' : p.replace(/\/$/, '') || '/';
}

/** Localised href for a canonical path in a given language. */
export function localize(lang: Lang, path: string): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  return lang === 'fr' ? `/fr${clean}` || '/fr' : clean || '/';
}

/** The same page in the other language (for the switcher). */
export function altHref(url: URL, target: Lang): string {
  return localize(target, canonicalPath(url.pathname));
}

type Dict = Record<string, string>;

const en: Dict = {
  'site.tagline': 'experience – efficiency – academic depth',
  'site.sub': 'Arbitration · Mediation',
  'site.subLong': 'Arbitration · Mediation · Brussels',

  'nav.home': 'Home',
  'nav.about': 'About',
  'nav.team': 'Team',
  'nav.practice': 'Practice',
  'nav.experience': 'Experience',
  'nav.publications': 'Publications & Speaking',
  'nav.contact': 'Contact',

  'a11y.openMenu': 'Open menu',
  'a11y.closeMenu': 'Close menu',
  'a11y.primaryNav': 'Primary',
  'a11y.skip': 'Skip to content',
  'a11y.langEn': 'Read this page in English',
  'a11y.langFr': 'Lire cette page en français',

  'cta.readMore': 'Read more',
  'cta.thePractice': 'The practice',
  'cta.allProfiles': 'All profiles',
  'cta.getInTouch': 'Get in touch',
  'cta.sendMessage': 'Send message',
  'cta.backHome': 'Back to home',
  'cta.viewMap': 'View location on map',
  'cta.downloadCv': 'Download CV (PDF)',
  'cta.readProfile': 'read profile',

  'home.heroEyebrow': 'International Arbitration & Mediation',
  'home.aboutEyebrow': 'About',
  'home.aboutHeading': 'Two decades of academic depth, brought to the practice of international arbitration.',
  'home.aboutBody':
    'After 20 years in academia, most of them at the Law School of the London School of Economics, Jan Kleinheisterkamp changed gears when turning 50 in 2021 — focusing on his practice as an arbitrator, which he had started in 2006 alongside his academic work. Since 2019, he has also been developing his skills in international mediation.',
  'home.onlyArb': 'Prof. Dr. Kleinheisterkamp only acts as arbitrator and mediator, not as counsel.',
  'home.factSince': 'Arbitrating since',
  'home.factLangs': 'Languages of work',
  'home.factIcsid': 'ICSID',
  'home.factIcsidVal': 'Panel of Conciliators',
  'home.practiceEyebrow': 'Practice',
  'home.arbHeading': 'Arbitration',
  'home.arbBody':
    'Sole arbitrator, presiding arbitrator and co-arbitrator in ICC, LCIA and UNCITRAL proceedings, as well as emergency arbitrator proceedings and expert determination — across construction, energy, finance, pharmaceuticals, infrastructure and investor-state disputes, with a total value exceeding a billion U.S. dollars.',
  'home.medHeading': 'Mediation',
  'home.medBody':
    "Accredited by the Belgian Federal Commission for Mediation as médiateur agréé and appointed by the UK Government to the World Bank's ICSID Panel of Conciliators — assisting parties to find the best possible solutions, often co-mediating with experienced colleagues.",
  'home.teamEyebrow': 'Team',
  'home.teamHeading': 'A small, experienced team.',
  'home.contactEyebrow': 'Contact',
  'home.contactHeading': 'For appointments and enquiries.',

  'about.eyebrow': 'About',
  'about.title': 'A boutique practice in international dispute resolution.',
  'about.aside': 'The practice',
  'practice.eyebrow': 'Practice',
  'practice.title': 'Arbitration & Mediation',
  'practice.lede': 'Two complementary disciplines for the resolution of complex international disputes.',
  'team.eyebrow': 'The People',
  'team.title': 'Team',
  'team.lede':
    'A small team of experienced practitioners supporting the efficient conduct of complex international proceedings.',
  'experience.eyebrow': 'Track Record',
  'experience.title': 'Experience',
  'experience.lede': 'Examples of experience in international dispute settlement, by procedural role.',
  'pubs.eyebrow': 'Scholarship',
  'pubs.title': 'Publications & Speaking',
  'pubs.lede':
    'Selected publications and recent speaking engagements across international arbitration, comparative law and investment treaty law.',
  'pubs.publications': 'Publications',
  'pubs.speaking': 'Speaking',

  'contact.eyebrow': 'Get in touch',
  'contact.title': 'Contact',
  'contact.lede': 'For appointments as arbitrator or mediator, and for general enquiries.',
  'contact.office': 'Office',
  'contact.sendTitle': 'Send a message',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.tel': 'Tel',
  'contact.vat': 'VAT',
  'contact.sending': 'Sending…',
  'contact.sent': 'Thank you — your message has been sent.',
  'contact.error': 'Something went wrong. Please email us directly.',
  'contact.opening': 'Opening your email client…',
  'contact.mailSubject': 'Website enquiry',

  'profile.aside': 'Profile',
  'profile.languages': 'Languages',
  'profile.prev': 'Previous',
  'profile.next': 'Next',
  'profile.career': 'Career',
  'profile.backTeam': 'Team',

  'footer.pages': 'Pages',
  'footer.contact': 'Contact',
  'footer.legal': 'Legal Terms & Privacy',
  'footer.rights': 'All rights reserved.',
  'footer.brussels': 'Brussels · Worldwide',

  'nf.eyebrow': 'Error 404',
  'nf.title': 'The page you are looking for could not be found.',
  'nf.body': 'It may have been moved or no longer exists.',
};

const fr: Dict = {
  'site.tagline': 'expérience – efficacité – profondeur académique',
  'site.sub': 'Arbitrage · Médiation',
  'site.subLong': 'Arbitrage · Médiation · Bruxelles',

  'nav.home': 'Accueil',
  'nav.about': 'À propos',
  'nav.team': 'Équipe',
  'nav.practice': 'Pratique',
  'nav.experience': 'Expérience',
  'nav.publications': 'Publications & Conférences',
  'nav.contact': 'Contact',

  'a11y.openMenu': 'Ouvrir le menu',
  'a11y.closeMenu': 'Fermer le menu',
  'a11y.primaryNav': 'Principale',
  'a11y.skip': 'Aller au contenu',
  'a11y.langEn': 'Read this page in English',
  'a11y.langFr': 'Lire cette page en français',

  'cta.readMore': 'En savoir plus',
  'cta.thePractice': 'La pratique',
  'cta.allProfiles': 'Tous les profils',
  'cta.getInTouch': 'Nous contacter',
  'cta.sendMessage': 'Envoyer le message',
  'cta.backHome': "Retour à l'accueil",
  'cta.viewMap': 'Voir sur la carte',
  'cta.downloadCv': 'Télécharger le CV (PDF)',
  'cta.readProfile': 'voir le profil',

  'home.heroEyebrow': 'Arbitrage & Médiation internationaux',
  'home.aboutEyebrow': 'À propos',
  'home.aboutHeading':
    "Deux décennies de profondeur académique, mises au service de la pratique de l'arbitrage international.",
  'home.aboutBody':
    "Après 20 ans dans le monde académique, principalement à la Law School de la London School of Economics, Jan Kleinheisterkamp a changé de cap en 2021, à 50 ans, pour se consacrer à sa pratique d'arbitre, entamée dès 2006 en parallèle de ses travaux universitaires. Depuis 2019, il développe également sa pratique de la médiation internationale.",
  'home.onlyArb': "Le Prof. Dr. Kleinheisterkamp n'intervient que comme arbitre et médiateur, jamais comme conseil.",
  'home.factSince': 'Arbitre depuis',
  'home.factLangs': 'Langues de travail',
  'home.factIcsid': 'CIRDI',
  'home.factIcsidVal': 'Panel de conciliateurs',
  'home.practiceEyebrow': 'Pratique',
  'home.arbHeading': 'Arbitrage',
  'home.arbBody':
    "Arbitre unique, président de tribunal et co-arbitre dans des procédures CCI, LCIA et CNUDCI, ainsi qu'en arbitrage d'urgence et en expertise — en construction, énergie, finance, pharmacie, infrastructures et différends investisseur-État, pour une valeur totale dépassant le milliard de dollars US.",
  'home.medHeading': 'Médiation',
  'home.medBody':
    "Médiateur agréé par la Commission fédérale de médiation belge et nommé par le gouvernement britannique au Panel de conciliateurs du CIRDI (Banque mondiale) — il aide les parties à trouver les meilleures solutions, souvent en co-médiation avec des confrères expérimentés.",
  'home.teamEyebrow': 'Équipe',
  'home.teamHeading': 'Une équipe restreinte et expérimentée.',
  'home.contactEyebrow': 'Contact',
  'home.contactHeading': 'Pour toute nomination ou demande.',

  'about.eyebrow': 'À propos',
  'about.title': "Une pratique boutique en résolution des différends internationaux.",
  'about.aside': 'La pratique',
  'practice.eyebrow': 'Pratique',
  'practice.title': 'Arbitrage & Médiation',
  'practice.lede': 'Deux disciplines complémentaires pour résoudre des différends internationaux complexes.',
  'team.eyebrow': 'Les personnes',
  'team.title': 'Équipe',
  'team.lede':
    "Une équipe restreinte de praticiens expérimentés au service de la conduite efficace de procédures internationales complexes.",
  'experience.eyebrow': 'Affaires',
  'experience.title': 'Expérience',
  'experience.lede': "Exemples d'expérience en règlement des différends internationaux, par rôle procédural.",
  'pubs.eyebrow': 'Recherche',
  'pubs.title': 'Publications & Conférences',
  'pubs.lede':
    "Sélection de publications et d'interventions récentes en arbitrage international, droit comparé et droit des traités d'investissement.",
  'pubs.publications': 'Publications',
  'pubs.speaking': 'Conférences',

  'contact.eyebrow': 'Nous contacter',
  'contact.title': 'Contact',
  'contact.lede': "Pour toute nomination comme arbitre ou médiateur, et pour toute demande générale.",
  'contact.office': 'Cabinet',
  'contact.sendTitle': 'Envoyer un message',
  'contact.name': 'Nom',
  'contact.email': 'E-mail',
  'contact.message': 'Message',
  'contact.tel': 'Tél',
  'contact.vat': 'TVA',
  'contact.sending': 'Envoi…',
  'contact.sent': 'Merci — votre message a bien été envoyé.',
  'contact.error': "Une erreur est survenue. Merci de nous écrire directement.",
  'contact.opening': 'Ouverture de votre messagerie…',
  'contact.mailSubject': 'Demande via le site',

  'profile.aside': 'Profil',
  'profile.languages': 'Langues',
  'profile.prev': 'Précédent',
  'profile.next': 'Suivant',
  'profile.career': 'Parcours',
  'profile.backTeam': 'Équipe',

  'footer.pages': 'Pages',
  'footer.contact': 'Contact',
  'footer.legal': 'Mentions légales & confidentialité',
  'footer.rights': 'Tous droits réservés.',
  'footer.brussels': 'Bruxelles · International',

  'nf.eyebrow': 'Erreur 404',
  'nf.title': "La page que vous cherchez est introuvable.",
  'nf.body': "Elle a peut-être été déplacée ou n'existe plus.",
};

const dict: Record<Lang, Dict> = { en, fr };

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return dict[lang][key] ?? dict.en[key] ?? key;
  };
}
