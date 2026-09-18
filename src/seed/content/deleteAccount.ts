/* DRAFT DO AKCEPTACJI PRAWNIKA — strona /usun-konto.
 *
 * Strona wymagana przez Google Play („Account deletion URL"). Musi jasno mówić: jak zażądać
 * usunięcia konta, co zostaje usunięte i co jest zachowywane.
 *
 * Opis jest zbudowany na kodzie, nie na obietnicach:
 *   banto-app/apps/server/src/modules/account/service.ts   (deleteParentAccount, deleteChildRows)
 *   banto-app/apps/mobile/src/screens/parent/ParentSettingsScreen.tsx (ścieżka w aplikacji)
 *   banto-app/apps/mobile/src/data/terms.ts § 4 ust. 10, § 7 ust. 8
 *   banto-app/docs/DECYZJE-USUNIETE-FUNKCJE.md, wpis 25 (audyt admina zostaje po usunięciu konta)
 *
 * DO POTWIERDZENIA: czy skrzynka support@banto.pl już działa (plan A1 w banto-app/docs/PLAN-PUBLIKACJA-SKLEPY.md);
 * aplikacja wysyła dziś zgłoszenia na pomoc@banto.pl, a regulamin wskazuje kontakt@banto.pl.
 * DO POTWIERDZENIA: termin realizacji żądania e-mailowego (poniżej: 30 dni za art. 12 ust. 3 RODO) i to,
 * czy taki termin akceptuje prawnik.
 * DO POTWIERDZENIA: retencja kopii zapasowych bazy (jak długo usunięte wiersze żyją w backupach) —
 * w repozytorium nie ma opisanej polityki backupów, więc strona nie podaje żadnej liczby.
 */
import { h, p, root, ul } from '../lexical'

