import { h, p, root, ul } from '../lexical'

/** Treść przeniesiona 1:1 z banto-landing/polityka-prywatnosci.html. */
export const privacyPolicyContent = root([
  p('Obowiązuje od: 20 czerwca 2026 r.'),
  p(
    'Niniejsza Polityka Prywatności opisuje zasady przetwarzania danych osobowych osób, które zapisują się na listę oczekujących na premierę aplikacji banto za pośrednictwem formularza dostępnego na stronie internetowej.',
  ),

  h('h2', '1. Administrator danych osobowych'),
  p('Administratorem Twoich danych osobowych jest:'),
  ul([
    '**Administrator:** Agnieszka Zielonka, prowadząca działalność gospodarczą pod firmą Agnieszka Zielonka LetsDoIT',
    '**NIP:** 7521444045',
    '**REGON:** 523567549',
    '**Adres do doręczeń:** ul. Dokerska 32/14, 54-142 Wrocław, woj. dolnośląskie',
    '**Kontakt e-mail:** kontakt@banto.pl',
  ]),

  h('h2', '2. Jakie dane przetwarzamy'),
  p('W związku z zapisem na listę oczekujących przetwarzamy:'),
  ul([
    'Twój adres e-mail, który podajesz w formularzu,',
    'datę i godzinę wyrażenia zgody oraz techniczne informacje potwierdzające jej udzielenie (np. adres IP) — w celu wykazania, że zgoda została udzielona.',
  ]),
  p(
    'Nie zbieramy danych szczególnych kategorii ani danych dzieci w ramach tego formularza — zapisu dokonują osoby dorosłe (rodzice/opiekunowie).',
  ),

  h('h2', '3. Cele i podstawy prawne przetwarzania'),
  ul([
    'Prowadzenie listy oczekujących oraz informowanie o premierze i rozwoju aplikacji banto — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO).',
    'Marketing własnych produktów i usług drogą elektroniczną — na podstawie Twojej zgody (art. 6 ust. 1 lit. a RODO) w związku z art. 10 ustawy o świadczeniu usług drogą elektroniczną.',
    'Ustalenie, dochodzenie lub obrona roszczeń oraz wykazanie zgodności z przepisami (rozliczalność) — na podstawie prawnie uzasadnionego interesu administratora (art. 6 ust. 1 lit. f RODO).',
  ]),

  h('h2', '4. Dobrowolność podania danych'),
  p(
    'Podanie danych i wyrażenie zgody są dobrowolne, ale niezbędne, aby zapisać się na listę oczekujących i otrzymywać wiadomości o aplikacji. Brak zgody oznacza, że nie będziemy mogli dodać Cię do listy.',
  ),

  h('h2', '5. Prawo do wycofania zgody'),
  p('Możesz wycofać zgodę w dowolnym momencie, bez podawania przyczyny. Wystarczy, że:'),
  ul([
    'klikniesz link „Wypisz się" w stopce dowolnej otrzymanej od nas wiadomości, lub',
    'napiszesz na nasz adres e-mail wskazany w punkcie 1.',
  ]),
  p(
    'Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano na podstawie zgody przed jej wycofaniem.',
  ),

  h('h2', '6. Okres przechowywania danych'),
  p(
    'Dane przetwarzamy do czasu wycofania zgody lub zgłoszenia sprzeciwu. Po wycofaniu zgody dane usuwamy niezwłocznie, nie później niż w ciągu 30 dni — z zastrzeżeniem danych potrzebnych do wykazania faktu udzielenia i wycofania zgody, które możemy przechowywać przez okres przedawnienia ewentualnych roszczeń.',
  ),

  h('h2', '7. Powierzenie danych i odbiorcy danych'),
  p(
    'Twoje dane powierzamy do przetwarzania podmiotom, które świadczą na naszą rzecz usługi i przetwarzają dane wyłącznie na nasze udokumentowane polecenie, na podstawie zawartych umów powierzenia przetwarzania danych (art. 28 RODO).',
  ),
  p('Odbiorcą Twoich danych jest w szczególności:'),
  ul([
    '**MailerLite** — dostawca platformy do e-mail marketingu i obsługi listy oczekujących. Usługę świadczy MailerLite Limited (Irlandia).',
    'dostawcy usług hostingu oraz usług IT utrzymujących stronę internetową.',
  ]),

  h('h2', '8. Przekazywanie danych poza EOG'),
  p(
    'Co do zasady dane przetwarzane są na terenie Europejskiego Obszaru Gospodarczego (EOG). Niektórzy dostawcy (w tym MailerLite) mogą korzystać z podmiotów podprzetwarzających zlokalizowanych poza EOG, np. w Stanach Zjednoczonych. W takich przypadkach przekazanie danych odbywa się z zachowaniem odpowiednich zabezpieczeń wymaganych przez RODO, w szczególności na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję Europejską. Możesz uzyskać kopię tych zabezpieczeń, kontaktując się z nami pod adresem kontakt@banto.pl.',
  ),

  h('h2', '9. Twoje prawa'),
  p('W związku z przetwarzaniem danych przysługują Ci następujące prawa:'),
  ul([
    'prawo dostępu do danych oraz otrzymania ich kopii,',
    'prawo do sprostowania (poprawienia) danych,',
    'prawo do usunięcia danych,',
    'prawo do ograniczenia przetwarzania,',
    'prawo do przenoszenia danych,',
    'prawo do wniesienia sprzeciwu wobec przetwarzania opartego na uzasadnionym interesie,',
    'prawo do wycofania zgody w dowolnym momencie (zob. punkt 5),',
    'prawo wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).',
  ]),

  h('h2', '10. Profilowanie i decyzje automatyczne'),
  p(
    'Twoje dane nie podlegają zautomatyzowanemu podejmowaniu decyzji, w tym profilowaniu, które wywoływałoby wobec Ciebie skutki prawne lub w podobny sposób istotnie na Ciebie wpływało.',
  ),

  h('h2', '11. Pliki cookies'),
  p(
    'Strona ma charakter informacyjny (zapowiedź aplikacji). Jeżeli wykorzystujemy pliki cookies lub podobne technologie (np. do celów statystycznych), korzystamy z nich w zakresie niezbędnym do prawidłowego działania strony, a w przypadku cookies opcjonalnych — za Twoją zgodą.',
  ),

  h('h2', '12. Zmiany Polityki Prywatności'),
  p(
    'Możemy aktualizować niniejszą Politykę Prywatności. Aktualna wersja jest zawsze dostępna na tej stronie, a datę jej obowiązywania wskazano na początku dokumentu.',
  ),

  h('h2', '13. Kontakt'),
  p(
    'W sprawach dotyczących danych osobowych skontaktuj się z administratorem pod adresem kontakt@banto.pl lub korespondencyjnie: ul. Dokerska 32/14, 54-142 Wrocław.',
  ),
])
