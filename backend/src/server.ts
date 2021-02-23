import app from './app';

const prod = process.env.NODE_ENV === 'production';

const PORT = prod ? 80 : 4000;

app.listen(4000, () => {
  console.log(`server is running on port ${PORT}`);
});
