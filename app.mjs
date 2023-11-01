import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import mongoose from 'mongoose'
import argon2 from 'argon2'
import './db.mjs'
import session from 'express-session'

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(process.env.PORT || 3000);
