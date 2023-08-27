# TMS-Coursework

## Task 1

- Класс регистрационная форма. Описать каждое поле формы методом, входными и выходными значениями.
- Создать тестовый фреймворк для юнит тестов по описанной регистрационной форме:
	- реализовать минимум 15 положительных кейсов
	- реализовать минимум 15 негативных кейсов
	- тестовый фреймворк брать на свое усмотрение: Mocha или Jest

### Run tests

```
cd task-1
npm install
npm run test
```


## Task 2

- Создать тестовый фреймворк для API (интеграционных) тестов для web приложения https://jsonplaceholder.typicode.com/:
	- реализовать по 5 тестов на каждый тип метода запроса
	- тестовый фреймворк: Jest + superAgent

### Run tests
```
cd task-2
npm install
npm run test
```

- Logs can be found in `task-2/logs/tests.log`


## Task 3

- Реализовать тестовый фреймвор для UI тестирования для web приложения https://www.onliner.by/:
	- тестовый фреймворк брать на свое усмотрение: WDIO + cucumber, cypress или playwright
	- использовать изученные паттерны: Page Object, Page Factory
	- Добавить allure репортер
	- Использовать различные локаторы и селекторы
	- Организовывать тесты в группы

### Run tests

```
cd task-3
npm install
npm run test
```

### Generate an allure report

```
npm run report:generate
npm run report:open
```

- Logs can be found in `task-3/logs/tests.log`
- Screenshots of failed tests can be found in `task-3/test-results`
