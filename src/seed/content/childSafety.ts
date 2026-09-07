/* DRAFT DO AKCEPTACJI PRAWNIKA — strona /bezpieczenstwo-dzieci.
 *
 * Strona wymagana przez Google Play Child Safety Standards (CSAE). Adres tej strony i adres kontaktowy
 * podaje się w Play Console → App content → Child safety standards.
 *
 * Zasada z banto-app/CLAUDE.md: nie piszemy niczego, czego aplikacja nie robi. Opisy mechanizmów
 * pochodzą z kodu:
 *   banto-app/apps/mobile/src/ui/SafetyReportModal.tsx        (kategorie zgłoszeń, dowody, anonimowość)
 *   banto-app/apps/server/src/modules/reports/service.ts       (co widzi rodzic, tarcza ochronna, brak treści)
 *   banto-app/apps/server/src/modules/sos/service.ts           (S.O.S. = push do opiekunów, bez lokalizacji)
 *   banto-app/apps/mobile/src/data/terms.ts § 7 i § 8          (zakazy, konsekwencje, odwołania, Chatty/Vertex AI)
 *   banto-app/docs/PLAN-AWT.md                                 (automatyczna weryfikacja treści, flaga AWT_ENABLED)
 *
 * DO POTWIERDZENIA: czy AWT (automatyczne sprawdzanie tekstu przez model w Vertex AI) będzie włączone
 * w wersji sklepowej — na serwerze jest za flagą AWT_ENABLED i przy wyłączonej fladze endpoint zwraca 503.
 * Tekst poniżej jest sformułowany warunkowo („zanim wiadomość zostanie wysłana, jest sprawdzana”) i wymaga
 * potwierdzenia, że flaga jest włączona na środowisku produkcyjnym w dniu publikacji.
 * DO POTWIERDZENIA: zdjęcia i wiadomości głosowe NIE są dziś automatycznie moderowane (otwarty bloker
 * w banto-app/docs/archiwum/SKLEPY-APLIKACJE-DZIECI-PILOTAZ-2026-08-13.md). Strona mówi o tym wprost —
 * jeśli przed premierą dojdzie moderacja albo funkcje zostaną wyłączone dla dzieci, ten akapit trzeba zmienić.
 * DO POTWIERDZENIA: czy skrzynka safety@banto.pl istnieje i kto ją czyta (plan A1). Regulamin wskazuje
 * dziś kontakt@banto.pl, a aplikacja wysyła zgłoszenia na pomoc@banto.pl.
 * DO POTWIERDZENIA: procedura zgłaszania materiałów CSAM do Dyżurnet.pl / NASK i do Policji — deklaracja
 * poniżej jest zobowiązaniem organizacyjnym, nie funkcją w kodzie; wymaga wskazania osoby odpowiedzialnej
 * i zapisania procedury (T&S) przed publikacją w sklepach.
 * DO POTWIERDZENIA: czy klucz odbiorcy zespołu bezpieczeństwa (SAFETY_EVIDENCE_RECIPIENT) jest ustawiony
 * na środowisku produkcyjnym — bez niego zgłoszenie z dołączoną treścią nie przejdzie.
 */
import { h, p, root, ul } from '../lexical'

