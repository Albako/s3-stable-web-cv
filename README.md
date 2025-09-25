# Statyczna strona z moim CV
Strona została w pełni postawiona w S3 w chmurze AWS. Przedstawia ona krótki opis moich dotychczasowych osiągnięć. Projekt może posłużyć jako **`OFFLINE CV GENERATOR`**. Wystarczy otworzyć plik **`index.html`** i kliknąć **`drukuj`** w naszej przeglądarce. Jeśli chcemy przerobić owe CV pod siebie, to proszę śmiało edytować **`index.html`** i **`translations.js`** pod swoje dane, następnie podmienić grafiki w `/images` i gotowe. Mamy własne **`CV`** gotowe do przemielenia przez automatyczny system zaimplementowany w działach `HR`.

## Architektura
Do użycia i postawienia strony **`www`** zostały przeze mnie użyte:
1. **`Amazon S3`**: Na nim znajdują się wymagane pliki do hostowania strony.
2. **`Amazon CloudFront`**: Dzięki niemu pliki znajdujące sie w **`S3`** są hostowane jako strona **`www`**.
3. **`Amazon Route 53`**: Dzięki temu serwisowi udało mi wykupić alternatywną domenę zamiast generycznego linku od **`CloudFront`**, dzięki czemu adres wygląda bardziej profesjonalnie.
4. **`Ammazon Certificates`**: Bez certyfikatu wykupionego w tej usłudze, nie udało by mi się uruchomić mojej strony pod customową domeną.
5. **`index.html`**: Zawartość i budowa strony.
6. **`style.css`**: Styl i wygląd strony, a także wydruku (wygenerowania CV w formie PDF).
7. **`translations.js`**: Tłumaczenie zawartości pomiędzy językami PL i ENG.
8. **`script.js`**: Skrypt umożliwiający przełączanie strony pomiędzy PL i ENG.

## Aktywacja lokalna i testowanie
Do testów należy pobrać projekt, zmodyfikować pod siebie lub też nie (proszę pamiętać, że nazwy grafik są kluczowe, nie same grafiki) i uruchomić plik **`index.html`**. Strona powinna się wtedy uruchomić lokalnie w naszej domyślnej przeglądarce internetowej.

## Aktywny link
Moje **`CV`** można zobaczyć pod linkiem:

```
https://konradlesny-cv.com
```

## Jak postawić statyczną stronę, korzystająć z AWS?
W twoim koncie **`AWS`** należy zrobić następujące czynności:
1. **`Amazon S3`**: Należy stworzyć własny 'bucket', do którego wyślemy nasze pliki odpowiedzialne za stronę **`www`**. **`S3`** nie musi być duży (tzn. nie musi mieć dużej pojemności), będziemy go wykorzystywać tylko w jednym celu - hostowanie strony **`www`**. Przy tworzeniu 'bucket-a', należy się upewnić, że mamy wybrany poprawny **`AWS Region`** (tzn. najbliższy nam), a także że mamy włączoną funkcję **`Block Public Access settings for this bucket`**, ponieważ mimo tego, że chcemy stworzyć własną publiczną stronę internetową, to nie chcemy, żeby zawartość naszego 'bucket' była publicznie dostępna (nawet jeśli nic tam nie mamy, mimo naszych plików **`.html`** i **`.css`**).
2. **`Amazon CloudFront`**: Nasz pośrednik między użytkownikami a Twoim **`S3`**. By wszystko poprawnie zostało stworzone, należy stworzyć dystrybucję **`CloudFront`**. W sekcji **`Origin domain`** powinniśmy wskazać nasz **`S3`** (może nie wyświetlać się na liście, wtedy trzeba będzie utworzyć **`URL`**, który może wyglądać następująco:

```
moj-s3-1234.s3.eu-central-1.amazonaws.com
```
  Dodatkowo należy zmienić ustawienie **`Default root object`**. W tej sekcji należy wskazać plik **`index.html`** by po wejściu w link nasza dystrybucja **`CloudFront`** automatycznie uruchamiała stronę, korzystając z tego właśnie pliku. Ostatnie co nam zostało to skopiowanie adresu **`URL`**, który wyświetla się w sekcji **`Distribution domain name`** (taki adres powinien wyglądać podobnie do tego **`d12345abcdef.cloudfront.net`**) i gotowe, możemy udostępnić link, dzięki któremu każdy z dostępem do internetu będzie mógł zobaczyć naszą statyczną stronę **`www`**.

3. **`Amazon Route 53`** i **`Amazon Certificates`**: Dzięki tym usługom udało mi się hostować moją stronę pod customowym linkiem, lepiej wyglądającym niż generyczny link od **`Amazon CloudFront`**. Nie ma nic złego z pominięciem tego kroku, jednakże jeśli chcemy, by nasz link wyglądał na spersonalizowany i choć troche profesjonalny, to polecam skorzystać z owych usług. Wpierw należy w **`Route 53`** wpisać domenę jaka nas interesuje, sprawdzić czy jest dostępna i ile kosztuje. Po wykupieniu owej domeny możemy zaznaczyć opcję by sama się wykupywała automatycznie po wygaśnięciu okresu, który możemy sami wybrać. Następnie możemy powrócić co aplikacji **`Amazon CloudFront`** i w naszej dystrybucji w sekcji **`General`** znaleźć **`Settings`** i wybrać **`Edit`**. W sekcji edycji ustawień będziemmy mogli wkleić naszą alternatywną domenę w linijce zatytuowanej **`Alternate domain nammme (CNAME) - optional`**. Poniżej znajdziemy **`Custom SSL certificate - optional`**, gdzie można wybrać opcję **`Request certificate`**, gdzie będziemy mogli stworzyć nasz certyfikat. Gdy stworzymy nasz certyfikat, powinien on się wyświetlać do wyboru. Gotowe.


## Troubleshooting
1. Brak grafik/grafiki się nie ładują - proszę się upewnić, że grafiki nazywają się tak samo, jak ich odwołania w **`index.html`**, a także, że istnieją w ścieżce **`\images`** (nazwa fodleru jest również kluczowa, dla odwołań w kodzie).
2. Brak działającego tłumaczenia - proszę się upewnić, że przeglądarka www nie blokuje skryptów **`.js`**.
3. CV otwiera się, ale bez stylu graficznego strony - proszę się upewnić, że plik **`style.css`** istnieje i że wszelkie odwołania do niego istnieją w poprawny sposób.
4. Wprowadziłem zmiany, które wgrałem do mojego **`S3`**, ale strona wciąż otwiera się z poprzednimi zmianami - wgranie zmian zazwyczaj chwilę trwa. Jeśli stare pliki zostały zastąpione nowymi, to należy być cierpliwym i w ciągu max 24 godzin owe zmiany powinny wejść w życie. Jest to normalne, że nasze pliki są gdzieś tam w cashe Amazona i dopóki one się się nie zaktualizują, to nie zauważymy wprowadzonych zmian.
