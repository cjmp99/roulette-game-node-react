import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import 'module-alias/register';
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
const app = express();

//routes
import auth from './routes/auth'
import users from './routes/users'

dotenv.config();

//settings
app.set('port', process.env.PORT || 80);

// middlewares
app.use(express.json());
initializeApp({
    credential: applicationDefault()
});
export const db = getFirestore();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH,  DELETE"
    );
    res.header("Allow", "GET, POST, OPTIONS, PATCH, DELETE");
    app.use(cors());
    next();
});

//routes
app.use('/api', auth)
app.use('/api', users)
app.use('/', express.static(path.join(__dirname, '../dist/public')))

export default app;