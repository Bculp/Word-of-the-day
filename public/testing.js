let axios = require('axios');
// import 'axios' from 'axios'
const containerEl = document.querySelector('.flex-container');
const wordEl = document.querySelector('.word')
const partOfSpeechEl = document.querySelector('.partOfSpeech')
const definitionEl = document.querySelector('.definition')
const listEl = document.querySelector('.list')
const synonymsEl = document.querySelector('#synonyms');
const antonymsEl = document.querySelector('#antonyms');

let state = {word: '', partOfSpeech: '', definition: '', synonyms: [], antonyms: [] };

function getWord() {
	containerEl.classList.add('hide');

	wordEl.classList.remove('word-enter');
	partOfSpeechEl.classList.remove('partOfSpeech-enter');
	definitionEl.classList.remove('definition-enter');
	listEl.classList.remove('list-enter');
	synonymsEl.innerHTML = '';
	console.log('get word running');
	axios.get('api/getWord')
	.then(res => res.data)
	.then(info => {
		let instance = info[0];
		state.word = instance.word[0].toUpperCase() + instance.word.slice(1);
		state.partOfSpeech = instance.partOfSpeech ? instance.partOfSpeech[0].toUpperCase() + instance.partOfSpeech.slice(1) : '';
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
		// synonyms = ['one','two','three'];
		// antonyms = ['four','five','six'];
		
		state.synonyms = synonyms;
		state.antonyms = antonyms;

		containerEl.classList.remove('hide');

		wordEl.textContent = state.word;
		wordEl.classList.add('word-enter')

		partOfSpeechEl.textContent = state.partOfSpeech;
		partOfSpeechEl.classList.add('partOfSpeech-enter');

		definitionEl.textContent = state.definition;
		definitionEl.classList.add('definition-enter');

		synonymsEl.textContent = 'Synonyms';
		state.synonyms.map(synonym => {
			let li = document.createElement('li');
			li.textContent = synonym;
			li.classList.add('hide');
			li.classList.add('list');
			synonymsEl.appendChild(li);
		})

		antonymsEl.textContent = 'Antonyms';
		state.antonyms.map(antonym => {
			let li = document.createElement('li');
			li.textContent = antonym;
			li.classList.add('hide');
			li.classList.add('list');
			antonymsEl.appendChild(li);
		})

		listEl.classList.add('list-enter');

	})
	.catch(error => console.error(error))
}			

function showList(e) {
	if (e.target.id === 'synonyms') {
		let arr = Array.from(e.target.children)
		if (arr.length < 1) return;
		if (arr[0].classList.contains('hide')) {
			arr.map((element, index) => {
			element.classList.remove('hide');
			element.classList.add(`enter${index}`);
			})
		} else {
			arr.map((element, index) => {
				element.classList.add('hide');
				element.classList.remove(`enter${index}`)
			})
		}
		
	} else if (e.target.id === 'antonyms') {
			let arr = Array.from(e.target.children)
			if (arr.length < 1) return;
			if (arr[0].classList.contains('hide')) {
				arr.map((element, index) => {
				element.classList.remove('hide');
				element.classList.add(`enter${index}`);
				})
			} else {
				arr.map((element, index) => {
				element.classList.add('hide');
				element.classList.remove(`enter${index}`)
				})
			}
			
	}
}	

wordEl.addEventListener('click', getWord);
synonymsEl.addEventListener('click', (e) => showList(e));
antonymsEl.addEventListener('click', (e) => showList(e));

getWord();

