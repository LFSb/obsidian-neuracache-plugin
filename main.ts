import { Editor, Plugin } from 'obsidian';
import { FlashCardModal } from "./modals/simpleflashcard";
import { NeuraCachePluginSettings } from 'settings/interface';
import { NeuraCacheSettingsTab } from 'settings/settings';

const DEFAULT_SETTINGS: NeuraCachePluginSettings = {
	doubleColonSeparator: false,
	flashcardTag: "#flashcard",
	spacedTag: "#spaced"
}

export default class NeuraCacheFlashcardPlugin extends Plugin {
	settings: NeuraCachePluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: 'open-oneliner-flashcard-modal',
			name: 'Create a one-liner flashcard.',
			editorCallback: (editor: Editor) => {

				const seperator = this.settings.doubleColonSeparator ? "::" : ":";

				const onSubmit = (question: string, answer: string) => {
					editor.replaceSelection(`${question}${seperator}${answer} ${this.settings.flashcardTag}`);
				}

				new FlashCardModal(this.app, onSubmit).open();
			}
		});

		this.addSettingTab(new NeuraCacheSettingsTab(this.app, this));
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}