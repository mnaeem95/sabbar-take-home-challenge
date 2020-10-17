import * as mongoose from 'mongoose';

export class BaseRepo<E> {
  protected readonly model: mongoose.Model<E & mongoose.Document, {}> = null;

  constructor(model: mongoose.Model<E & mongoose.Document, {}>) {
    this.model = model;
  }

  get = async (conditions: any, projection?: any): Promise<E> => {
    const entity: E = await this.model.findOne(conditions, projection).lean();
    return entity;
  };

  getById = async (_id: string): Promise<E> => {
    const entity: E = await this.model.findById(_id).lean();
    return entity;
  };

  getAll = async (): Promise<E[]> => {
    const entities: E[] = await this.model.find({}).lean();
    return entities;
  };

  save = async <D>(dto: D, session?: mongoose.ClientSession): Promise<E> => {
    const newEntity = new this.model(dto);
    const savedEntity: E = await newEntity
      .save({
        ...(session && { session }),
      })
      .then(doc => doc.toObject());

    return savedEntity;
  };

  update = async <D>(_id: string, dto: D, session?: mongoose.ClientSession): Promise<E> => {
    const updatedEntity: E = await this.model
      .findByIdAndUpdate(_id, dto, {
        new: true,
        ...(session && { session }),
      })
      .lean();

    return updatedEntity;
  };

  deleteMany = async <D>(conditions: object): Promise<number> => {
    const deleteEntities = await this.model.deleteMany(conditions).lean();
    const { deletedCount } = deleteEntities;
    return deletedCount;
  };
}