export const deleteAccountContent = root([
  p(
    'Konto rodzica w Banto możesz usunąć samodzielnie w aplikacji. Jeśli nie masz już dostępu do aplikacji, napisz do nas — obsłużymy żądanie ręcznie.',
  ),

  h('h2', '1. Usunięcie konta w aplikacji (najszybsza droga)'),
  ul([
    'Zaloguj się w aplikacji Banto jako rodzic.',
    'Wejdź w zakładkę **Ustawienia** (profil rodzica).',
    'Zjedź na dół, do sekcji **Pomoc**.',
    'Wybierz **Usuń konto**.',
    'Przeczytaj listę konsekwencji w oknie potwierdzenia i potwierdź przyciskiem **Usuń konto**.',
  ]),
  p(
    'Operacja jest natychmiastowa i nieodwracalna — nie ma okresu karencji ani „kosza”, z którego dałoby się konto odzyskać.',
  ),

  h('h2', '2. Usunięcie samego profilu dziecka'),
  p(
    'Jeśli chcesz usunąć profil jednego dziecka, a zachować własne konto: w Ustawieniach rodzica otwórz profil dziecka i wybierz **Usuń profil**. Profil dziecka, jego znajomości i powiązane dane znikają na zawsze; Twoje konto rodzica zostaje.',
  ),

  h('h2', '3. Co zostaje usunięte'),
  p('Razem z kontem rodzica usuwamy w jednej transakcji:'),
  ul([
    'konto logowania (adres e-mail i hasło, sesje, powiązane logowanie Google lub Apple) — po usunięciu ten sam adres można zarejestrować od nowa,',
    'klucze urządzeń rodzica i tokeny sesji, tokeny powiadomień push,',
    'kontakty rodzicielskie, zaproszenia dla drugiego opiekuna, zgłoszenia bezpieczeństwa widoczne w Twojej skrzynce,',
    'przypięte wiadomości i inne wpisy, które wskazywały na Ciebie jako autora działania.',
  ]),
  p(
    'Jeżeli jesteś **jedynym opiekunem w rodzinie**, razem z Twoim kontem usuwamy także całą rodzinę, a więc każdy profil dziecka wraz z:',
  ),
  ul([
    'znajomościami, zaproszeniami i kodami parowania,',
    'członkostwem w Ekipach i grupach klasowych,',
    'Przygodami: zdjęciami (również plikami w magazynie plików), komentarzami, reakcjami, głosami i ukończeniami,',
    'alertami S.O.S. i zgłoszeniami złożonymi przez dziecko,',
    'kluczami urządzeń dziecka, przez co telefon dziecka natychmiast traci dostęp do Banto.',
  ]),
  p(
    'Treść rozmów nie wymaga osobnego usuwania: wiadomości tekstowych nie zapisujemy w bazie. Zaszyfrowana wiadomość czeka w kolejce dostarczeniowej najwyżej 7 dni i znika po dostarczeniu albo po tym terminie (§ 7 ust. 8 Regulaminu).',
  ),

  h('h2', '4. Co zostaje i dlaczego'),
  ul([
    '**Rodzina z drugim opiekunem.** Jeśli poza Tobą jest jeszcze jeden rodzic lub opiekun, usuwamy tylko Twoje konto. Profile dzieci, ich znajomości i Ekipy zostają pod opieką drugiej osoby.',
    '**Ekipy i klasy, w których są inne dzieci.** Grupa nie znika dlatego, że odchodzi jej twórca — traci tylko twórcę, a rola „przewodniczącego” klasy przechodzi na innego rodzica. Grupę usuwamy dopiero wtedy, gdy nie zostaje w niej nikt (albo gdy w grupie rodziców zostałoby mniej niż trzy osoby dorosłe).',
    '**Ślady moderacyjne bez treści.** Zdarzenia moderacyjne (poziom ryzyka, kategoria, brak jakiejkolwiek treści wiadomości) zostają, ale przestają wskazywać na usunięte dziecko — pole z identyfikatorem autora jest czyszczone.',
    '**Decyzje o zaproszeniach do Ekip.** Sama decyzja („zaakceptowano”, „odrzucono”) zostaje, bo dotyczy również innych rodzin. Informacja o tym, który rodzic ją podjął, jest usuwana.',
    '**Rejestr dostępu administratora.** Każde sięgnięcie administratora Banto po dane jest zapisywane w trwałym rejestrze (bez treści rozmów, haseł i materiału dowodowego). Ten rejestr zostaje również po usunięciu konta — służy do kontroli nadużyć po naszej stronie. Termin jego przechowywania nie został jeszcze ustalony.',
    '**Dane, które musimy zachować na podstawie prawa** — np. dokumentacja zgłoszenia dotyczącego bezpieczeństwa dziecka przekazanego organom ścigania. Zakres i okres opisuje Polityka prywatności.',
  ]),

  h('h2', '5. Usunięcie konta bez dostępu do aplikacji'),
  p(
    'Napisz na **support@banto.pl** z adresu e-mail, na który jest założone konto rodzica, i podaj w treści: „Żądam usunięcia konta Banto”.',
  ),
  p(
    'Ten proces jest **obsługiwany ręcznie przez człowieka** — nie ma automatycznego formularza. Zanim usuniemy konto, musimy potwierdzić, że żądanie pochodzi od jego właściciela, bo usunięcie jest nieodwracalne i dotyczy także profili dzieci.',
  ),
  p('Jak weryfikujemy tożsamość:'),
  ul([
    'wiadomość musi przyjść z adresu e-mail przypisanego do konta rodzica — sam ten warunek zwykle wystarczy,',
    'jeśli adres jest niedostępny (np. utracony), poprosimy o informacje, które zna wyłącznie właściciel konta: imiona profili dzieci w aplikacji, przybliżoną datę założenia konta, sposób logowania (hasło, Google, Apple),',
    'nie prosimy o skan dowodu osobistego ani o hasło do konta — nigdy.',
  ]),
  p(
    'Po potwierdzeniu tożsamości usuwamy konto tak samo jak przycisk w aplikacji, a usunięcie potwierdzamy e-mailem. Odpowiadamy najpóźniej w terminie 30 dni od otrzymania żądania (art. 12 ust. 3 RODO).',
  ),

  h('h2', '6. Wypisanie się z listy oczekujących'),
  p(
    'Jeśli nie masz konta w aplikacji, a jedynie zapisałeś się na listę oczekujących na tej stronie, wystarczy kliknąć „Wypisz się” w stopce dowolnej wiadomości od nas albo napisać na kontakt@banto.pl. Szczegóły opisuje Polityka prywatności.',
  ),
])
