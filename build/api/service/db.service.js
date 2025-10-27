"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DBService {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        return this.model.create(data);
    }
    async findOne(options) {
        return this.model.findOne(options);
    }
    async findAll(options) {
        return this.model.findAll(options);
    }
    async update(values, options) {
        return this.model.update(values, options);
    }
}
exports.default = DBService;
