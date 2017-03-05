const axios = require('axios');
const wordEl = document.querySelector('#word')
const partOfSpeechEl = document.querySelector('#partOfSpeech')
const definitionEl = document.querySelector('#definition')
const listEl = document.querySelector('.list')
let synonymsFound = false, antonymsFound = false;

document.title = "Word of the Day"

let state = {word: '', partOfSpeech: '', definition: '', synonyms: [], antonyms: [] };

function getWord() {

	// synonymsEl.innerHTML = '';
	console.log('get word running');
	axios.get('api/getWord')
	.then(res => res.data)
	.then(info => {
		let instance = info[0];
		state.word = instance.word[0].toUpperCase() + instance.word.slice(1);
		state.partOfSpeech = `[${instance.partOfSpeech}]`;
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
				synonyms = instance.words.slice(0,3);
			} else if (instance.relationshipType === 'antonym') {
					antonyms = instance.words.slice(0,3);
			}
		})

		wordEl.textContent = state.word;
		partOfSpeechEl.textContent = state.partOfSpeech;
		definitionEl.textContent = state.definition;

		state.synonyms = synonyms;
		state.antonyms = antonyms;

		if (state.synonyms.length > 0) synonymsFound = true;
		if (state.antonyms.length > 0) antonymsFound = true;

		if (synonymsFound) {
			let synonymsEl = document.createElement('ul');
			synonymsEl.textContent = 'Synonyms';
			synonymsEl.classList.add('no-padding-list');
			listEl.appendChild(synonymsEl);
			state.synonyms.map(synonym => {
				let li = document.createElement('li');
				li.textContent = synonym[0].toUpperCase() + synonym.slice(1);
				synonymsEl.appendChild(li);
			})
		}

		if (antonymsFound) {
			let antonymsEl = document.createElement('ul');
			antonymsEl.textContent = 'Antonyms';
			if (synonymsFound && antonymsFound) antonymsEl.classList.add('normal-list');
			else antonymsEl.classList.add('no-padding-list');
			listEl.appendChild(antonymsEl);
			state.antonyms.map(antonym => {
				let li = document.createElement('li');
				li.textContent = antonym[0].toUpperCase() + antonym.slice(1);
				antonymsEl.appendChild(li);
			})
		}

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

