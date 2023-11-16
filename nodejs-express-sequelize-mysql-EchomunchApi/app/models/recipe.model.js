module.exports = (sequelize, Sequelize) => {
    const Recipe = sequelize.define("tutorial", {
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
  
    return Tutorial;
  };