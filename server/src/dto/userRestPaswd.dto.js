const UserRestPaswdDTO = {
    password: { type: "string", required: true, minLength: 6, maxLength: 20 },
   
  };
  
  module.exports = UserRestPaswdDTO;