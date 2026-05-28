import React, { useState } from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

type IconProps = {
  className?: string;
};

const WhatsAppIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.51 0 .17 5.34.17 11.9c0 2.1.55 4.14 1.59 5.94L.07 24l6.31-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9a11.83 11.83 0 0 0-3.46-8.42Zm-8.44 18.3h-.01a9.88 9.88 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.24c0-5.45 4.44-9.89 9.9-9.89a9.83 9.83 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 7c-.01 5.43-4.45 9.87-9.89 9.87Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.34Z" />
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
    <path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03a10.7 10.7 0 0 1-4.2-.97 12.1 12.1 0 0 1-1.62-.93c-.01 2.92.01 5.84-.02 8.75a7.74 7.74 0 0 1-1.35 3.94A7.44 7.44 0 0 1 9.33 24a7.23 7.23 0 0 1-4.08-1.03 7.55 7.55 0 0 1-3.65-5.71c-.02-.5-.03-1-.01-1.49a7.5 7.5 0 0 1 2.58-4.96 7.33 7.33 0 0 1 6.15-1.72c.02 1.48-.04 2.96-.04 4.44a3.32 3.32 0 0 0-3.02.37 3.1 3.1 0 0 0-1.36 1.75c-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87a3.5 3.5 0 0 0 2.77-1.61c.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
  </svg>
);

