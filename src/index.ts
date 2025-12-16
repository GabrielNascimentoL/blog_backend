import 'dotenv/config';
import app from './server';

const PORT = Number(process.env.PORT);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
