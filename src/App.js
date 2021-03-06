import DisplayQuotes from './displayQuotes';
import { useEffect, useState } from 'react';
import { AiFillTwitterSquare, AiOutlineWhatsApp } from 'react-icons/ai';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // **********************************
  const url = 'https://type.fit/api/quotes';
  const getQuotes = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setQuotes(data);
    setIsLoading(false);
  };
  // **************************************
  useEffect(() => {
    try {
      getQuotes();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }, []);

  // *********************************************

  const randomQuotes = () => {
    let randomNumbers = Math.ceil(Math.random() * quotes.length);
    console.log(randomNumbers);
    setValue((prevlue) => randomNumbers);
  };

  // *************************************************************************

  if (isLoading) {
    return (
      <div>
        <h1>getting quotes...</h1>
      </div>
    );
  }

  return (
    <main>
      <section id="quote-box">
        <article>
          <h1 id="text">"{quotes[value].text}"</h1>
          <p id="author">-{quotes[value].author}</p>
        </article>
        <div className="footer">
          <button id="new-quote" onClick={randomQuotes}>
            New Quote
          </button>
          <div>
            <a
              href={`http://twitter.com/intent/tweet?text="${quotes[value].text}" ${quotes[value].author}`}
              target="_blank"
              rel="noopener noreferrer"
              title="share on twitter"
            >
              <AiFillTwitterSquare class="tweet-quote" />
            </a>
            <a
              href={`whatsapp://send?text=${quotes[value].text}" ${quotes[value].author}`}
              data-action="share/whatsapp/share"
              target="_blank"
              title="share on whatsapp"
            >
              <AiOutlineWhatsApp className="tweet-quote" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
