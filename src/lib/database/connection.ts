import { connect } from 'mongoose';

const MONGO_URI = `mongodb+srv://test:${
	import.meta.env.VITE_DB_PASS
}@gtf-cluster.g8qiq.mongodb.net/liliDatabase?retryWrites=true&w=majority`;

connect(MONGO_URI)
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('Could not connect to MongoDB', err));
