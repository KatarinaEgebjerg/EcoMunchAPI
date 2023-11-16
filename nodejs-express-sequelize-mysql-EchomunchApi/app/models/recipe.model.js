module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("recipes", {
      recipename: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      ingredientmeasurements: {
        type: Sequelize.STRING
      },
      instructions: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Recipe;
  };