import app from './app';

const prod = process.env.NODE_ENV === 'production';

const PORT = prod ? 80 : 4000;

app.listen(PORT, () => {
  console.log('server is running on port 4000');
});