export const childSafetyContent = root([
  p(
    'Banto to komunikator dla dzieci w wieku 8–13 lat i ich rodziców. Poniżej opisujemy nasze standardy przeciwdziałania seksualnemu wykorzystywaniu i niegodziwemu traktowaniu dzieci (CSAE), zgodnie z polityką Google Play dotyczącą bezpieczeństwa dzieci.',
  ),

  h('h2', '1. Zero tolerancji dla CSAE'),
  p(
    'Nie ma w Banto miejsca na treści i zachowania związane z seksualnym wykorzystywaniem dzieci. Regulamin (§ 7 ust. 3) zakazuje w szczególności:',
  ),
  ul([
    'treści przedstawiających seksualne wykorzystywanie dzieci lub seksualizujących dzieci, treści intymnych osoby małoletniej oraz działań służących pozyskiwaniu takich treści,',
    'podszywania się pod inną osobę, groomingu i nakłaniania dziecka do tajnego kontaktu z osobą dorosłą, przekazania danych, zdjęć lub spotkania poza aplikacją,',
    'gróźb, szantażu, uporczywego nękania, nawoływania do przemocy lub nienawiści,',
    'zachęcania do samouszkodzenia lub samobójstwa,',
    'ujawniania adresu, dokładnej lokalizacji, haseł i kodów aktywacyjnych.',
  ]),
  p(
    'Materiały przedstawiające seksualne wykorzystywanie dziecka (CSAM) usuwamy, zabezpieczamy konto sprawcy i przekazujemy sprawę odpowiednim organom. Nie stosujemy tu ostrzeżeń ani stopniowania konsekwencji.',
  ),

  h('h2', '2. Jak zbudowana jest aplikacja, żeby ograniczyć ryzyko'),
  ul([
    '**Profil dziecka tworzy wyłącznie rodzic lub opiekun prawny** i on go aktywuje na telefonie dziecka kodem parowania. Dziecko nie zakłada konta samodzielnie.',
    '**Nie ma wyszukiwania obcych osób.** Nie da się przeglądać katalogu użytkowników ani napisać do kogoś, kogo się nie zna.',
    '**Kontakt powstaje tylko za obopólną zgodą i po zatwierdzeniu przez rodzica.** Nowa znajomość dziecka wymaga akceptacji drugiej strony i zgody opiekuna.',
    '**Brak feedu i treści publicznych.** Nie ma miejsca, w którym nieznajomy dorosły mógłby dotrzeć do dziecka przez publiczny post lub komentarz.',
    '**Rodzic nie czyta rozmów dziecka**, ale dostaje sygnał, gdy dzieje się coś, co wymaga dorosłego. Wiadomości są szyfrowane end-to-end.',
  ]),

  h('h2', '3. Automatyczne sprawdzanie treści'),
  p(
    'Zanim wiadomość tekstowa napisana z profilu dziecka zostanie wysłana, jest automatycznie sprawdzana pod kątem bezpieczeństwa — najpierw filtrem działającym na samym telefonie, a następnie przez model językowy uruchamiany w infrastrukturze Google Cloud (Vertex AI) w Unii Europejskiej. Zasady tego sprawdzenia opisuje § 8 Regulaminu.',
  ),
  ul([
    'Serwery Banto przekazują treść wyłącznie na czas jednego sprawdzenia i jej nie zapisują. Zapisujemy sam wynik: poziom ryzyka i kategorię, bez treści.',
    'Wiadomość może zostać zatrzymana, a dziecko dostaje propozycję innego sformułowania.',
    'Przy treściach wskazujących na poważne zagrożenie (przemoc, groźba, treści intymne, zagrożenie życia lub zdrowia) opiekun dziecka dostaje sygnał: kategorię jawnie oraz krótkie podsumowanie zaszyfrowane na urządzeniu dziecka do urządzenia opiekuna. Dziecko jest o tym informowane — nie ma cichych alertów.',
  ]),
  p(
    'Bądźmy precyzyjni: **automatyczne sprawdzanie obejmuje wiadomości tekstowe.** Zdjęcia w Przygodach i wiadomości głosowe nie są dziś sprawdzane automatycznie — można je zgłosić, a zgłoszenie trafia do zespołu bezpieczeństwa.',
  ),

  h('h2', '4. Jak zgłosić problem w aplikacji'),
  p(
    'Dziecko zgłasza rozmowę, wiadomość albo Ekipę przyciskiem **Zgłoś** dostępnym w czacie i w widoku Ekipy. W oknie zgłoszenia wybiera powód:',
  ),
  ul([
    'Ktoś mnie wyzywa, obraża albo szerzy hejt',
    'Ktoś mi grozi albo mnie szantażuje',
    'Ktoś pyta o intymne rzeczy albo prosi o zdjęcia',
    'Dostałem/am intymne zdjęcie lub treść',
    'Nieznajoma dorosła osoba do mnie pisze',
  ]),
  p(
    'Dalej na liście są jeszcze: uporczywe nękanie, podszywanie się, „ktoś może zrobić krzywdę sobie albo komuś” oraz „inne niebezpieczeństwo”. W Ekipie można też zgłosić samą nazwę lub obrazek grupy.',
  ),
  p('Co się dzieje po wysłaniu zgłoszenia:'),
  ul([
    'Zgłoszenie trafia do zespołu bezpieczeństwa Banto.',
    'Osoba zgłoszona nie dowiaduje się, kto ją zgłosił; w Ekipie zgłoszenie również pozostaje anonimowe wobec pozostałych.',
    'Rodzic zgłaszającego dziecka widzi, że dziecko coś zgłosiło, i wybraną kategorię — **bez treści rozmowy**.',
    'Dziecko może dobrowolnie dołączyć wskazaną wiadomość i ograniczony fragment kontekstu. Taki materiał jest szyfrowany na telefonie dziecka wyłącznie dla zespołu bezpieczeństwa. Zgłoszenie da się wysłać także bez niego, a cała rozmowa nigdy nie jest dołączana automatycznie.',
    'W tym samym oknie dziecko może od razu zablokować osobę, wyciszyć ją w Ekipie albo opuścić Ekipę.',
  ]),
  p(
    'Osobno działają: **Poproś rodzica o pomoc** (dziecko prosi własnego opiekuna, samo decydując, czy dołączyć wiadomość) oraz **S.O.S.**, które natychmiast wysyła powiadomienie do opiekunów dziecka. S.O.S. nie przekazuje lokalizacji i nie jest połączeniem ze służbami — w sytuacji bezpośredniego zagrożenia trzeba zadzwonić pod **112**. Dziecko w kryzysie widzi w aplikacji także numer telefonu zaufania **116 111**.',
  ),

  h('h2', '5. Jak zgłosić problem bez aplikacji'),
  p(
    'Zgłoszenie może wysłać każdy — również osoba, która nie korzysta z Banto: rodzic, szkoła, organizacja, świadek.',
  ),
  ul([
    '**safety@banto.pl** — sprawy dotyczące bezpieczeństwa dzieci, w tym CSAE, grooming, treści intymne z udziałem dziecka.',
    '**kontakt@banto.pl** — punkt kontaktowy w rozumieniu aktu o usługach cyfrowych (DSA) oraz zgłoszenia potencjalnie nielegalnych treści.',
  ]),
  p(
    'Zgłoszenie warto opisać tak, żeby dało się odnaleźć zdarzenie: czego dotyczy, kogo dotyczy, kiedy miało miejsce. Potwierdzamy otrzymanie zgłoszenia, jeśli mamy adres zwrotny, i informujemy o decyzji oraz o możliwości odwołania.',
  ),
  p(
    'Jeżeli dziecku grozi bezpośrednie niebezpieczeństwo, zadzwoń pod **112**. Materiały przedstawiające wykorzystywanie dzieci można zgłosić także bezpośrednio do zespołu **Dyżurnet.pl (NASK)** — dyzurnet.pl, dyzurnet@dyzurnet.pl.',
  ),

  h('h2', '6. Co robimy ze zgłoszeniem'),
  ul([
    'Zgłoszenia wymagające oceny człowieka rozpatrujemy asynchronicznie, według wagi i pilności. Nie prowadzimy całodobowej moderacji w czasie rzeczywistym i nie ukrywamy tego.',
    'Do czasu decyzji możemy zastosować możliwie wąskie i odwracalne zabezpieczenie: ukryć wskazaną treść, ograniczyć kontakt między konkretnymi osobami, czasowo wyłączyć funkcję albo zabezpieczyć materiał. Zabezpieczenie nie przesądza o naruszeniu.',
    'Oceniamy konkretne zdarzenie, a nie „charakter” dziecka. Możliwe działania: brak potwierdzenia naruszenia i cofnięcie zabezpieczeń, ostrzeżenie, czasowe ograniczenie funkcji, usunięcie lub zablokowanie treści, ograniczenie kontaktu, zawieszenie profilu dziecka lub konta, a w najpoważniejszych przypadkach zakończenie umowy.',
    'Decyzję przekazujemy osobie, której dotyczy, i — jeśli uzasadnia to ochrona dziecka — jej opiekunowi, wraz z podstawą, zakresem, czasem i informacją o użyciu automatyzacji.',
    'Od decyzji można odwołać się w ciągu 14 dni, pisząc na kontakt@banto.pl. Odwołanie rozpatruje człowiek, odpowiedź co do zasady w 14 dni.',
    'Liczba zgłoszeń może podnieść priorytet sprawy albo uruchomić tymczasową tarczę ochronną w Ekipie, ale sama w sobie nie jest dowodem naruszenia.',
  ]),

  h('h2', '7. Współpraca z organami ścigania'),
  p(
    'W sprawach dotyczących seksualnego wykorzystywania dzieci współpracujemy z Policją i prokuraturą oraz z zespołem Dyżurnet.pl (NASK) — polskim punktem kontaktowym sieci INHOPE. Zabezpieczamy materiał niezbędny do wyjaśnienia sprawy i przekazujemy go uprawnionym organom na ich żądanie lub z własnej inicjatywy, gdy zachodzi podejrzenie przestępstwa. Dane przekazujemy w zakresie wymaganym prawem; wiadomości tekstowe są szyfrowane end-to-end i nie są przechowywane na naszych serwerach, więc nie możemy ich odtworzyć — możemy przekazać materiał, który zgłaszający świadomie dołączył do zgłoszenia, oraz metadane konta.',
  ),

  h('h2', '8. Osoba kontaktowa'),
  p(
    'Punkt kontaktowy do spraw bezpieczeństwa dzieci i zgłoszeń CSAE: **safety@banto.pl**. Dane podmiotu odpowiedzialnego za aplikację znajdują się w Regulaminie (§ 1).',
  ),
  p(
    'Ten dokument opisuje standardy obowiązujące na dzień publikacji i będzie aktualizowany razem z aplikacją.',
  ),
])
