# Invoicelink.io

[![license](https://img.shields.io/static/v1?label=license&message=GPL-3.0&color=2976ea)](LICENSE.md) [![issues - invoicelink](https://img.shields.io/github/issues/invoicelink-io/invoicelink?color=984ef0)](https://github.com/invoicelink-io/invoicelink/issues) [![Community - Discord](https://img.shields.io/static/v1?label=community&message=discord&color=5765F2&logo=discord)](https://discord.gg/TwCrkdCnPS)

## 🧾 What is Invoicelink.io?

[Invoicelink.io](https://invoicelink.io) is an invoicing solution built for freelancers and small businesses! 💼 🚀

## ✨ Features

- 📄 Create and send professional invoices
- 💰 Track payments and manage clients
- 🎨 Customizable invoice templates
- 🌍 Support for multiple currencies
- 🔌 Bring your own payment gateway integration
- 🔒 Secure and user-friendly interface

## 🌐 Hosted Version

A hosted version of the application is available at [app.invoicelink.io](https://app.invoicelink.io). You can sign up for a free account and start using the application right away. 🆓 🚀

## 🏠 Self Hosting

This application can be self-hosted on your own server. A detailed guide on self-hosting will be provided in the future. 🔧📚

## 🗂 Project Structure

The project is organized into two main folders:

- `apps/`: Contains the main applications

  - `api/`: API server (built with Elysia and bun) 🖥️
  - `app/`: The core application 📱
  - `pay/`: The payment link application 💳

- `packages/`: Contains shared packages
  - `config/`: Shared dev configs ⚙️
  - `db/`: Shared prisma schema 🗄️
  - `lib/`: Shared libraries 📚
  - `ui/`: Shared UI components 🎨

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v20 or later recommended) 📗
- [pnpm](https://pnpm.io/) (v9 or later) 📦

## 🚀 Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/invoicelink-io/invoicelink.git
   cd invoicelink
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Start the development servers:

   ```
   pnpm dev
   ```

4. Build the project:

   ```
   pnpm build
   ```

## 📜 Scripts

- `pnpm build`: Build all applications and packages 🏗️
- `pnpm dev`: Start all applications in development mode 🔧
- `pnpm lint`: Run linting for all applications and packages 🧹
- `pnpm test`: Run tests for all applications and packages 🧪

## 🤝 Contributing

We welcome contributions to Invoicelink.io! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests. 🙌

## 🆘 Support

If you encounter any issues or have questions, please file an issue on our [GitHub issue tracker](https://github.com/invoicelink-io/invoicelink/issues).

Join our community on [Discord](https://discord.gg/TwCrkdCnPS) for discussions, support, and updates! 💬🤗

## 📄 License

This project is licensed under the GNU General Public License v3.0 (GPL-3.0). ⚖️

The GPL-3.0 is a strong copyleft license that requires developers who use or modify this software to make their full source code available under the same terms. This ensures that any derivative work remains free and open source.

Key points of the GPL-3.0:

- ✅ You are free to use, modify, and distribute this software.
- 🔄 If you distribute modified versions, you must release the source code under GPL-3.0.
- 🔗 Any software that incorporates GPL-3.0 code must also be released under GPL-3.0.
- ⚠️ There's no warranty for this free software.

For more details, see the full text of the [license](/LICENSE).
