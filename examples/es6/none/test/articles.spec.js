import app from './testUtils/app';

describe('Articles', () => {
  it('should list all articles', async () => {
    const { body } = await app.get('/articles');

    expect(body.articles).toEqual('All articles');
  });

  it('should get one article', async () => {
    const { body } = await app.get('/articles/6');

    expect(body.article).toEqual('Article 6');
  });

  it('should create an article', async () => {
    const { body } = await app.post('/articles').send({ title: 'foo' });

    expect(body.message).toEqual('Created article foo');
  });

  it('should update an article', async () => {
    const { body } = await app.put('/articles/14');

    expect(body.message).toEqual('Updated article 14');
  });

  it('should delete an article', async () => {
    const { body } = await app.delete('/articles/2');

    expect(body.message).toEqual('Deleted article 2');
  });
});
