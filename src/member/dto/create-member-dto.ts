import { IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  lineName: string;
}
