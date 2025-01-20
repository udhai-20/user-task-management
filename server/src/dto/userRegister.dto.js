const { IsEmail, IsString, MinLength, MaxLength } = require('class-validator');

class UserRegisterDTO {
  @IsEmail()
  email;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password;
}

module.exports = RegisterDTO;
