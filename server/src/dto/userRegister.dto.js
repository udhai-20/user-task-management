
const UserRegisterDTO = {
  name:{type:"string",required:true},
  email: { type: "string", required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/ }, //example@domain.com//
  password: { type: "string", required: true, minLength: 6, maxLength: 20 },
};

module.exports = UserRegisterDTO;