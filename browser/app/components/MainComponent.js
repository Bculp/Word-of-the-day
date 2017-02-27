import React from 'react';
import axios from 'axios';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {word: '', partOfSpeech: '', definition: '', synonyms: [], antonyms: [], listVisibility: 'hide', synonymVisibility: 'hide', antonymVisibility: 'hide' };
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
				word: instance.word[0].toUpperCase() + instance.word.slice(1),
				partOfSpeech: instance.partOfSpeech ? instance.partOfSpeech[0].toUpperCase() + instance.partOfSpeech.slice(1) : '',
				definition: instance.text,
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
			synonyms = ['one','two','three'];
			antonyms = ['four','five','six'];
			this.setState({
				synonyms, 
				antonyms,
				listVisibility: 'show'
			})
		})
		.catch(error => console.error(error))
	}

	showElements(listType) {
		if (listType === 'synonyms') {
			this.setState({synonymVisibility: 'show-elements'})
		}
		else if (listType === 'antonyms') {
			this.setState({antonymVisibility: 'show-elements'})
		}
	}

	render() {
		return (
			<div>
				<div className="flex-container">
					<div className="item" id="word" onClick={() => this.getWord()}>{this.state.word ? `${this.state.word}` : ''}</div>
					<div>{this.state.partOfSpeech ? `${this.state.partOfSpeech}` : ''}</div>
					<div className="item" id="definition">{this.state.definition ? `${this.state.definition}`: ''}</div>
					<div className={this.state.listVisibility}>
						<ul className="list" onClick={() => this.showElements('synonyms')}>Synonyms
							{this.state.synonyms.map((word,index) => {
									return <li key={index} className={this.state.synonymVisibility}>{word}</li>
								})
							}
						</ul>
						<ul className="list" onClick={() => this.showElements('antonyms')}>Antonyms
							{this.state.antonyms.map((word,index) => {
									return <li key={index} className={this.state.antonymVisibility}>{word}</li>
								})
							}
						</ul>
					</div>
				</div>
			</div>
		)
	}
};