import React from 'react';
import axios from 'axios';

export default class MainComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {word: '', synonyms: [], antonyms: []};
	}

	componentDidMount() {
		this.getWord();
	}

	getWord() {
		axios.get('http://www.setgetgo.com/randomword/get.php')
		.then(res => res.data)
		.then(word => this.setState({word: word}))
		.catch(console.log('error retrieving word from setgetgo'))
	}

	render() {
		return (
			<div>
				<h1>{this.state.word}</h1>
			</div>
		)
	}
};