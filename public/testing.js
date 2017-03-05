const axios = require('axios');
// const containerEl = document.querySelector('.flex-container');
const wordEl = document.querySelector('#word')
const partOfSpeechEl = document.querySelector('#partOfSpeech')
const definitionEl = document.querySelector('#definition')
const listEl = document.querySelector('.list')
const synonymsEl = document.querySelector('#synonyms');
const antonymsEl = document.querySelector('#antonyms');

document.title = "Word of the Day"

let state = {word: '', partOfSpeech: '', definition: '', synonyms: [], antonyms: [] };

function getWord() {

	synonymsEl.innerHTML = '';
	console.log('get word running');
	axios.get('api/getWord')
	.then(res => res.data)
	.then(info => {
		let instance = info[0];
		state.word = instance.word[0].toUpperCase() + instance.word.slice(1);
		state.partOfSpeech = `[${instance.partOfSpeech}]`;
		// state.partOfSpeech = instance.partOfSpeech ? instance.partOfSpeech[0].toUpperCase() + instance.partOfSpeech.slice(1) : '';
		state.definition = instance.text;
		console.log('get word finished')
		getRelatedWords(instance.word)
	})
	.catch(error => console.error(error))
}

function getRelatedWords(word) {
	axios.get(`api/getRelatedWords/${word}`)
	.then(res => res.data)
	.then(relatedWords => {
		let synonyms = [], antonyms = [];
		relatedWords && relatedWords.map(instance => {
			if (instance.relationshipType === 'synonym') {
				console.log(instance.words)
				synonyms = instance.words.slice(0,3);
			} else if (instance.relationshipType === 'antonym') {
					antonyms = instance.words.slice(0,3);
					console.log(instance.words)
			}
		})

		wordEl.textContent = state.word;
		partOfSpeechEl.textContent = state.partOfSpeech;
		definitionEl.textContent = state.definition;

		if (synonyms.length < 1) synonyms = ['None found'];
		if (antonyms.length < 1) antonyms = ['None found'];
		state.synonyms = synonyms;
		state.antonyms = antonyms;

		synonymsEl.textContent = 'Synonyms';
		state.synonyms.map(synonym => {
			let li = document.createElement('li');
			li.textContent = synonym[0].toUpperCase() + synonym.slice(1);
			li.classList.add('list');
			synonymsEl.appendChild(li);
		})

		antonymsEl.textContent = 'Antonyms';
		state.antonyms.map(antonym => {
			let li = document.createElement('li');
			li.textContent = antonym[0].toUpperCase() + antonym.slice(1);
			li.classList.add('list');
			antonymsEl.appendChild(li);
		})

	})
	.catch(error => console.error(error))
}

wordEl.addEventListener('click', getWord);

getWord();

$(function() {
	$('#flipbook').booklet({
		width: '65%',
		height: '70%',
		closed: true,
		autoCenter: true,
		covers: true
	});
});

