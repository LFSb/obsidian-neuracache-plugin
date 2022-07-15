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