import { App, Setting, PluginSettingTab} from 'obsidian';
import NeuraCacheFlashcardPlugin from 'main';

export class NeuraCacheSettingsTab extends PluginSettingTab {
	plugin: NeuraCacheFlashcardPlugin;

	constructor(app: App, plugin: NeuraCacheFlashcardPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h1', {text: 'NeuraCache Plugin Settings'});

		new Setting(containerEl)
			.setName('One-liner seperator.')
			.setDesc('False for :, True for ::')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.doubleColonSeparator)
				.onChange(async (value) => {
                    console.debug("Set doubleColonSeparator to " + value);
					this.plugin.settings.doubleColonSeparator = value;
					await this.plugin.saveSettings();
        }));

        new Setting(containerEl)
            .setName('Regular Card endline format.')
            .setDesc('This value will be used to end a regular flashcard. Default value: - - -')
                .addText(text => text
                    .setValue(this.plugin.settings.regularCardEndLine)
                    .onChange(async (value) => {
                        console.debug("Set regularCardEndLine to " + value);
                        this.plugin.settings.regularCardEndLine = value;
                        await this.plugin.saveSettings();
        }));

        new Setting(containerEl)
            .setName('Flashcard tag.')
            .setDesc('Tag that will be picked up by NeuraCache as a flashcard. Default value: #flashcard')
                .addText(text => text
                    .setValue(this.plugin.settings.flashcardTag)
                    .onChange(async (value) => {
                        console.debug("Set flashcardTag to " + value);
                        this.plugin.settings.flashcardTag = value;
                        await this.plugin.saveSettings();
        }));
        
        new Setting(containerEl)
            .setName('Spaced Repetition tag.')
            .setDesc('Tag that will be picked up by NeuraCache as a Spaced Repitition. Default value: #spaced')
                .addText(text => text
                    .setValue(this.plugin.settings.spacedTag)
                    .onChange(async (value) => {
                        console.debug("Set spacedTag to " + value);
                        this.plugin.settings.spacedTag = value;
                        await this.plugin.saveSettings();
        }));
	}
}