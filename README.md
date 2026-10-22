# analyst-html-tools

**UA:** Інтерактивні інструменти та навчальні матеріали для аналітиків даних: SQL-тренажер на портфелі кредитних карток, калькулятор метрик ризику, тренажер питань для співбесіди.
**EN:** Interactive tools and study material for data analysts: a SQL trainer on a credit card portfolio, a risk metrics calculator and an interview question trainer.

**Live / Онлайн:** https://antonemec.github.io/analyst-html-tools/

Усе працює локально у браузері, без реєстрації й серверної частини. Everything runs locally in the browser, no sign-up or backend.

## Що всередині / What's inside

| Сторінка / Page | Опис / Description |
|---|---|
| [`index.html`](index.html) | Головна: навігація між усіма інструментами / hub |
| [`sql-trainer.html`](sql-trainer.html) | 18 SQL-завдань (Easy → Hard) з автоперевіркою; SQLite (sql.js) у браузері; синтетичні дані: 400 клієнтів, ~530 карток, ~50 тис. транзакцій, 12 місяців знімків прострочки |
| [`metrics-calculator.html`](metrics-calculator.html) | EAR і пільговий період, roll rate і NPL, ECL = PD×LGD×EAD, економіка картки (unit economics) |
| [`interview-trainer.html`](interview-trainer.html) | 29 питань із відповідями за темами й рівнями; слабкі питання повертаються частіше |
| [`sql_keys.html`](sql_keys.html), [`problem_solving.html`](problem_solving.html), [`game.html`](game.html), [`audit.html`](audit.html) | Раніші навчальні сторінки / earlier study pages |

Усі інтерфейси двомовні (UA/EN). All interfaces are bilingual.

## Пов'язані репозиторії / Related repositories

- [Retail-Data-Analyst-of-credit-cards-portfolio](https://github.com/antonemec/Retail-Data-Analyst-of-credit-cards-portfolio) — глосарій, метрики, SQL-рецепти, кейси / glossary, metrics, SQL recipes, case studies.
- [Data-analyst-interview-tools](https://github.com/antonemec/Data-analyst-interview-tools) — банк питань, план на 30 днів, чекліст резюме й портфоліо / question bank, 30-day plan, CV and portfolio checklist.

## Запуск локально / Run locally

Достатньо відкрити будь-який `.html` у браузері. SQL-тренажер завантажує sql.js із cdnjs, тому потрібен інтернет.
Open any `.html` file in a browser. The SQL trainer loads sql.js from cdnjs, so an internet connection is required.

## Дані / Data

Усі дані синтетичні, генеруються у браузері детермінованим генератором (seed фіксований), реальних клієнтських даних тут немає.
All data is synthetic, generated in the browser by a deterministic seeded generator; no real customer data.

## Ліцензія / License

MIT