const socialLinks = [
  { label: 'WhatsApp', href: 'https://whatsapp.com/channel/0029Va95ZwrKGGGOSjeV1o0e', icon: WhatsAppIcon },
  { label: 'Facebook', href: 'http://www.facebook.com/pharmacy.design', icon: Facebook },
  { label: 'Instagram', href: 'https://www.instagram.com/sartorettoverna/', icon: Instagram },
  { label: 'LinkedIn', href: 'https://it.linkedin.com/company/sartoretto-verna', icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/user/SartorettoVernaSrl', icon: Youtube },
  { label: 'TikTok', href: 'https://www.tiktok.com/@sartorettoverna?_r=1&_t=ZN-95wMOkxkHkk', icon: TikTokIcon },
] as const;

export default function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-8 px-8 md:px-14 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center gap-6">
        <p className="order-3 md:order-1 text-center md:text-left text-white/30 text-sm font-sans">
          &copy; {new Date().getFullYear()} Sartoretto Verna S.R.L. &mdash; P.IVA 07291841000
        </p>

          <nav className="order-1 md:order-2 flex justify-center" aria-label="Canali social Sartoretto Verna">
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="group inline-flex h-11 w-11 items-center justify-center border border-white/15 text-white/55 transition-all duration-200 hover:-translate-y-0.5 hover:border-acid hover:bg-acid hover:text-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                >
                  <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-105" />
                </a>
              ))}
            </div>
          </nav>

          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={privacyOpen}
            className="order-2 md:order-3 justify-self-center md:justify-self-end text-white/30 text-sm font-sans hover:text-white/60 transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </footer>

      {privacyOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-acid text-xs uppercase tracking-[0.3em] font-semibold mb-2">Privacy Policy</p>
                <h2 className="text-white text-2xl font-display">Informativa sulla privacy</h2>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Chiudi privacy policy"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[78vh] overflow-y-auto px-6 py-5 text-white/80 text-sm leading-relaxed space-y-5">
              <p>
                Regolamento Generale sulla Protezione dei Dati (GDPR - General Data Protection Regulation) n. 679/2016.
              </p>
              <p>
                Con questa pagina si intendono informare gli utenti del presente sito circa le modalità di gestione dello stesso con riguardo al trattamento dei loro dati personali, così come prescritto dall’art. 13 e 14 del Regolamento europeo n.679/2016 – General Data Protection Regulation.
              </p>
              <p>
                La presente informativa rispetta e si conforma pienamente anche alla Raccomandazione n. 2/2001 che le autorità europee per la protezione dei dati personali, riunite nel Gruppo istituito dall’art. 29 della direttiva n. 95/46/CE, hanno adottato il 17 maggio 2001 per individuare alcuni requisiti minimi per la raccolta di dati personali online e, in particolare, le modalità, i tempi e la natura delle informazioni che i titolari del trattamento devono fornire agli utenti quando questi si collegano a pagine web, indipendentemente dagli scopi del collegamento.
              </p>
              <p>
                Con la consultazione di questo sito possono essere trattati dati relativi a persone identificate o identificabili.
              </p>
              <p>
                Si specifica che i meccanismi di consenso saranno evidenti, brevi e facilmente comprensibili; se le condizioni originali per cui si è chiesto il consenso dovessero subire modifiche, per esempio se cambiasse lo scopo del trattamento dei dati, sarà richiesto un ulteriore consenso ai sensi del Regolamento Europeo n. 679/2016.
              </p>
              <p>
                Si specifica inoltre che tutti i consensi raccolti saranno oggetto di documentazione tenuta separata da qualsiasi altro documento aziendale.
              </p>
              <p className="font-semibold text-white">Informazioni di contatto</p>
              <p>
                I Suoi dati personali non saranno oggetto di diffusione e le è riconosciuto l’esercizio dei diritti di cui agli artt. 11-20 del Regolamento europeo n. 679/2016 scrivendo a: Sartoretto Verna Srl – Via Trionfale 13592 – 00135 ROMA (RM) oppure a info@sartorettoverna.it
              </p>
              <p>
                In qualsiasi momento potrà richiedere l’accesso ai suoi Dati Personali, la rettifica o la cancellazione degli stessi o di opporsi al loro trattamento compilando direttamente il webform a questo link:
              </p>
              <p>
                <a href="https://goo.gl/Jns6Ar" target="_blank" rel="noreferrer" className="text-acid underline transition-colors hover:text-white">https://goo.gl/Jns6Ar</a>
              </p>
              <p className="font-semibold text-white">Titolare del trattamento</p>
              <p>
                Sartoretto Verna Srl – Sede legale e operativa: Via Trionfale 13592 – 00135 ROMA (RM)
              </p>
              <p>info@sartorettoverna.it</p>
              <p className="font-semibold text-white">Responsabile per la protezione dei dati</p>
              <p>
                Sartoretto Verna Srl – Sede legale e operativa: Via Trionfale 13592 – 00135 ROMA (RM)
              </p>
              <p>info@sartorettoverna.it</p>
              <p className="font-semibold text-white">Tipologie di dati raccolti</p>
              <p>
                Fra i dati personali raccolti da questo sito, in modo autonomo o tramite terze parti, ci sono: cookie, dati di utilizzo, nome, cognome, numero di telefono e indirizzo e-mail.
              </p>
              <p>
                Altri dati personali raccolti potrebbero essere indicati in altre sezioni di questa privacy policy o mediante testi informativi visualizzati contestualmente alla raccolta dei dati stessi.
              </p>
              <p>
                I dati personali possono essere inseriti volontariamente dall’Utente, oppure raccolti in modo automatico durante l’uso di questo sito.
              </p>
              <p>
                L’eventuale utilizzo di cookie – o di altri strumenti di tracciamento – da parte di questa applicazione o dei titolari dei servizi terzi utilizzati da questo sito, ove non diversamente precisato, ha la finalità di identificare l’utente e registrare le relative preferenze per finalità strettamente legate all’erogazione del servizio richiesto dall’Utente.
              </p>
              <p>
                Il mancato conferimento da parte dell’Utente di alcuni Dati Personali potrebbe impedire al sito di erogare i propri servizi. L’Utente si assume la responsabilità dei Dati Personali di terzi pubblicati sul sito e garantisce di avere il diritto di comunicarli o diffonderli, liberando il Titolare da qualsiasi responsabilità verso terzi.
              </p>
              <p className="font-semibold text-white">Modalità e luogo del trattamento dei dati raccolti</p>
              <p className="font-semibold text-white">Modalità di trattamento</p>
              <p>
                Il titolare tratta i dati personali degli utenti adottando le opportune misure di sicurezza volte a impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate dei dati personali.
              </p>
              <p>
                Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate. Oltre al titolare, in alcuni casi, potrebbero avere accesso ai dati categorie di incaricati coinvolti nell’organizzazione del sito (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione) nominati anche, se necessario, responsabili del trattamento da parte del titolare. L’elenco aggiornato dei Responsabili potrà sempre essere richiesto al titolare del trattamento.
              </p>
              <p className="font-semibold text-white">Luogo</p>
              <p>
                I trattamenti connessi ai servizi web di questo sito hanno luogo presso la predetta sede e presso la sede del service provider del sito e sono curati solo dal personale dell’azienda, oppure da eventuali incaricati di occasionali operazioni di manutenzione.
              </p>
              <p>
                I dati non sono trasferiti in paesi esterni alla UE. Per ulteriori informazioni contatta il Titolare.
              </p>
              <p className="font-semibold text-white">Tempi</p>
              <p>
                I dati sono trattati per il tempo necessario allo svolgimento del servizio richiesto dall’Utente o richiesto dalle finalità descritte in questo documento e l’Utente può sempre chiedere l’interruzione del Trattamento o la cancellazione dei dati contattando il Titolare.
              </p>
              <p className="font-semibold text-white">Finalità del trattamento dei dati raccolti</p>
              <p>
                I dati personali forniti dagli utenti che inoltrano richieste di invio di materiale informativo (richieste di informazioni, ecc.) sono utilizzati al solo fine di eseguire il servizio o la prestazione richiesta e sono comunicati a terzi nel solo caso in cui ciò sia a tal fine necessario.
              </p>
              <p>
                I Suoi dati verranno trattati con strumenti informatici/telematici per fornire i seguenti servizi:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-white/80">
                <li>invio di newsletter nonché per elaborare studi e ricerche statistiche e di mercato;</li>
                <li>invio di contenuti editoriali, e-book, white paper, guide e monografie;</li>
                <li>partecipazione ad eventi e convegni;</li>
                <li>invio di novità o iniziative commerciali.</li>
              </ul>
              <p>
                L’utilizzo dei Suoi dati avverrà con modalità idonee a garantire la sicurezza e la riservatezza degli stessi e sarà indicato espressamente al momento della registrazione al servizio.
              </p>
              <p>
                Si informa altresì che i dati da Lei forniti non verranno trasmessi né divulgati a soggetti terzi, privati o pubblici, se non in forma aggregata e anonima o in caso di provvedimento dell’Autorità Giudiziaria, salvo i casi elencati nei punti sopra e previo consenso.
              </p>
              <p className="font-semibold text-white">Titolare del trattamento è Sartoretto Verna Srl – Via Trionfale 13592 – 00135 ROMA (RM)</p>
              <p>
                L’elenco dettagliato dei soggetti nominati responsabili del trattamento Le sarà fornito dalla Stessa a seguito di Sua espressa richiesta.
              </p>
              <p className="font-semibold text-white">Ulteriori informazioni sul trattamento</p>
              <p>
                Difesa in giudizio
              </p>
              <p>
                I Dati Personali dell’Utente possono essere utilizzati per la difesa da parte del Titolare in giudizio o nelle fasi propedeutiche alla sua eventuale instaurazione, da abusi nell’utilizzo della stessa o dei servizi connessi da parte dell’Utente.
              </p>
              <p>
                L’Utente dichiara di essere consapevole che il Titolare potrebbe essere richiesto di rivelare i Dati su richiesta delle pubbliche autorità.
              </p>
              <p className="font-semibold text-white">Reclamo all’autorità competente</p>
              <p>
                Può essere sporto reclamo in relazione al trattamento all’Autorità competente: Garante sulla Protezione dei Dati personali, Piazza di Monte Citorio n. 121 00186 ROMA, Fax: (+39) 06.69677.3785, Centralino telefonico: (+39) 06.696771, E-mail: garante@gpdp.it
              </p>
              <p className="font-semibold text-white">Informative specifiche</p>
              <p>
                Su richiesta dell’Utente, in aggiunta alle informazioni contenute in questa privacy policy, il sito potrebbe fornire all’Utente delle informative aggiuntive e contestuali riguardanti servizi specifici, o la raccolta ed il trattamento di Dati Personali.
              </p>
              <p className="font-semibold text-white">Log di sistema e manutenzione</p>
              <p>
                Per necessità legate al funzionamento e alla manutenzione, il sito e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere Log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l’indirizzo IP Utente.
              </p>
              <p className="font-semibold text-white">Informazioni non contenute in questa policy</p>
              <p>
                Maggiori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando le informazioni di contatto.
              </p>
              <p className="font-semibold text-white">Esercizio dei diritti da parte degli Utenti</p>
              <p>
                I soggetti cui si riferiscono i Dati Personali hanno il diritto in qualunque momento di ottenere la conferma dell’esistenza o meno degli stessi presso il Titolare del Trattamento, di conoscerne il contenuto e l’origine, di verificarne l’esattezza o chiederne l’integrazione, la cancellazione, l’aggiornamento, la rettifica, la trasformazione in forma anonima o il blocco dei Dati Personali trattati in violazione di legge, nonché di opporsi in ogni caso, per motivi legittimi, al loro trattamento. Le richieste vanno rivolte al Titolare del Trattamento.
              </p>
              <p className="font-semibold text-white">Modifiche a questa privacy policy</p>
              <p>
                Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento dandone pubblicità agli Utenti su questa pagina. Si prega dunque di consultare spesso questa pagina, prendendo come riferimento la data di ultima modifica indicata in fondo. Nel caso di mancata accettazione delle modifiche apportate alla presente privacy policy, l’Utente è tenuto a cessare l’utilizzo di questa Applicazione e può richiedere al Titolare del Trattamento di rimuovere i propri Dati Personali. Salvo quanto diversamente specificato, la precedente privacy policy continuerà ad applicarsi ai Dati Personali sino a quel momento raccolti.
              </p>
              <p className="font-semibold text-white">Informazioni su questa privacy policy</p>
              <p>
                Il Titolare del Trattamento dei Dati è responsabile per questa privacy policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
