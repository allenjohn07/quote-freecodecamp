function APP() {

    const [quotes, setQuotes] = React.useState([]);
    const [randomQuote, setRandomQuote] = React.useState("");
    const [color, setColor] = React.useState("");

    const colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
    ]

    React.useEffect(() => {
        async function fetchData() {
            const response = await fetch("https://type.fit/api/quotes")
            const data = await response.json()
            setQuotes(data);

            let randIndex = Math.floor(Math.random() * data.length);
            let randColorIndex = Math.floor(Math.random() * colors.length);
            setRandomQuote(data[randIndex])
            setColor(colors[randColorIndex])

        }
        fetchData()
    }, [])

    const newQuote = () => {

        let randIndex = Math.floor(Math.random() * quotes.length);
        let randColorIndex = Math.floor(Math.random() * colors.length);
        setRandomQuote(quotes[randIndex])
        setColor(colors[randColorIndex])
    }

    return (
        <div style={{ backgroundColor: color, minHeight: "100vh" }}>
            <div className="container pt-5">
                <div className="jumbotron">
                    <div className="card">
                        <div className="card-header">Quote for the day!</div>
                        <div className="card-body">
                            {randomQuote ? (
                                <>
                                    <p className="card-text"><i class="fa-solid fa-quote-left"></i> {randomQuote.text}</p>
                                    <h5 className="card-title">-{randomQuote.author.split(",")[0] || "No Author"}</h5>
                                </>

                            ) : (
                                <h4>Loading..</h4>
                            )}

                            <div className="Row">
                                <button onClick={newQuote} style={{ width: 'auto' }} className="btn btn-primary">New Quote</button>
                                <a className="btn btn-warning mx-2" target="_blank" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
                                    encodeURIComponent('"' + randomQuote.text + '" ' + randomQuote.author)}><i class="fa-brands fa-twitter"></i></a>
                                <a className="btn btn-danger" target="_blank" href={'https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' +
                                    encodeURIComponent(randomQuote.author) +
                                    '&content=' +
                                    encodeURIComponent(randomQuote.text) +
                                    '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button'}><i class="fa-brands fa-tumblr"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(<APP />, document.getElementById("app"))