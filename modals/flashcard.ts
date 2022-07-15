import { App, Modal, Setting } from "obsidian";

export class FlashCardModal extends Modal {
	question: string;
	answer: string;
	isOneLiner: boolean;
	onSubmit: (question: string, answer: string) => void;

	constructor(app: App, onSubmit: (question: string, answer: string) => void, isOneLiner: boolean) {
		super(app);
		this.onSubmit = onSubmit;
		this.isOneLiner = isOneLiner;
	}

	onOpen() {
		const { contentEl } = this;

		const header = this.isOneLiner ? "Create a one-liner flashcard." : "Create a regular flashcard"

		contentEl.createEl("h1", { text: header });

		new Setting(contentEl)
			.setName("Enter a Question:")
			.addText((text) =>
				text.onChange((value) => {
					this.question = value;
				}));

		if (this.isOneLiner) {
			new Setting(contentEl)
				.setName("Enter the Answer:")
				.addText((text) =>
					text.onChange((value) => {
						this.answer = value;
					}));
		}
		else {
			new Setting(contentEl)
				.setName("Enter the Answer:")
				.addTextArea((text) =>
					text.onChange((value) => {
						this.answer = value;
					}));
		}

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
		const { contentEl } = this;
		contentEl.empty();
	}
}