const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs"
    },
    {
        text: "Life is what happens when you're busy making other plans.",
        author: "John Lennon"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It is during our darkest moments that we must focus to see the light.",
        author: "Aristotle"
    },
    {
        text: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "The best time to plant a tree was 20 years ago. The second best time is now.",
        author: "Chinese Proverb"
    },
    {
        text: "Do what you can, with what you have, where you are.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The only way to achieve the impossible is to believe it is possible.",
        author: "Charles Kingsleigh"
    },
    {
        text: "Everything you want is on the other side of fear.",
        author: "Jack Canfield"
    },
    {
        text: "You miss 100% of the shots you don't take.",
        author: "Wayne Gretzky"
    },
    {
        text: "Whether you think you can, or you think you can't – you're right.",
        author: "Henry Ford"
    }
];

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('newQuoteBtn');

let lastQuote = null;

function getRandomQuote() {
    let randomQuote;
    
    // Ensure we don't get the same quote twice in a row
    do {
        randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    } while (randomQuote === lastQuote && quotes.length > 1);
    
    lastQuote = randomQuote;
    return randomQuote;
}

function displayNewQuote() {
    const quote = getRandomQuote();
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = `— ${quote.author}`;
}

newQuoteBtn.addEventListener('click', displayNewQuote);

// Display a random quote on page load
window.addEventListener('load', displayNewQuote);
