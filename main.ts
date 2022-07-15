import { Editor, Plugin } from 'obsidian';
import { FlashCardModal } from "./flashcardmodal";
import { NeuraCacheSettingsTab } from "./neuracachesettingstab";

interface NeuraCachePluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: NeuraCachePluginSettings = {
	mySetting: 'default'
}

export default class NeuraCacheFlashcardPlugin extends Plugin {
	settings: NeuraCachePluginSettings;

	async onload() {
		await this.loadSettings();

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'open-oneliner-flashcard-modal',
			name: 'Create a one-liner flashcard.',
			editorCallback: (editor: Editor) => {
				const onSubmit = (question: string, answer: string) => {
					editor.replaceSelection(`${question} : ${answer} #flashcard`);
				}
				new FlashCardModal(this.app, onSubmit).open();
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
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