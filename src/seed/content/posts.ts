import { block, h, p, root, ul } from '../lexical'

/**
 * Startowe wpisy — realna treść, żeby blog nie wyglądał na pusty i żeby dało się
 * zobaczyć wszystkie warianty renderowania (nagłówki, listy, cytat, wyróżnienia,
 * obrazek w treści).
 *
 * `HERO_MEDIA` to znacznik podmieniany w seedzie na ID wgranego pliku —
 * w pliku z treścią nie znamy jeszcze identyfikatorów z bazy.
 */
export const HERO_MEDIA = '__HERO_MEDIA__'

export const seedPosts = [
  {
    title: 'Pierwszy komunikator dziecka: o czym warto pogadać, zanim klikniesz „instaluj"',
    slug: 'pierwszy-komunikator-dziecka',
    categorySlug: 'bezpieczenstwo',
    excerpt:
      'Rozmowa przed instalacją jest ważniejsza niż każde ustawienie kontroli rodzicielskiej. Oto pięć tematów, które warto zamknąć razem z dzieckiem.',
    content: root([
      p(
        'Większość rodziców podchodzi do pierwszego komunikatora jak do decyzji technicznej: która aplikacja, jakie ustawienia, ile czasu dziennie. Tymczasem to, co naprawdę decyduje o bezpieczeństwie dziecka, dzieje się wcześniej — w rozmowie.',
      ),

      h('h2', '1. Po co Ci ta aplikacja?'),
      p(
        'Zacznij od pytania otwartego, nie od zakazu. Dzieci w wieku 8–12 lat rzadko chcą „być w internecie" — chcą być z konkretnymi ludźmi. Kiedy usłyszysz „bo Kaja i Antek tam są", masz już punkt wyjścia: to sprawa relacji, nie technologii.',
      ),

      h('h2', '2. Kto może się z Tobą kontaktować?'),
      p(
        'Ustalcie zasadę, zanim pojawi się pierwsze zaproszenie od nieznajomego. W banto kontakt wymaga potwierdzenia po obu stronach, ale sama zasada „znam tę osobę z życia" jest ważniejsza niż mechanizm.',
      ),
      ul([
        'osoby z klasy i podwórka — tak,',
        'znajomi znajomych — tylko po rozmowie z rodzicem,',
        'nieznajomi — nigdy, bez wyjątków.',
      ]),

      block({
        blockType: 'callout',
        tone: 'tip',
        title: 'Wskazówka',
        body: 'Zamiast listy zakazów spisz z dzieckiem trzy zdania na kartce i przyklej ją przy biurku. Dziecko, które współtworzyło zasady, dużo częściej ich przestrzega.',
      }),

      h('h2', '3. Co robisz, gdy ktoś napisze coś przykrego?'),
      p(
        'To pytanie zadaj koniecznie zawczasu. Dziecko musi wiedzieć, że przyjście do Ciebie z problemem nie skończy się zabraniem telefonu. Jeśli jedyną konsekwencją zgłoszenia jest kara, dzieci przestają zgłaszać.',
      ),

      h('h2', '4. Co zostaje prywatne?'),
      p(
        'Adres, nazwa szkoły, zdjęcia w mundurku, numer telefonu — to informacje, których nie wysyła się nikomu, nawet znajomym. Warto to przećwiczyć na konkretnych przykładach, a nie tylko powiedzieć „nie podawaj danych".',
      ),

      h('h2', '5. Kiedy telefon idzie spać?'),
      p(
        'Ustalcie jedną porę dla całego domu — także dla dorosłych. Reguła, która dotyczy wszystkich, jest przyjmowana bez awantury dużo częściej niż reguła wymierzona w dziecko.',
      ),

      block({
        blockType: 'quote',
        quote: 'Dziecko nie potrzebuje idealnego filtra. Potrzebuje dorosłego, do którego może przyjść, kiedy filtr zawiedzie.',
        author: 'Zespół banto',
      }),
    ]),
  },
  {
    title: 'Kiedy „ekipa" to za mało: jak rozpoznać wykluczenie w grupie klasowej',
    slug: 'jak-rozpoznac-wykluczenie-w-grupie',
    categorySlug: 'relacje',
    excerpt:
      'Wykluczenie rzadko wygląda jak przemoc. Częściej to cisza, brak zaproszenia i żarty, których dziecko nie rozumie. Na co zwrócić uwagę?',
    content: root([
      p(
        'Rodzice zwykle wiedzą, co zrobić z wyzwiskiem. Trudniej jest z sytuacją, w której nikt nikogo nie obraża — po prostu jedno dziecko zostaje poza nawiasem.',
      ),

      h('h2', 'Sygnały, które łatwo przeoczyć'),
      ul([
        'dziecko przestaje opowiadać o konkretnych osobach z klasy,',
        'nagle „nie ma ochoty" na urodziny, na które wcześniej czekało,',
        'w rozmowach pojawia się „oni" zamiast imion,',
        'telefon jest sprawdzany kompulsywnie, ale bez radości.',
      ]),

      h('h2', 'Dlaczego dzieci o tym nie mówią'),
      p(
        'Bo wykluczenie trudno opowiedzieć. Nie ma jednego zdarzenia, które można zrelacjonować — jest seria drobiazgów, z których każdy z osobna brzmi błaho. Dziecko boi się, że usłyszy „przesadzasz".',
      ),

      block({
        blockType: 'callout',
        tone: 'info',
        title: 'Zamiast „co się stało?"',
        body: 'Spróbuj: „Z kim dzisiaj było Ci najlepiej?". Pytanie o dobre chwile otwiera rozmowę szerzej niż pytanie o problem.',
      }),

      h('h2', 'Co realnie pomaga'),
      p(
        'Jedna bliska relacja rówieśnicza chroni bardziej niż popularność w dużej grupie. Warto wspierać to, co dziecko już ma: wspólne zainteresowanie, sąsiada, kuzyna, kolegę z treningu.',
      ),
      p(
        'W banto projektujemy małe grupy właśnie dlatego — łatwiej zbudować bezpieczne miejsce dla pięciorga dzieci niż moderować tłum.',
      ),
    ]),
  },
  {
    title: 'Emocje w czacie: dlaczego dzieci kłócą się inaczej online',
    slug: 'emocje-w-czacie',
    categorySlug: 'emocje',
    excerpt:
      'Brak tonu głosu, opóźnienie w odpowiedzi i publiczność — trzy powody, dla których zwykła sprzeczka w czacie eskaluje szybciej niż na podwórku.',
    content: root([
      p(
        'Ta sama różnica zdań, która na przerwie kończy się wzruszeniem ramion, w czacie potrafi trwać trzy dni. To nie kwestia charakteru dzieci, tylko medium.',
      ),

      h('h2', 'Trzy mechanizmy'),
      ul([
        '**Brak tonu głosu.** „No jasne" bywa żartem albo złośliwością — bez intonacji dziecko wybiera gorszą interpretację.',
        '**Opóźnienie.** Cisza przed odpowiedzią jest odbierana jako odrzucenie, choć zwykle oznacza tylko kolację.',
        '**Publiczność.** W grupie każdy komunikat ma świadków, a wycofanie się wygląda jak przegrana.',
      ]),

      h('h2', 'Co można z tym zrobić'),
      p(
        'Najprostsze narzędzie to nazwanie mechanizmu. Dziecko, które wie, że „w czacie wszystko brzmi ostrzej", ma szansę zatrzymać się przed odpowiedzią.',
      ),
      p(
        'Druga rzecz: umowa, że trudne rozmowy przenosi się na żywo albo na rozmowę głosową. Nie dlatego, że czat jest zły — dlatego, że do niektórych rzeczy się nie nadaje.',
      ),

      block({
        blockType: 'quote',
        quote: 'W czacie nie widać, że druga osoba żartuje. Widać tylko, że jeszcze nie odpisała.',
        author: 'Z rozmów z dziećmi 10–12 lat',
      }),
    ]),
  },
  {
    title: 'Pierwsze dziesięć minut po przykrej wiadomości',
    slug: 'pierwsze-dziesiec-minut-po-przykrej-wiadomosci',
    categorySlug: 'emocje',
    excerpt:
      'Dziecko pokazuje Ci telefon i widzisz coś, co ścina Cię z nóg. To, co zrobisz w pierwszych minutach, decyduje, czy przyjdzie do Ciebie następnym razem.',
    content: root([
      p(
        'Prędzej czy później to się wydarzy: dziecko dostanie wiadomość, która je zaboli. Wyzwisko, wykluczające „nie gadamy z tobą", przerobione zdjęcie. Nie da się tego całkowicie zapobiec — da się natomiast dobrze zareagować.',
      ),
      p(
        'Pierwsze minuty są nieproporcjonalnie ważne, bo dziecko właśnie testuje hipotezę: „czy dorosły jest tu po to, żeby mi pomóc, czy żeby zarządzać problemem". Odpowiedź na to pytanie zapamięta na lata.',
      ),

      h('h2', 'Czego nie robić od razu'),
      ul([
        '**Nie zabieraj telefonu.** Dla dziecka to nie jest ochrona, tylko kara za to, że powiedziało prawdę.',
        '**Nie pisz do drugiego dziecka.** Nawet spokojna wiadomość od dorosłego wraca do klasy jako „poskarżył się rodzicom".',
        '**Nie umniejszaj.** „Nie przejmuj się, to głupota" brzmi jak: twoje uczucia są przesadzone.',
        '**Nie przesłuchuj.** Seria pytań „a co ty na to napisałeś?" przenosi ciężar dowodu na ofiarę.',
      ]),

      block({
        blockType: 'callout',
        tone: 'warning',
        title: 'Uwaga na odruch naprawiania',
        body: 'Chęć natychmiastowego rozwiązania sprawy jest Twoja, nie dziecka. Zanim cokolwiek zrobisz, zapytaj wprost: „Chcesz, żebym coś z tym zrobił, czy na razie chcesz o tym pogadać?".',
      }),

      h('h2', 'Co robić zamiast tego'),

      h('h3', '1. Nazwij, co widzisz'),
      p(
        '„To jest paskudne. Rozumiem, że jest ci przykro." Dwa zdania. Dziecko dostaje potwierdzenie, że jego reakcja jest w porządku, i przestaje zużywać energię na uzasadnianie, że sprawa jest poważna.',
      ),

      h('h3', '2. Podziękuj za pokazanie'),
      p(
        'Serio, na głos: „Dobrze, że mi pokazałeś." Budujesz w ten sposób jedyny mechanizm, który naprawdę działa długofalowo — to, że następnym razem też przyjdzie.',
      ),

      h('h3', '3. Zróbcie zrzut ekranu i nic więcej'),
      p(
        'Zapis wystarczy na później, gdyby sprawa się powtórzyła albo trzeba było rozmawiać ze szkołą. Nie odpisujcie na gorąco — odpowiedź napisana w pierwszych minutach prawie zawsze eskaluje.',
      ),

      h('h3', '4. Wróćcie do tego następnego dnia'),
      p(
        'Emocje opadną i dopiero wtedy da się zdecydować sensownie: zignorować, zablokować, pogadać z wychowawcą. Decyzja podjęta na spokojnie jest zwykle inna niż ta z wieczora.',
      ),

      block({
        blockType: 'quote',
        quote: 'Dziecko nie przychodzi po rozwiązanie. Przychodzi sprawdzić, czy zostanie potraktowane poważnie.',
        author: 'Zespół banto',
      }),

      h('h2', 'Kiedy to już nie jest jednorazowa przykrość'),
      p(
        'Przekroczenie granicy między konfliktem a nękaniem poznasz po trzech rzeczach: powtarzalności, przewadze jednej strony i tym, że dziecko zaczyna zmieniać swoje zachowanie, żeby uniknąć kontaktu. Wtedy to już sprawa dla szkoły, a nie do przeczekania.',
      ),
      p(
        'W banto zgłoszenie przykrej wiadomości jest jednym gestem, a dziecko dostaje potwierdzenie, że ktoś dorosły to widzi. Ale żaden przycisk nie zastąpi tego, co dzieje się w kuchni dziesięć minut po tym, jak dziecko pokaże Ci telefon.',
      ),
    ]),
  },
  {
    title: 'Zasady ekranowe, które dziecko przyjmie (bo sam je współtworzył)',
    slug: 'zasady-ekranowe-ktore-dziecko-przyjmie',
    categorySlug: 'bezpieczenstwo',
    excerpt:
      'Limit narzucony odgórnie działa do pierwszej kłótni. Umowa spisana razem wytrzymuje miesiące. Różnica leży w tym, kto ustalał reguły.',
    content: root([
      p(
        'Większość domowych zasad ekranowych upada nie dlatego, że były złe, tylko dlatego, że powstały jednostronnie. Dziecko traktuje je wtedy jak przeszkodę do obejścia, a nie jak umowę, której jest stroną.',
      ),

      block({
        blockType: 'mediaBlock',
        media: HERO_MEDIA,
        caption: 'Zasady, które dzieciaki ustalają razem, wytrzymują dłużej niż te wywieszone na lodówce.',
        size: 'wide',
      }),

      h('h2', 'Zacznij od tego, co dziecko chce chronić'),
      p(
        'Zamiast „ile czasu ci wolno" zapytaj: „co jest dla ciebie najważniejsze w telefonie". Usłyszysz zwykle dwie, trzy konkretne rzeczy — grupę znajomych, jedną grę, wieczorne rozmowy. Reszta to wypełniacz, z którego dziecko oddaje bez większego oporu.',
      ),
      p(
        'Ta rozmowa daje Ci walutę do negocjacji. Wiesz, co jest nienaruszalne, a co można przesunąć bez awantury.',
      ),

      h('h2', 'Cztery reguły, które sprawdzają się najczęściej'),
      ul([
        '**Wspólna pora ciszy.** Telefony wszystkich domowników — także Twój — lądują poza sypialniami o tej samej godzinie.',
        '**Posiłki bez ekranów.** Krótkie, sprawdzalne, dotyczy wszystkich. Świetny pierwszy krok, bo nie da się go podważyć jako niesprawiedliwego.',
        '**Nowa aplikacja = wspólne pierwsze uruchomienie.** Nie kontrola, tylko piętnaście minut razem: kto może pisać, gdzie jest blokowanie, co widzą inni.',
        '**Prawo do zgłoszenia bez konsekwencji.** Przyjście z problemem nigdy nie kończy się zabraniem sprzętu. Bez tego punktu reszta zasad przestaje działać, bo dziecko zaczyna ukrywać.',
      ]),

      block({
        blockType: 'callout',
        tone: 'tip',
        title: 'Spisz to na kartce',
        body: 'Cztery zdania, podpisane przez wszystkich, przyklejone w widocznym miejscu. Brzmi naiwnie, działa zaskakująco dobrze — bo w sporze odwołujesz się do umowy, a nie do swojej władzy.',
      }),

      h('h2', 'Limit czasu to najsłabsze narzędzie, jakie masz'),
      p(
        'Godzina dziennie znaczy zupełnie co innego, gdy dziecko rozmawia z przyjacielem, a co innego, gdy przewija filmiki. Licznik tego nie odróżnia, więc dziecko uczy się optymalizować pod licznik, a nie pod sens.',
      ),
      p(
        'Lepiej działają granice kontekstowe: nie „ile", tylko „kiedy" i „gdzie". Nie w łóżku, nie przy stole, nie w trakcie odrabiania lekcji. Takie reguły są jednoznaczne i nie wymagają aplikacji do pilnowania.',
      ),

      h('h2', 'Przewidz moment, w którym umowa pęknie'),
      p(
        'Pęknie — przy wyjeździe, przy chorobie, przy premierze gry, na której zależy całej klasie. Umówcie się z góry, jak wygląda odstępstwo i kiedy wracacie do normy. Zaplanowany wyjątek nie psuje zasady; niezaplanowany ją kończy.',
      ),
      p(
        'I ostatnia rzecz: renegocjujcie co pół roku. Dziesięciolatek i dwunastolatek to dwie różne osoby, a zasady pisane dla młodszego dziecka działają na starsze wyłącznie jako powód do buntu.',
      ),
    ]),
  },
]
