import 'tsconfig-paths/register';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '@routes/auth';
import memberRoutes from '@routes/members';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/members', memberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
