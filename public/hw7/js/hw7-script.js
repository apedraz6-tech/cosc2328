// HW7 – COSC 2328 – Professor McCurry
// Implemented by: Augie Pedraza

// --- PokemonCard Component (7.6) ---
function PokemonCard(props) {
    return (
        <div className="pokemon-card">
            <img
                src={"https://placehold.co/150x150/4FC3F7/333333?text=" + props.name}
                alt={props.name}
            />
            <h3>{props.name}</h3>
            <p className="letters">{props.name.length} letters</p>
        </div>
    );
}

// --- PokemonRoster Component (7.7) ---
function PokemonRoster(props) {
    return (
        <div className="pokemon-roster">
            {props.pokemon.map(function (p) {
                return <PokemonCard key={p.name} name={p.name} />;
            })}
        </div>
    );
}

// --- App Component (7.8) ---
function App(props) {
    return (
        <div>
            <div className="header">
                <h1>PokeRoster</h1>
                <p>{`Showing ${props.roster.length} short-named Pokemon, shortest name first`}</p>
            </div>
            <PokemonRoster pokemon={props.roster} />
        </div>
    );
}

// --- Fetch, process, and render (7.3, 7.4, 7.5, 7.8, 7.9) ---
async function loadRoster() {
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");

        if (!response.ok) {
            throw new Error("Request failed with status " + response.status);
        }

        const data = await response.json();

        // 7.4 — keep only names that are 6 characters or fewer
        const shortNamed = data.results.filter(function (p) {
            return p.name.length <= 6;
        });

        // 7.5 — sort shortest name first
        const sortedArray = shortNamed.sort(function (a, b) {
            return a.name.length - b.name.length;
        });

        // 7.8 — render only after the data exists
        const root = ReactDOM.createRoot(document.querySelector("#root"));
        root.render(<App roster={sortedArray} />);
    } catch (error) {
        // 7.9 — friendly fallback message
        document.querySelector("#root").innerHTML =
            '<p class="error-message">Sorry, we couldn\'t load the Pokemon roster right now. Please check your connection and try again later.</p>';
    }
}

loadRoster();
