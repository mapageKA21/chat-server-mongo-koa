'use strict';

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    "content": { type : String},
    "timestamp": { type : Number}
});

mongoose.model('Message', messageSchema);

  // const Message = sequelize.define('Message', {
  //   timestamp: DataTypes.BIGINT,
  //   content: DataTypes.TEXT
  // }, {
  // 	timestamps: false,
  // 	classMethods: {
  // 	  associate: function (models) {
  // 	  	Message.belongsTo(models.User, {
  // 	  	  onDelete: "CASCADE",
  // 	  	  foreignKey: {
  // 	  	  	allowNull: true
  // 	  	  }
  // 	  	});
  // 	  }
  // 	}
  // });
