# Changelog

All notable changes to the project are documented here.

## 1.5.0 - 2026-08-01

### Added

- Custom mixed games built from selected prompt packs
- Persisted language and player-name preferences
- Cross-platform user notifications
- Distinct party-themed player avatars and colors
- Prompt-selection and submission-formatting tests
- Continuous integration, Dependabot, security, privacy, and contribution guidance
- A market-leader product roadmap in HTML and PDF formats

### Changed

- Prompt loading now validates remote content and falls back to English or bundled data
- Game sessions use Fisher–Yates shuffling and reliable virus-card pairing
- Main game history and animations now use stable refs and callbacks
- Home and game-selection layouts are responsive, layered correctly, and readable in dark mode
- Repeated first-card notifications are rate-limited to their display duration
- Expo is upgraded from SDK 51 to SDK 57 with React 19.2 and React Native 0.86
- Application version is aligned at 1.5.0 with Android version code 10 and remote EAS build-number management

### Removed

- Unused legacy navigation, Redux, filesystem, UI, and template dependencies
- Unused template modal and example components
