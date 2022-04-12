import { Schema, model } from 'mongoose';

const linksSchema = new Schema({
	entity: { type: String, required: true },
	url: { type: String, required: true },
	order: { type: Number, required: true }
});

const clientSchema = new Schema({
	createdAt: { type: Date, required: true, default: Date.now },
	name: { type: String, required: true, unique: true, index: true },
	image: { type: String, required: true },
	links: [linksSchema]
});

export default model('Client', clientSchema);
