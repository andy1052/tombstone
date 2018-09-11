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


//	Buy button - redirect to amazon kindle page:
const buy = document.getElementById('buy').addEventListener("click", function() {
	location.href = "https://www.amazon.ca/Anthems-Blood-Marrow-Tombstone-Kane-ebook/dp/B07H7R6MHW/ref=sr_1_1?ie=UTF8&qid=1536682964&sr=8-1&keywords=anthems+of+the+blood+and+the+marrow";
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


/*
	Javascript to open/close the modal window:
*/
//	Get the modal:
let modal = document.getElementById('myModal');

//	Get the button that opens the modal:
let btn = document.getElementById('myBtn');

//	Get the span element that closes the modal:
let span = document.getElementsByClassName('close')[0];

//	When the user clicks on the button, open the modal:
btn.onclick = function() {
	modal.style.display = "block";
};


//	When the user clicks on <span> (x), close the modal:
span.onclick = function() {
	modal.style.display = "none";
};


//	When the user clicks anywhere outside of the modal, close it:
window.onclick = function(event) {
	if (event.target === modal) {
		modal.style.display = "none";
	}
};



};