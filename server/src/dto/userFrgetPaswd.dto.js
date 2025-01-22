 const UserFrgetPaswdDTO = {
    email: { type: "string", required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/ }, //example@domain.com//
   
  };
  
  module.exports = UserFrgetPaswdDTO;