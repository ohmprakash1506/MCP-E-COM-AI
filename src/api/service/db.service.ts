import { Model, ModelStatic, FindOptions, UpdateOptions } from "sequelize";

export default class DBService<T extends Model> {
    private model: ModelStatic<T>;

    constructor(model: ModelStatic<T>) {
        this.model = model;
    }

    async create(data:any): Promise<T> {
        return this.model.create(data);
    }

    async findOne(options: FindOptions): Promise<T | null> {
        return this.model.findOne(options);
    }

    async findAll(options: FindOptions): Promise<T[]> {
        return this.model.findAll(options);
    }

    async update(values: Partial<T>, options: UpdateOptions): Promise<[number]> {
        return this.model.update(values, options);
      }
}