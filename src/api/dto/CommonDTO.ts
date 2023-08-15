import { ApiProperty } from "@midwayjs/swagger";

// src/api/dto/CommonDTO.ts
export class LoginDTO {
  @ApiProperty({
    example: 'test',
    description: '用户名'
  })
  username: string;
  @ApiProperty({
    example: 'test',
    description: '密码'
  })
  password: string;
}

export class UploadDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'this is file test'
  })
  file: string;
}

