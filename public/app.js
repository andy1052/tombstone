/*
*
*
*	This is the logic for the application (front end)
*
*/

window.onload = function() {

console.log('Hello console!');

//	Test: *** This Works Just fine! Goddamn it! ***

// postdata('http://localhost:3000/users', {"email": "paris@work.com"})
// .then(data => console.log(JSON.stringify(data)))
// .catch(error => console.error(error));


function postdata(url = '', data = {}) {
	return fetch(url, {
		method: "POST",
		headers: {"Content-type": "application/json"},
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.catch(e => console.error(e));
};


// ********************************************

const x = document.getElementById('formSub');
x.addEventListener("click", function(event) {

event.preventDefault();

	let user = document.querySelector('#in').value;

	const data = {
		"email": user
	};

console.log(data);

	postdata('http://localhost:3000/users', data)
	.then(data => console.log(JSON.stringify(data)))
	.catch(error => console.error(error));

}, false);




// b.addEventListener("submit", (e) => {
// 	e.preventDefault();

// 	let a = new FormData(document.querySelector('in'));
// 	console.log(a);

// 	fetch("localhost:3000/users", {
// 		method: 'POST',
// 		body: {"email": a},
// 		headers: {'Content-type': 'application/json'}
// 		}).then(res => res.json())
// 		.then(response => console.log('Success: ', JSON.stringify(response)))
// 		.catch(error => console.error('Error: ', error));
// });

};