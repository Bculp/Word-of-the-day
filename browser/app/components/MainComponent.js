import React from 'react';
import axios from 'axios';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {word: '', partOfSpeech: '', definition: '', exampleUses: [], synonyms: [], antonyms: [] };
	}

	componentDidMount() {
		this.getWord();
	}

	getWord() {
		axios.get('api/getWord')
		.then(res => res.data)
		.then(info => {
			let instance = info[0];
			this.setState({
				word: instance.word,
				partOfSpeech: instance.partOfSpeech,
				definition: instance.text,
				exampleUses: instance.exampleUses
			})
			this.getRelatedWords(instance.word)
		})
		.catch(error => console.error(error))
	}

	getRelatedWords(word) {
		axios.get(`api/getRelatedWords/${word}`)
		.then(res => res.data)
		.then(relatedWords => {
			let synonyms = [], antonyms = [];
			relatedWords && relatedWords.map(instance => {
				if (instance.relationshipType === 'synonym') {
					synonyms = instance.words;
				} else if (instance.relationshipType === 'antonym') {
					antonyms = instance.words;
				}
			})
			this.setState({synonyms, antonyms})
		})
		.catch(error => console.error(error))
	}

	render() {
		return (
			<div>
				<div>
					<h1>{this.state.word ? `${this.state.word} - ${this.state.partOfSpeech}` : ''}</h1>
					<h2>{this.state.definition ? `Definition: ${this.state.definition}`: ''}</h2>
					<h4>{this.state.exampleUses.length > 0 ? `Examples: ${this.state.exampleUses}` : ''}</h4>
					<h5>{this.state.synonyms.length > 0 ? `Synonyms: ${this.state.synonyms}` : ''}</h5>
					<h5>{this.state.antonyms > 0 ? `Antonyms: ${this.state.antonyms}` : ''}</h5>
				</div>
			</div>
		)
	}
};