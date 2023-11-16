module.exports = app => {
    const recipe = require("../controllers/recipe.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", recipe.create);
  
    // Retrieve all Tutorials
    router.get("/", recipe.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", recipe.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", recipe.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", recipe.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", recipe.delete);
  
    // Create a new Tutorial
    router.delete("/", recipe.deleteAll);
  
    app.use('/api/recipes', router);
  };