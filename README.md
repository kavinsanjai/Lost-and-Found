# Lost and Found Management System

A comprehensive web application designed to help users report, track, and manage lost and found items within an organization or campus environment.

## 📋 Project Objective

The **Lost and Found Management System** aims to streamline the process of reporting and recovering lost items by providing a centralized platform where users can:

- **Report Lost Items**: Users can create detailed reports of items they have lost, including descriptions, locations, and dates
- **Report Found Items**: Individuals who find items can register them in the system to help reunite them with their owners
- **Track Item Status**: Monitor the status of reported items (Pending, Found, Claimed)
- **User Profile Management**: Maintain personal profiles with a history of lost and found items
- **Secure Authentication**: Register and login functionality to ensure data security and user accountability
- **Dashboard Analytics**: Visual representation of lost and found statistics with charts and graphs
- **Search & Filter**: Easy-to-use search functionality to find specific items quickly

This system reduces the manual effort involved in managing lost and found items, increases the chances of item recovery, and provides transparency throughout the process.

## 🛠️ Tech Stack

### Frontend
- **Angular 20.0.0** - Modern web application framework
- **TypeScript 5.8.2** - Type-safe JavaScript development
- **Bootstrap 5.3.7** - Responsive UI components and styling
- **RxJS 7.8.0** - Reactive programming with Observables
- **NGX-Charts 23.0.0** - Data visualization and charting library
- **Angular Router** - Client-side navigation and routing
- **Angular Forms** - Form handling and validation

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 5.1.0** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose 8.16.2** - MongoDB object modeling for Node.js
- **CORS 2.8.5** - Cross-Origin Resource Sharing middleware
- **Body-Parser 2.2.0** - Request body parsing middleware

### Development Tools
- **Angular CLI 20.0.5** - Command-line interface for Angular
- **Jasmine & Karma** - Testing framework and test runner
- **TypeScript Compiler** - Transpiling TypeScript to JavaScript

### Architecture
- **Full Stack MEAN Application** (MongoDB, Express.js, Angular, Node.js)
- **RESTful API** - Backend API following REST principles
- **Component-Based Architecture** - Modular and reusable Angular components
- **Responsive Design** - MAobile-friendly user interface

---

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
