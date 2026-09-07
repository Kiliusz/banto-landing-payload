/* DRAFT DO AKCEPTACJI PRAWNIKA — strona /wsparcie.
 *
 * Strona jest jednocześnie „Support URL" wymaganym przez App Store Connect i adresem pomocy dla Google Play.
 *
 * FAQ opisuje wyłącznie funkcje, które są w kodzie:
 *   parowanie i profil dziecka  — banto-app/apps/server/src/modules/account, ekrany rodzica
 *   zatwierdzanie kontaktów     — banto-app/apps/server/src/modules/friendship
 *   S.O.S.                      — banto-app/apps/server/src/modules/sos/service.ts (push do opiekunów, bez lokalizacji)
 *   limit czasu                 — banto-app/apps/mobile/src/ui/ScreenTimeGate.tsx („Na dziś koniec", S.O.S. działa dalej)
 *   usuwanie konta              — banto-app/apps/server/src/modules/account/service.ts
 *
 * DO POTWIERDZENIA: adresy skrzynek. Aplikacja wysyła zgłoszenia na pomoc@banto.pl (SupportModal),
 * regulamin wskazuje kontakt@banto.pl, a plan sklepowy zakłada support@banto.pl i safety@banto.pl.
 * Przed publikacją trzeba zdecydować, który adres jest głównym adresem wsparcia, i ujednolicić go
 * w aplikacji, regulaminie i na tej stronie.
 * DO POTWIERDZENIA: czas odpowiedzi na wiadomości (poniżej: „zwykle w ciągu 2 dni roboczych") —
 * nie ma zespołu wsparcia z ustalonym SLA; jeśli nie chcemy się do tego zobowiązywać, akapit trzeba zmienić.
 */
import { h, p, root, ul } from '../lexical'

export const supportContent = root([
  p(
    'Masz pytanie, coś nie działa albo chcesz zgłosić problem z bezpieczeństwem? Napisz do nas — odpowiada człowiek.',
  ),

  h('h2', 'Kontakt'),
  ul([
    '**support@banto.pl** — pomoc techniczna, konto, pytania o działanie aplikacji.',
    '**safety@banto.pl** — bezpieczeństwo dzieci, zgłoszenia dotyczące CSAE, grooming, treści intymne.',
    '**kontakt@banto.pl** — sprawy formalne, dane osobowe, punkt kontaktowy DSA, zgłoszenia nielegalnych treści.',
  ]),
  p(
    'Odpisujemy zwykle w ciągu 2 dni roboczych. Sprawy dotyczące bezpieczeństwa dziecka traktujemy priorytetowo. Jeżeli komuś grozi bezpośrednie niebezpieczeństwo, zadzwoń pod 112.',
  ),
  p(
    'Pomoc możesz wywołać też z samej aplikacji: **Ustawienia rodzica → Pomoc → Pomoc i zgłoszenia**. Formularz przygotowuje wiadomość e-mail z opisem problemu i pokazuje ją, zanim ją wyślesz.',
  ),

  h('h2', 'Dokumenty'),
  ul([
    '[Polityka prywatności](/polityka-prywatnosci)',
    '[Regulamin](/regulamin)',
    '[Usunięcie konta](/usun-konto)',
    '[Standardy bezpieczeństwa dzieci](/bezpieczenstwo-dzieci)',
  ]),

  h('h2', 'Najczęstsze pytania'),

  h('h3', 'Jak podłączyć telefon dziecka?'),
  p(
    'Konto zakłada rodzic. W aplikacji dodajesz profil dziecka, a potem generujesz jednorazowy kod parowania (albo kod QR). Na telefonie dziecka instalujesz Banto, wybierasz „mam kod” i wpisujesz go. Kod jest ważny krótko i zużywa się po jednym użyciu — jeśli wygaśnie, wygeneruj nowy. Dziecko nie zakłada konta samodzielnie i nie podaje adresu e-mail.',
  ),

  h('h3', 'Kto może napisać do mojego dziecka?'),
  p(
    'Tylko osoby, które dziecko zna i które zostały zatwierdzone. Nowa znajomość wymaga zgody obu dzieci i akceptacji rodzica — dopóki jej nie ma, rozmowa nie ruszy. W Banto nie ma wyszukiwarki użytkowników ani publicznego profilu, więc nieznajomy nie ma jak zacząć kontaktu. Kontakt możesz w każdej chwili cofnąć w ustawieniach dziecka.',
  ),

  h('h3', 'Co robi przycisk S.O.S.?'),
  p(
    'S.O.S. natychmiast wysyła powiadomienie do wszystkich opiekunów w rodzinie: „dziecko prosi o pomoc”. Alert widać w aplikacji rodzica, dopóki ktoś go nie potwierdzi. S.O.S. **nie przekazuje lokalizacji**, nie wysyła treści rozmowy i **nie jest połączeniem ze służbami ratunkowymi** — przy bezpośrednim zagrożeniu trzeba zadzwonić pod 112. S.O.S. działa również wtedy, gdy dziecko wyczerpało dzienny limit czasu.',
  ),

  h('h3', 'Jak działa limit czasu?'),
  p(
    'W ustawieniach profilu dziecka ustawiasz dzienny limit w minutach. Aplikacja odlicza czas korzystania i po jego wyczerpaniu pokazuje ekran „Na dziś koniec” — rozmowy są niedostępne do następnego dnia albo do momentu, w którym zdejmiesz lub podniesiesz limit. Widzisz też prosty raport z ostatnich siedmiu dni. Wyjątkiem jest S.O.S., które pozostaje dostępne zawsze.',
  ),

  h('h3', 'Jak usunąć konto?'),
  p(
    'W aplikacji: **Ustawienia rodzica → Pomoc → Usuń konto**. Operacja jest nieodwracalna. Jeśli jesteś jedynym opiekunem, razem z kontem znikają profile dzieci, ich znajomości i Ekipy. Bez dostępu do aplikacji napisz na support@banto.pl — proces jest wtedy obsługiwany ręcznie. Szczegóły, w tym lista danych usuwanych i zachowywanych, są na stronie [Usunięcie konta](/usun-konto).',
  ),
])
