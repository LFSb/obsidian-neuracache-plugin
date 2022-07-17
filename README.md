## Neuracache Plugin
The scope for this plugin is extremely simple, we want to be able to have two commands that allow us to simply create [NeuraCache](https://neuracache.com/) flashcards. 

We should be able to:
- Create a "one-liner" card.
  - We should pop up a modal, asking for the question and the answer.
- Create a Regular card 
  - We should pop up a slightly bigger text box, as there's a lot more stuff we can put in here.

## Development

- Clone your repo to a local development folder. For convenience, you can place this folder in your `.obsidian/plugins/your-plugin-name` folder.
  - If, like me, you have your obsidian vault in your iCloud drive somewhere (and you are on a Mac), you'll find it in /Users/USERNAME/Library/Mobile Documents/iCloud~md~obsidian/
- Install NodeJS, then run `npm i` in the command line under your repo folder.
- Run `npm run dev` to compile your plugin from `main.ts` to `main.js`.
- Make changes to `main.ts` (or create new `.ts` files). Those changes should be automatically compiled into `main.js`.
- Reload Obsidian to load the new version of your plugin.
- Enable plugin in settings window.
- For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Feature list
### Done
- Create a one-liner flashcard.
- Implement settings to set:
  - The one-liner separator (: or ::)
  - Flashcard tag (default #flashcard)
  - Spaced Repetition tag (default #spaced)
- Create a long-form flashcard (I'm probably going to need a different modal for that)
### To Do 
- Create a release?
- Pretty sure I could rebuild flashcard.ts to be a little more flexible, that way I can also use it for spaced repetition. I'm probably not going to be using that one in a hurry, but it's nice to know that I can.
- Also, there's a lot of repetition, I could probably clean it up a little and learn a little about generics in Typescript.
- Also, there should be a better way for local development that doesn't require copying .js files over my filesystem, but alas.

## Releasing new releases

- Update your `manifest.json` with your new version number, such as `1.0.1`, and the minimum Obsidian version required for your latest release.
- Update your `versions.json` file with `"new-plugin-version": "minimum-obsidian-version"` so older versions of Obsidian can download an older version of your plugin that's compatible.
- Create new GitHub release using your new version number as the "Tag version". Use the exact version number, don't include a prefix `v`. See here for an example: https://github.com/obsidianmd/obsidian-sample-plugin/releases
- Upload the files `manifest.json`, `main.js`, `styles.css` as binary attachments. Note: The manifest.json file must be in two places, first the root path of your repository and also in the release.
- Publish the release.

> You can simplify the version bump process by running `npm version patch`, `npm version minor` or `npm version major` after updating `minAppVersion` manually in `manifest.json`.
> The command will bump version in `manifest.json` and `package.json`, and add the entry for the new version to `versions.json`

## Obsidian API Documentation

See https://github.com/obsidianmd/obsidian-api
