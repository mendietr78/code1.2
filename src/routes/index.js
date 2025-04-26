const express = require ('express');
const router = express.Router();
const Cod = require ('../models/codi.js');
const Cat = require ('../models/cate.js');
const mongoose = require ('mongoose')

router.get('/', (req, res, next) =>
{
        res.render('home');
});

router.get('/newcat', async (req, res, next) =>{
  const cats = await Cat.find();
    console.log(cats);
    res.render("cat", { cats });
  });

router.get('/new', async (req, res, next) =>{
const cats = await Cat.find();
  console.log(cats);
  res.render("db", { cats });
});


router.get("/db", async (req, res) =>
{
    const data = await Cod.find();
    
    res.render("dbs", {data});
});

router.get("/db/:ca0", async (req, res) =>
{   const { ca0 } = req.params;
    const data = await Cod.find({ca0});
    console.log(data);
    res.render("dbs", {data});
});

router.post("/dbs/submit", async (req, res) =>
{   
    const cods = new Cod(req.body);
    await cods.save();
    res.redirect("/db");
});

router.get("/db/edit/:id", async (req, res) =>
{
    const {id} = req.params;
    const data = await Cod.findById(id);
    res.render("edit", {data});
});

router.get("/db/view/:id", async (req, res) =>
{
    const {id} = req.params;
    const data = await Cod.findById(id);
    res.render("dbviewer", {data});
});

router.get("/db/delete/:id", async (req, res) =>
{
    const {id} = req.params;
    const data = await Cod.deleteOne({_id: id});
    res.redirect("/db");
});

router.post('/db/submit', (req, res) => {
    const bd1 = req.body.db1; 
    const URI ='mongodb+srv://' + bd1 +
      ':HHnOQn2B4iVtEdOU@cluster0.pgfsbij.mongodb.net/code2?retryWrites=true&w=majority';
      console.log(bd1)
      mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
        .then(() => {
          console.log("Conexión exitosa a la base de datos");
        })
        .catch(error => {
          console.log("Error al conectar a la base de datos:", error);
        });
        res.redirect("/cat");
    
  });

  router.post("/db/update/:id", async (req, res) =>
{
    const {id} = req.params;
    await Cod.updateOne({_id: id}, req.body);
    res.redirect("/cat");
});

router.get("/cat", async (req, res) => {
  const cats = await Cat.find();
  console.log(cats);
  res.render("cats", { cats });
});

router.post("/cat/submit", async (req, res) => {
  console.log(new Cat(req.body));
  const cats = new Cat(req.body);
  await cats.save();
  res.redirect("/cat/");
});

router.post("/cat/update/:id", async (req, res) => {
  const { id } = req.params;
  await Cat.updateOne({ _id: id }, req.body);
  res.redirect("/cat");
});

router.get("/cat/edit/:id", async (req, res) => {
  const { id } = req.params;
  const cats = await Cat.findById(id);
  res.render("catedit", { cats });
});

router.get("/cat/delete/:id", async (req, res) => {
  const { id } = req.params;
  const cats = await Cat.deleteOne({ _id: id });
  res.redirect("/cat/");
});

router.get("/db/:id", async (req, res) => {
  const { id } = req.params;
  const cats = await Cat.findById(id);
  res.render("db", { cats });
});


module.exports = router