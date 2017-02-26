import React from 'react';
import axios from 'axios';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {word: '', partOfSpeech: '', definition: '', exampleUses: [] };
	}

	componentDidMount() {
		this.getWord();
	}

	getWord() {
		axios.get('api/keys')
		.then(res => res.data)
		.then(info => {
			let instance = info[0];
			this.setState({word: instance.word});
			this.setState({partOfSpeech: instance.partOfSpeech});
			this.setState({definition: instance.text});
			this.setState({exampleUses: instance.exampleUses})
		})
		.catch('error getting keys')
	}

	render() {
		return (
			<div>
				<div>
					<h1>{this.state.word ? `${this.state.word} - ${this.state.partOfSpeech}` : ''}</h1>
					<h2>{this.state.definition ? `Definition: ${this.state.definition}`: ''}</h2>
					<h4>{this.state.exampleUses.length > 0 ? `Examples: ${this.state.exampleUses}` : ''}</h4>
				</div>
			</div>
		)
	}
};