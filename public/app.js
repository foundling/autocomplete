const input = document.getElementById('autocomplete-input')
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

const findMatches = ({ target }) => {

  const query = target.value
  fetch(`/api/autocomplete?q=${query}`)
    .then(data => data.json())
    .then(console.log)
}

input.addEventListener('input', debounce(findMatches, 1000, false))
