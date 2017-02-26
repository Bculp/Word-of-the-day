import React from 'react';
import axios from 'axios';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {word: '', synonyms: [], antonyms: []};
	}

	componentDidMount() {
		this.getWord();
		this.getKeys();
	}

	getWord() {
		// axios.get('http://www.setgetgo.com/randomword/get.php')
		// .then(res => res.data)
		// .then(word => this.setState({word: word}))
		// .catch(console.log('error retrieving word from setgetgo'))
	}

	getKeys() {
		axios.get('api/keys')
		.then(res => res.data)
		.then(result => console.log('your key is:', result))
		.catch('error getting keys')
	}

	render() {
		return (
			<div>
				<h1>{this.state.word}</h1>
			</div>
		)
	}
};