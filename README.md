# Mess

![Preview](preview.png)

Messaging dApp for Solana Curriculum in [freeCodeCampWeb3](https://web3.freecodecamp.org/).

[Live Website](https://chiefwoods.github.io/mess/)

[Program on Solana Explorer](https://explorer.solana.com/address/MESS6sYCuTxwEZsF8M6zrkBdUd4oNvqWCdyBTx6KFNo?cluster=devnet)

[Source Repository](https://github.com/ChiefWoods/mess)

## Built With

### Languages

- [![Rust](https://img.shields.io/badge/Rust-f75008?style=for-the-badge&logo=rust)](https://www.rust-lang.org/)
- [![TypeScript](https://img.shields.io/badge/TypeScript-ffffff?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
- [![React](https://img.shields.io/badge/React-23272f?style=for-the-badge&logo=react)](https://react.dev/)

### Libraries

- [solana-bankrun](https://kevinheavey.github.io/solana-bankrun/)
- [anchor-bankrun](https://kevinheavey.github.io/solana-bankrun/)
- [@solana/web3.js](https://solana-labs.github.io/solana-web3.js/)
- [@solana/wallet-adapter-react](https://github.com/anza-xyz/wallet-adapter)
- [@dialectlabs/sdk](https://www.dialect.to/)
- [@coral-xyz/anchor](https://www.anchor-lang.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zod](https://zod.dev/)

### Crates

- [anchor-lang](https://docs.rs/anchor-lang/latest/anchor_lang/)

### Runtime and Test Runner

- [![Bun](https://img.shields.io/badge/Bun-000?style=for-the-badge&logo=bun)](https://bun.sh/)

## Getting Started

### Prerequisites

1. Update your Solana CLI, Bun toolkit and avm version

```bash
agave-install init 2.1.0
bun upgrade
avm use 0.31.0
```

### Setup

1. Clone the repository

```bash
git clone https://github.com/ChiefWoods/mess.git
```

2. Install all dependencies

```bash
bun i
```

3. Generate a new keypair

```bash
solana-keygen-new -o mess-wallet.json
```

4. Set configuration to use devnet and keypair

```bash
solana config set -u l -k mess-wallet.json
```

5. Start a local validator

```bash
solana-test-validator
```

6. In another terminal, airdrop some SOL to account

```bash
solana airdrop 5
```

7. Resync your program id

```bash
anchor keys sync
```

8. Build the program

```bash
anchor build
```

9. Test the program

```bash
bun test
```

10. In the `app` directory, set up `.env` values

```bash
cp .env.example .env.development
```

11. Start development server

```bash
bun run dev
```

## Issues

View the [open issues](https://github.com/ChiefWoods/mess/issues) for a full list of proposed features and known bugs.

## Acknowledgements

### Resources

- [Shields.io](https://shields.io/)

### Hosting and API

- [GitHub Pages](https://pages.github.com/)
- [Helius](https://www.helius.dev/)
- [Dialect](https://www.dialect.to/)

## Contact

[chii.yuen@hotmail.com](mailto:chii.yuen@hotmail.com)
