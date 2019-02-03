import {Document, Model as MongooseModel} from "mongoose";

export default abstract class MongoQueryBase<D extends Document, T extends MongooseModel<D>> {
    protected constructor(public Model: T) {
    }

    public async findById(id: string): Promise<D> {
        return await this.Model.findById(id);
    }

    public async count(conditions: any = {}): Promise<number> {
        return await this.Model.count(conditions).exec();
    }

    public async findOne(conditions: any = {}): Promise<D> {
        return await this.Model.findOne(conditions);
    }

    public async findMany(conditions: any = {}): Promise<D[]> {
        return await this.Model.find(conditions);
    }
}
