import app from './utils/app';

describe('Articles', () => {
  it('should list all articles', async () => {
    const { body } = await app.get('/articles');

    expect(body.articles).toEqual('All articles');
  });

  it('should get one article', async () => {
    const { body } = await app.get('/articles/6');

    expect(body.articles).toEqual('Article 6');
  });

  it('should create an article', async () => {
    const { body } = await app.post('/articles');

    expect(body.articles).toEqual('Created article');
  });

  it('should update an article', async () => {
    const { body } = await app.put('/articles/14');
    expect(body.articles).toEqual('Updated article 14');
  });

  it('should delete an article', async () => {
    const { body } = await app.delete('/articles/2');
    expect(body.articles).toEqual('Deleted article 2');
  });
});
