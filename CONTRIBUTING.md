# Contributing

## Development workflow

1. Create a short-lived branch from `main`.
2. Install dependencies with `npm ci` using Node.js 22.13 or newer.
3. Keep UI text in the language JSON files and game content in the prompt packs.
4. Add or update tests for prompt-selection and formatting behavior.
5. Run `npm run check` before opening a pull request.

## Pull requests

- Explain the player-facing change and how it was tested.
- Include screenshots for visual changes.
- Keep version bumps and generated store builds out of feature pull requests.
- Do not commit credentials, signing files, EAS tokens, or store API keys.
- Do not weaken prompt validation or remove the bundled fallback without a replacement offline strategy.

## Prompt content

Prompt JSON belongs on the `json-data` branch. Keep matching virus start/end IDs paired, preserve valid JSON, and avoid adding translations that have not been reviewed by a fluent speaker.
