import React, { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

const ZAPIER_URL = 'https://hooks.zapier.com/hooks/catch/1977593/4y67td9/';

const projectTypes = ['Ampliamento', 'Ristrutturazione', 'Nuova apertura', 'Trasferimento', 'Restyling', 'Altro'];

interface FormState {
  nome: string;
  cognome: string;
  farmacia: string;
  email: string;
  telefono: string;
  citta: string;
  tipologia: string;
  messaggio: string;
}

type FieldErrors = Partial<Record<keyof Omit<FormState, 'messaggio'>, string>>;

const requiredFields: Array<keyof Omit<FormState, 'messaggio'>> = [
  'nome',
  'cognome',
  'email',
  'telefono',
  'citta',
  'farmacia',
  'tipologia',
];

const empty: FormState = {
  nome: '', cognome: '', farmacia: '', email: '', telefono: '', citta: '', tipologia: '', messaggio: '',
};

const inputCls =
  'bg-transparent border-b border-[#ccc] text-[#0a0a0a] text-base font-sans font-light py-3 w-full focus:outline-none focus:border-[#0a0a0a] transition-colors duration-200 placeholder:text-[#bbb]';

function Field({ label, id, children, required = false }: { label: React.ReactNode; id: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm tracking-[0.28em] uppercase font-sans text-[#666] font-semibold">
        {label}
        {required && <span className="ml-1 text-[#444]" aria-hidden="true">*</span>}
      </label>
      {children}
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<FieldErrors>({});
  const [privacyOpen, setPrivacyOpen] = useState(false);

  function update(k: keyof FormState, v: string) {
    setForm((p) => ({ ...p, [k]: v }));
    setValidationErrors((prev) => {
      if (!prev[k as keyof Omit<FormState, 'messaggio'>]) return prev;
      const next = { ...prev };
      delete next[k as keyof Omit<FormState, 'messaggio'>];
      return next;
    });
  }

  const inputErrorClass = (field: keyof Omit<FormState, 'messaggio'>) =>
    validationErrors[field] ? 'border-red-500 focus:border-red-500' : '';

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const newErrors: FieldErrors = {};

    requiredFields.forEach((field) => {
      if (!form[field]?.trim()) {
        newErrors[field] = 'Campo obbligatorio';
      }
    });

    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Inserisci un indirizzo email valido';
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setError('Completa i campi obbligatori evidenziati prima di inviare.');
      return;
    }

    setValidationErrors({});
    setSending(true);

    try {
      const payload: Record<string, string> = {
        nome: form.nome,
        cognome: form.cognome,
        email: form.email,
        telefono: form.telefono,
        tipo_progetto: form.tipologia,
        nome_farmacia: form.farmacia,
        citta: form.citta,
        messaggio: form.messaggio,
        pagina: window.location.href,
        origine: 'github-pages-sartoretto-verna-lp',
      };

      await fetch(ZAPIER_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });
      setSent(true);
    } catch {
      setError('Si è verificato un errore. Riprova o chiamaci.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contatti" className="border-t border-[#e0e0e0]">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left: headline + concept book visual */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative px-6 md:px-14 lg:px-20 py-16 md:py-28 flex flex-col justify-between gap-12 bg-[#ebebeb] lg:border-r border-[#ddd] overflow-hidden min-h-[700px]"
        >
          <div>
            <p className="text-teal text-sm tracking-[0.32em] uppercase font-sans font-semibold mb-5">
              Parla con un Architect Manager
            </p>
            <h2
              className="font-display text-[#0a0a0a] uppercase leading-none mb-7"
              style={{ fontSize: 'clamp(2.4rem, 6vw, 6.5rem)' }}
            >
              Hai in mente<br />
              un progetto?
            </h2>
            <p className="text-[#444] text-base md:text-lg font-sans font-light leading-relaxed max-w-[38ch]">
              Raccontaci la tua farmacia. Sarai contattato da un nostro responsabile entro 24h per una prima valutazione del progetto e dei prossimi passi.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {['Contatto da un nostro responsabile entro 24h', 'Analisi orientativa della tua esigenza', 'Percorso progettuale definito su misura'].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 bg-[#0a0a0a] shrink-0" />
                <span className="text-[#555] text-base font-sans">{item}</span>
              </div>
            ))}
          </div>

          {/* Bonus text + concept book visual */}
          <div className="relative z-10 hidden lg:block">
            <p className="text-xs tracking-[0.28em] uppercase font-bold text-[#333] mb-3">
              Ricevi un bonus esclusivo
            </p>
            <p className="text-sm text-[#555] font-sans font-light max-w-[32ch] leading-relaxed mb-8">
              Compila il form e ricevi subito il nostro <strong className="font-normal">Concept Book</strong> gratuitamente.
            </p>
          </div>

          {/* Concept Book visual element - bottom right overflow */}
          <div className="absolute -bottom-48 right-6 w-[40rem] h-[40rem] hidden lg:block pointer-events-none translate-x-10 translate-y-16">
            <img
              src="/concept-book-cover.png"
              alt="Concept Book Sartoretto Verna 2026"
              className="w-full h-full object-contain object-left"
            />
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease, delay: 0.1 }}
          className="px-6 md:px-14 lg:px-16 py-16 md:py-28 bg-[#f5f5f5]"
        >

          <div className="relative z-10 lg:max-w-full">
            {sent ? (
              <div className="flex flex-col gap-5">
                <div className="w-12 h-1 bg-green-500" />
                <h3 className="font-display text-[#0a0a0a] uppercase text-3xl md:text-4xl leading-none">
                  Messaggio inviato.
                </h3>
                <p className="text-green-600 text-base md:text-lg font-sans font-semibold leading-relaxed">
                  Grazie! Sarai contattato da un nostro responsabile nel giro di 24h.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Nome" id="nome" required>
                    <input
                      id="nome"
                      type="text"
                      required
                      autoComplete="given-name"
                      placeholder="Mario"
                      value={form.nome}
                      onChange={(e) => update('nome', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('nome')}`}
                      aria-invalid={Boolean(validationErrors.nome)}
                      aria-describedby={validationErrors.nome ? 'nome-error' : undefined}
                    />
                  </Field>
                  {validationErrors.nome && (
                    <p id="nome-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.nome}
                    </p>
                  )}

                  <Field label="Cognome" id="cognome" required>
                    <input
                      id="cognome"
                      type="text"
                      required
                      autoComplete="family-name"
                      placeholder="Rossi"
                      value={form.cognome}
                      onChange={(e) => update('cognome', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('cognome')}`}
                      aria-invalid={Boolean(validationErrors.cognome)}
                      aria-describedby={validationErrors.cognome ? 'cognome-error' : undefined}
                    />
                  </Field>
                  {validationErrors.cognome && (
                    <p id="cognome-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.cognome}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Email" id="email" required>
                    <input
                      id="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="mario@farmacia.it"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('email')}`}
                      aria-invalid={Boolean(validationErrors.email)}
                      aria-describedby={validationErrors.email ? 'email-error' : undefined}
                    />
                  </Field>
                  {validationErrors.email && (
                    <p id="email-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.email}
                    </p>
                  )}

                  <Field label="Telefono" id="telefono" required>
                    <input
                      id="telefono"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+39 06 1234567"
                      value={form.telefono}
                      onChange={(e) => update('telefono', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('telefono')}`}
                      aria-invalid={Boolean(validationErrors.telefono)}
                      aria-describedby={validationErrors.telefono ? 'telefono-error' : undefined}
                    />
                  </Field>
                  {validationErrors.telefono && (
                    <p id="telefono-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.telefono}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Field label="Città" id="citta" required>
                    <input
                      id="citta"
                      type="text"
                      required
                      placeholder="Es. Roma"
                      value={form.citta}
                      onChange={(e) => update('citta', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('citta')}`}
                      aria-invalid={Boolean(validationErrors.citta)}
                      aria-describedby={validationErrors.citta ? 'citta-error' : undefined}
                    />
                  </Field>
                  {validationErrors.citta && (
                    <p id="citta-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.citta}
                    </p>
                  )}

                  <Field label="Nome farmacia" id="farmacia" required>
                    <input
                      id="farmacia"
                      type="text"
                      required
                      placeholder="Farmacia Centrale"
                      value={form.farmacia}
                      onChange={(e) => update('farmacia', e.target.value)}
                      className={`${inputCls} ${inputErrorClass('farmacia')}`}
                      aria-invalid={Boolean(validationErrors.farmacia)}
                      aria-describedby={validationErrors.farmacia ? 'farmacia-error' : undefined}
                    />
                  </Field>
                  {validationErrors.farmacia && (
                    <p id="farmacia-error" className="text-red-600 text-xs font-sans mt-1">
                      {validationErrors.farmacia}
                    </p>
                  )}
                </div>

                <Field label="Tipo di progetto" id="tipologia" required>
                  <select
                    id="tipologia"
                    required
                    value={form.tipologia}
                    onChange={(e) => update('tipologia', e.target.value)}
                    className={`${inputCls} ${inputErrorClass('tipologia')} cursor-pointer appearance-none bg-transparent`}
                    aria-invalid={Boolean(validationErrors.tipologia)}
                    aria-describedby={validationErrors.tipologia ? 'tipologia-error' : undefined}
                  >
                    <option value="" disabled>Seleziona una tipologia…</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>
                {validationErrors.tipologia && (
                  <p id="tipologia-error" className="text-red-600 text-xs font-sans mt-1">
                    {validationErrors.tipologia}
                  </p>
                )}

                <Field
                  label={
                    <>
                      Messaggio
                      <span className="ml-2 text-xs font-normal tracking-[0.16em] text-[#666] normal-case">
                        (opzionale)
                      </span>
                    </>
                  }
                  id="messaggio"
                >
                  <textarea
                    id="messaggio"
                    rows={4}
                    placeholder="Descrivi brevemente la tua farmacia e il progetto…"
                    value={form.messaggio}
                    onChange={(e) => update('messaggio', e.target.value)}
                    className={`${inputCls} resize-none`}
                  />
                </Field>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full sm:w-auto self-start inline-flex items-center justify-center gap-4 bg-[#0a0a0a] text-white font-sans font-bold text-sm tracking-[0.22em] uppercase px-8 py-4 hover:bg-acid hover:text-dark transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0a0a0a] disabled:hover:text-white"
                  >
                    {sending ? 'Invio in corso…' : 'Prenota una consulenza →'}
                  </button>

                  {error && (
                    <p className="text-red-600 text-sm font-sans font-medium">
                      {error}
                    </p>
                  )}

                  <p className="text-[#aaa] text-sm font-sans">
                    Inviando accetti la nostra{' '}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setPrivacyOpen(true);
                      }}
                      className="underline hover:text-[#555] transition-colors"
                    >
                      Privacy Policy
                    </button>.
                  </p>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      {privacyOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setPrivacyOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-[#ddd] bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-[#e5e5e5] px-6 py-4">
              <div>
                <p className="text-teal text-xs uppercase tracking-[0.3em] font-semibold mb-2">Privacy Policy</p>
                <h2 className="text-[#0a0a0a] text-2xl font-display">Informativa sulla privacy</h2>
              </div>
              <button
                type="button"
                onClick={() => setPrivacyOpen(false)}
                className="text-[#444] hover:text-[#0a0a0a] transition-colors"
                aria-label="Chiudi privacy policy"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[78vh] overflow-y-auto px-6 py-5 text-[#333] text-sm leading-relaxed space-y-5">
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
              <p className="font-semibold text-[#0a0a0a]">Informazioni di contatto</p>
              <p>
                I Suoi dati personali non saranno oggetto di diffusione e le è riconosciuto l’esercizio dei diritti di cui agli artt. 11-20 del Regolamento europeo n. 679/2016 scrivendo a: Sartoretto Verna Srl – Via Trionfale 13592 – 00135 ROMA (RM) oppure a info@sartorettoverna.it
              </p>
              <p>
                In qualsiasi momento potrà richiedere l’accesso ai suoi Dati Personali, la rettifica o la cancellazione degli stessi o di opporsi al loro trattamento compilando direttamente il webform a questo link:
              </p>
              <p>
                <a href="https://goo.gl/Jns6Ar" target="_blank" rel="noreferrer" className="text-teal underline transition-colors hover:text-[#0a0a0a]">
                  https://goo.gl/Jns6Ar
                </a>
              </p>
              <p className="font-semibold text-[#0a0a0a]">Titolare del trattamento</p>
              <p>
                Sartoretto Verna Srl – Sede legale e operativa: Via Trionfale 13592 – 00135 ROMA (RM)
              </p>
              <p>info@sartorettoverna.it</p>
              <p className="font-semibold text-[#0a0a0a]">Responsabile per la protezione dei dati</p>
              <p>
                Sartoretto Verna Srl – Sede legale e operativa: Via Trionfale 13592 – 00135 ROMA (RM)
              </p>
              <p>info@sartorettoverna.it</p>
              <p className="font-semibold text-[#0a0a0a]">Tipologie di dati raccolti</p>
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
              <p className="font-semibold text-[#0a0a0a]">Modalità e luogo del trattamento dei dati raccolti</p>
              <p className="font-semibold text-[#0a0a0a]">Modalità di trattamento</p>
              <p>
                Il titolare tratta i dati personali degli utenti adottando le opportune misure di sicurezza volte a impedire l’accesso, la divulgazione, la modifica o la distruzione non autorizzate dei dati personali.
              </p>
              <p>
                Il trattamento viene effettuato mediante strumenti informatici e/o telematici, con modalità organizzative e con logiche strettamente correlate alle finalità indicate. Oltre al titolare, in alcuni casi, potrebbero avere accesso ai dati categorie di incaricati coinvolti nell’organizzazione del sito (personale amministrativo, commerciale, marketing, legali, amministratori di sistema) ovvero soggetti esterni (come fornitori di servizi tecnici terzi, corrieri postali, hosting provider, società informatiche, agenzie di comunicazione) nominati anche, se necessario, responsabili del trattamento da parte del titolare. L’elenco aggiornato dei Responsabili potrà sempre essere richiesto al titolare del trattamento.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Luogo</p>
              <p>
                I trattamenti connessi ai servizi web di questo sito hanno luogo presso la predetta sede e presso la sede del service provider del sito e sono curati solo dal personale dell’azienda, oppure da eventuali incaricati di occasionali operazioni di manutenzione.
              </p>
              <p>
                I dati non sono trasferiti in paesi esterni alla UE. Per ulteriori informazioni contatta il Titolare.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Tempi</p>
              <p>
                I dati sono trattati per il tempo necessario allo svolgimento del servizio richiesto dall’Utente o richiesto dalle finalità descritte in questo documento e l’Utente può sempre chiedere l’interruzione del Trattamento o la cancellazione dei dati contattando il Titolare.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Finalità del trattamento dei dati raccolti</p>
              <p>
                I dati personali forniti dagli utenti che inoltrano richieste di invio di materiale informativo (richieste di informazioni, ecc.) sono utilizzati al solo fine di eseguire il servizio o la prestazione richiesta e sono comunicati a terzi nel solo caso in cui ciò sia a tal fine necessario.
              </p>
              <p>
                I Suoi dati verranno trattati con strumenti informatici/telematici per fornire i seguenti servizi:
              </p>
              <ul className="ml-5 list-disc space-y-2 text-[#333]">
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
              <p className="font-semibold text-[#0a0a0a]">Titolare del trattamento è Sartoretto Verna Srl – Via Trionfale 13592 – 00135 ROMA (RM)</p>
              <p>
                L’elenco dettagliato dei soggetti nominati responsabili del trattamento Le sarà fornito dalla Stessa a seguito di Sua espressa richiesta.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Ulteriori informazioni sul trattamento</p>
              <p>
                Difesa in giudizio
              </p>
              <p>
                I Dati Personali dell’Utente possono essere utilizzati per la difesa da parte del Titolare in giudizio o nelle fasi propedeutiche alla sua eventuale instaurazione, da abusi nell’utilizzo della stessa o dei servizi connessi da parte dell’Utente.
              </p>
              <p>
                L’Utente dichiara di essere consapevole che il Titolare potrebbe essere richiesto di rivelare i Dati su richiesta delle pubbliche autorità.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Reclamo all’autorità competente</p>
              <p>
                Può essere sporto reclamo in relazione al trattamento all’Autorità competente: Garante sulla Protezione dei Dati personali, Piazza di Monte Citorio n. 121 00186 ROMA, Fax: (+39) 06.69677.3785, Centralino telefonico: (+39) 06.696771, E-mail: garante@gpdp.it
              </p>
              <p className="font-semibold text-[#0a0a0a]">Informative specifiche</p>
              <p>
                Su richiesta dell’Utente, in aggiunta alle informazioni contenute in questa privacy policy, il sito potrebbe fornire all’Utente delle informative aggiuntive e contestuali riguardanti servizi specifici, o la raccolta ed il trattamento di Dati Personali.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Log di sistema e manutenzione</p>
              <p>
                Per necessità legate al funzionamento e alla manutenzione, il sito e gli eventuali servizi terzi da essa utilizzati potrebbero raccogliere Log di sistema, ossia file che registrano le interazioni e che possono contenere anche Dati Personali, quali l’indirizzo IP Utente.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Informazioni non contenute in questa policy</p>
              <p>
                Maggiori informazioni in relazione al trattamento dei Dati Personali potranno essere richieste in qualsiasi momento al Titolare del Trattamento utilizzando le informazioni di contatto.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Esercizio dei diritti da parte degli Utenti</p>
              <p>
                I soggetti cui si riferiscono i Dati Personali hanno il diritto in qualunque momento di ottenere la conferma dell’esistenza o meno degli stessi presso il Titolare del Trattamento, di conoscerne il contenuto e l’origine, di verificarne l’esattezza o chiederne l’integrazione, la cancellazione, l’aggiornamento, la rettifica, la trasformazione in forma anonima o il blocco dei Dati Personali trattati in violazione di legge, nonché di opporsi in ogni caso, per motivi legittimi, al loro trattamento. Le richieste vanno rivolte al Titolare del Trattamento.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Modifiche a questa privacy policy</p>
              <p>
                Il Titolare del Trattamento si riserva il diritto di apportare modifiche alla presente privacy policy in qualunque momento dandone pubblicità agli Utenti su questa pagina. Si prega dunque di consultare spesso questa pagina, prendendo come riferimento la data di ultima modifica indicata in fondo. Nel caso di mancata accettazione delle modifiche apportate alla presente privacy policy, l’Utente è tenuto a cessare l’utilizzo di questa Applicazione e può richiedere al Titolare del Trattamento di rimuovere i propri Dati Personali. Salvo quanto diversamente specificato, la precedente privacy policy continuerà ad applicarsi ai Dati Personali sino a quel momento raccolti.
              </p>
              <p className="font-semibold text-[#0a0a0a]">Informazioni su questa privacy policy</p>
              <p>
                Il Titolare del Trattamento dei Dati è responsabile per questa privacy policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
