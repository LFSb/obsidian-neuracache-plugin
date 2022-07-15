import { App, Modal, Setting } from "obsidian";

export class FlashCardModal extends Modal {
	question: string;
	answer: string;
	onSubmit: (question: string, answer: string) => void;

	constructor(app: App, onSubmit: (question: string, answer: string) => void) {
		super(app);
		this.onSubmit = onSubmit;
	}

	onOpen() {
		const {contentEl} = this;
		
		contentEl.createEl("h1", { text: "Create a one-liner flashcard."})

		new Setting(contentEl)
			.setName("Enter a Question:")
			.addText((text) => 
				text.onChange((value) => {
					this.question = value;
				}));

		new Setting(contentEl)
			.setName("Enter the Answer:")
			.addText((text) =>
				text.onChange((value) => {
					this.answer = value;
				}));
		new Setting(contentEl)
			.addButton((btn) =>
				btn
					.setButtonText("Create the flashcard!")
					.setCta()
					.onClick(() => {
						this.close();
						this.onSubmit(this.question, this.answer);
					}))
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}