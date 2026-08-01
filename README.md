# Drinking Democracy

Drinking Democracy is a local multiplayer party game built with React Native, Expo, and TypeScript. The iOS edition is published as **Party Populist**.

Players add their names, choose a prompt language, and play one of three themed packs—or mix those packs into a custom game. Cards can contain player placeholders, persistent “virus” rules, votes, challenges, and custom player-created rules.

## Features

- Prinks, Messy, Flirty, and custom mixed sessions
- English, Irish, Polish, and Spanish interface text
- English and Irish prompt libraries, with a reliable English fallback
- Locally persisted player names, language preference, and played history
- Paired virus start/end cards with player-name substitution
- Email-based community prompt submissions
- Android, iOS, and web development targets through Expo

## Requirements

- Node.js 22.13 or newer (see `.nvmrc`)
- npm
- Android Studio or Xcode for native emulators, or an Expo development build

## Setup

```bash
npm ci
npm start
```

Other useful commands:

```bash
npm run android
npm run ios
npm run web
npm run typecheck
npm test
npm run check
```

`npm run check` is the same validation run by GitHub Actions.

## Architecture

```text
saved language
      ↓
validated remote prompt packs
      ↓ failure/empty data
English remote pack → bundled English fallback
      ↓
AsyncStorage cache and played history
      ↓
session builder → GameOneScreen
```

- `screens/` contains the user-facing flows.
- `utils/storePrompts.tsx` loads, validates, caches, and falls back between prompt sources.
- `utils/selectRandomPrompts.tsx` builds sessions and pairs virus cards.
- `utils/language/` resolves translations and normalizes localized category names.
- `languages/` contains interface translations.
- The `json-data` branch contains remotely updateable prompt packs.
- The root prompt files are the offline English fallback.

## Language support

| Language | Interface | Prompt content |
| --- | --- | --- |
| English | Complete | Complete |
| Irish | Complete | Complete |
| Polish | Complete | English fallback |
| Spanish | Complete | English fallback |

Polish and Spanish should not be described as fully translated until all five non-empty JSON packs exist under `JSON/<Language>/` on the `json-data` branch. Empty, invalid, slow, or missing remote packs are rejected automatically.

## Updating prompts

Each supported prompt language needs these files:

```text
prompts.json
crazy.json
flirty.json
virus.json
virusend.json
```

Every entry must have non-empty `text` and `category` fields. Virus entries should use matching IDs such as `12a` and `12b`. Test the JSON before merging it into `json-data`; the app will otherwise fall back to English or the bundled pack.

## Releases

Before creating a store build:

1. Run `npm run check` and `npx expo install --check`.
2. Update the version in both `package.json` and `app.json`.
3. Review `CHANGELOG.md` and the privacy disclosure.
4. Build with the production EAS profile; EAS manages and increments the native build numbers remotely.
5. Test the resulting binary on a physical device.
6. Tag the release only after the store build has been accepted.

## Privacy and security

See [PRIVACY.md](PRIVACY.md) for the data-flow summary and [SECURITY.md](SECURITY.md) for responsible disclosure.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Pull requests must pass the typecheck and test suite.

## Licence

No open-source licence has been selected. Copyright remains with the project owner, and reuse rights are not granted by this repository. Add a licence only after intentionally choosing terms that match the project’s distribution goals.
