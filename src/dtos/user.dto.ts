import { IsString, IsOptional, IsMongoId, IsNumber, Min, Max, IsArray } from 'class-validator';

class UserDto {
  @IsString()
  name: string;

  @IsNumber()
  locationLatitude: number;

  @IsNumber()
  locationLongitude: number;

  @IsOptional()
  @IsNumber()
  numberOfRides: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
}

class UpdateUserDto extends UserDto {
  @IsMongoId()
  _id: string;
}

class DeleteUsersDto {
  @IsArray()
  userIds: string[];
}

export { UserDto, UpdateUserDto, DeleteUsersDto };
