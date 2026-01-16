export class TrainerResponseDto {
  readonly id!: string;
  readonly fullName!: string;

  static fromEntity(entity: any): TrainerResponseDto {
    return {
      id: entity.Id,
      fullName: entity.FullName
    };
  }
}
