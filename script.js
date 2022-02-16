// GET quotos From API
const quoteContainer = document.querySelector("#quote-container");
const btnQuote = document.querySelector("#new-quote");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const loader = document.querySelector("#loader");


let apiQuotes = [];

const showLoadingSpinner = () => { 
  loader.hidden = false;//Ocultar el loader
  quoteContainer.hidden = true;// Ver solo el contenido del container
}

const removeLoadingSpinner = () => { 
  quoteContainer.hidden = false;
  loader.hidden = true;
}


//Show new Quote
const newQuote = () => {
  showLoadingSpinner();//First time to refresh the page
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  //If Author is not blank
  authorText.textContent = (quote.author) ? quote.author : 'Unknown';
  //Check Quote lenght to styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote')
  } else { 
    quoteText.classList.remove('long-quote');
  }
  //Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  removeLoadingSpinner();
};
//Get Quotes
const getQuoutes = async () => {
  showLoadingSpinner();
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    alert('No se ha podido cargar la pagina ');
    throw Error(err);
    
  }
};

//Tweet Quote
const tweetQuote = () => { 
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} 
  - ${authorText.textContent}`;

  window.open(twitterURL , '_blank');
}

//Events
const eventos = () => {
  btnQuote.addEventListener("click", () => {
    newQuote();
  });
  twitterBtn.addEventListener('click', () => {
    tweetQuote();
  });
};

//On Load
getQuoutes();
eventos();

