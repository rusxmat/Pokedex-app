import express from "express";
import axios from "axios";

const port = process.env.PORT || 3001;

// initialize the server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, Accept, Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });


app.get('/pokemon', async (req, res) => {
    const sort = req.query.sort
    const order = req.query.order
    const searchquery = req.query.searchquery
    const limit = parseInt(req.query.limit, 10) || 10000
    const offset = parseInt(req.query.offset) || 0

    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=10000`);
        var pokemonList = await response.data.results

        if(searchquery){
            const filteredPokemonList = await pokemonList.filter((pokemon) => {
                const lowercaseName = pokemon.name.toLowerCase();
                const lowercaseQuery = searchquery.toLowerCase();

                //checks for the id, url is filtered through regex
                const regex = /\/(\d+)\/$/;
                const match = pokemon.url.match(regex);
                const id = match ? match[1] : null;

                return lowercaseName.includes(lowercaseQuery) || id.includes(lowercaseQuery);
            });

            pokemonList = filteredPokemonList
        }

        if(sort === 'name'){
            await pokemonList.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
        }

        if(order === 'desc'){
            await pokemonList.reverse();
        }

        res.json(pokemonList.slice(offset, offset+limit));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// start server
app.listen(port, (err) => {
  if (err) { console.log(err); }
  else { console.log(`Server listening at port ${port}`); }
});