import mongoose from 'mongoose';
require('dotenv').config();
const connectDb = async () => {
	try {
		await mongoose.connect(
			// development
			`mongodb+srv://mi477048:${process.env.DB_PASSWORD}@cluster0.mhj3wka.mongodb.net/`,
			// production
			// `mongodb+srv://muhammadismail:${process.env.DB_PASSWORD}@cluster0.op0njnj.mongodb.net/`,
			// `mongodb://muhammadismail:${process.env.DB_PASSWORD}@ac-iqgk8jh-shard-00-00.op0njnj.mongodb.net:27017,ac-iqgk8jh-shard-00-01.op0njnj.mongodb.net:27017,ac-iqgk8jh-shard-00-02.op0njnj.mongodb.net:27017/?replicaSet=atlas-i6hpa7-shard-0&ssl=true&authSource=admin`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			} as Parameters<typeof mongoose.connect>[1]
		);
		console.log('MongoDb is connected');
	} catch (error: any) {
		console.log(error.message);
	}
};

export default connectDb;
