const express = require('express');
const app = express();
const path = require('path');
const { conn, seed, Product } = require('./db');


app.use('/public', express.static('public'));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


app.get('/api/products', (req, res, next) => {
	Product.findAll()
		.then(products => res.send(products))
		.catch(next)
})

app.put('/api/products/:id', (req, res, next) => {
	Product.findByPk(req.params.id)
		.then(product => product.update(req.body))
		.then(product => res.send(product))
		.catch(next)
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(err);
});

const init = async() => {
	try {
		await conn.sync({force: true})
		await seed()
		const port = process.env.PORT || 8001;

		app.listen(port, ()=> console.log(`listening on port ${port}`));
	} catch (error) {
		console.log(error)
	}
}

init()
