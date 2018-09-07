/*
*
*
*	This is the logic for the application (front end)
*
*/

window.onload = function() {

console.log('Hello console!');


function myFunction(e) {

	e.preventDefault();

	let x = document.getElementById('emailSubmit');
	let text = '';
	let i;
	for (i = 0; i < x.length; i++) {
		text += x.elements[i].value + "<br>";
		console.log(text);
	}
}

// let b = document.getElementById('btn');

// b.addEventListener("submit", (e) => {
// 	e.preventDefault();

// 	let a = new FormData(document.querySelector('in'));
// 	console.log(a);

// 	fetch("users", {
// 		method: 'POST',
// 		body: {"email": a},
// 		headers: {'Content-type': 'application/json'}
// 		}).then(res => res.json())
// 		.then(response => console.log('Success: ', JSON.stringify(response)))
// 		.catch(error => console.error('Error: ', error));
// });

};