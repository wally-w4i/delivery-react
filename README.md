# Delivery React

This is a web application for managing deliveries, clients, and reports. The application is designed to be used by a delivery company to manage their daily operations.

## Purpose

The purpose of this project is to provide a comprehensive solution for delivery companies to manage their deliveries, clients, and drivers. The application provides a simple and intuitive interface for managing the entire delivery process, from creating a new delivery to tracking the delivery status and generating reports.

## Features

- User authentication (Login/Register)
- Client management
- Delivery management
- Reporting
- Settings
- A logging view
- Map integration for visualizing deliveries and clients.

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Build Tool:** Vite
- **Linting:** ESLint
- **Package Manager:** bun

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- bun

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/delivery-react/delivery-react.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd delivery-react
    ```
3.  Install the dependencies:
    ```bash
    bun install
    ```

### Running the Application

To start the development server, run:

```bash
bun dev
```

The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
bun build
```

The production-ready files will be located in the `dist/` directory.

### Linting

To run the linter and check for code quality, run:

```bash
bun lint
```

### Previewing the Production Build

To preview the production build locally, run:

```bash
bun preview
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch: `git checkout -b my-new-feature`
3.  Make your changes and commit them: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request.

### Reporting Bugs

If you find a bug, please open an issue on GitHub and provide a detailed description of the bug and how to reproduce it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
