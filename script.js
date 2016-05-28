var styles = 'border-bottom: 3px solid #00aced;\
				position: relative;\
				font-style: italic;\
				color: #000;\
				text-decoration: none;';



function displayElements() {
	document.getElementsByClassName('section-preview')[0].style.display = 'block';
	document.getElementsByClassName('section-code')[0].style.display = 'block';
}


function generate() {


	var tweetText = document.getElementById('tweetText').value;
	var tweetTextEncoded = encodeURIComponent(tweetText);

	var tweetUrl = document.getElementById('tweetUrl').value;
	tweetUrl = '&url='+tweetUrl;

	var tweetHashtags = document.getElementById('tweetHashtags').value;
	tweetHashtags = '&hashtags='+tweetHashtags || '';

	var tweetVia = document.getElementById('tweetVia').value;
	tweetVia = '&via='+tweetVia || '';


	var url = 'https://twitter.com/intent/tweet/?text='+tweetTextEncoded+tweetUrl+tweetVia+tweetHashtags;


	var element = '<a href="'+url+'" style="'+styles+'" target="_blank">\
					<span>'+tweetText+'</span>\
					<img src="twitter.png" style="height: 15px; width: auto;"> \
					</a>';
	document.getElementsByClassName('preview')[0].innerHTML = element;


	element = element.replace(/</g, '&lt;');
	document.getElementsByClassName('code')[0].innerHTML = element;

	displayElements();
}


var generateButton = document.getElementsByClassName('generate')[0];

generateButton.addEventListener('click', function(e) {
	generate();
	e.preventDefault();
	return false;
});






function calcTweetCount() {

	var tweetText = document.getElementById('tweetText').value.length;
	var tweetVia = document.getElementById('tweetVia').value.length;
	var tweetUrl = document.getElementById('tweetUrl').value.length;
	var tweetHashtags = document.getElementById('tweetHashtags').value.length;

	if ( tweetHashtags > 1 ) {
		var hashtags = document.getElementById('tweetHashtags').value.split(',');
		tweetHashtags = hashtags.length + hashtags.join().length;
	}

	var tweetCount = 140 - (tweetText + tweetHashtags + tweetVia + tweetUrl);

	var tweetCountElement = document.getElementsByClassName('tweet-character-count')[0];

	tweetCountElement.innerHTML = tweetCount;

	if ( tweetCount < 1 ) {
		generateButton.disabled = true;
	} else {
		generateButton.disabled = false;
	}

	if ( tweetCount < 10 ) {
		tweetCountElement.style.color = 'red';
	} else {
		tweetCountElement.style.color = 'inherit';
	}

}



var inputs = document.querySelectorAll('input');
for (var i = 0; i < inputs.length; i++) {
	inputs[i].addEventListener('keyup', function() {
		calcTweetCount();
	});
	inputs[i].addEventListener('click', function() {
		calcTweetCount();
	});
}
document.querySelector('textarea').addEventListener('keyup', function() {
	calcTweetCount();
});
document.querySelector('textarea').addEventListener('click', function() {
	calcTweetCount();
});
calcTweetCount();






