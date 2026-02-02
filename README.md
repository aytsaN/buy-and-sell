# BuyAndSell

This is a full-stack application. It uses Node.js for the back-end, Angular for the front-end and MySQL for the database.

## BE Development server

To start a local BE development server, run:

```bash
npm run dev
```

The back-end will become available at `http://localhost:8000`.

## FE Development server

To start a local FE development server, run:

```bash
ng serve
```

or to run the app with proxy:

```bash
npm run start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the FE project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running FE unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running FE end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
