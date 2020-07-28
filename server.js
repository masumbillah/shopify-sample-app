require('isomorphic-fetch');
const dotenv = require('dotenv');
const Koa = require('koa');
const koaRouter = require("koa-router");
const koaBody = require('koa-body');
const next = require('next');
const { default: createShopifyAuth } = require('@shopify/koa-shopify-auth');
const { verifyRequest } = require('@shopify/koa-shopify-auth');
const session = require('koa-session');

dotenv.config();
const { default: graphQLProxy } = require('@shopify/koa-shopify-graphql-proxy');
const { ApiVersion } = require('@shopify/koa-shopify-graphql-proxy');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env;

const server = new Koa();
const router = new koaRouter();

var products = [
  {
    "name": "product 1",
    "images1": "Image1"
  },
  {
    "name": "product 2",
    "images1": "Image1"
  }
];

//Router 
router.get('/api/products', async (ctx) => {
  try {
    ctx.body = {
      status: 'success',
      data: products
    }
  } catch (error) {
    console.log("Product fetch error: ", error);
  }
});

router.post('/api/products', koaBody(), async (ctx) => {
  try {
   const bodyData = ctx.request.body;

   products.push(bodyData);

  } catch (error) {
    console.log("Product fetch error: ", error);
  }
});

  //Router midleware
  server.use(router.allowedMethods());
  server.use(router.routes());

app.prepare().then(() => {

  server.use(session(server));
  server.keys = [SHOPIFY_API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: [
        'read_products',
        'write_products',
        'read_script_tags',
        'write_script_tags'
      ],
      afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });
        ctx.redirect('/');
      },
    }),
  );

  server.use( graphQLProxy({version: ApiVersion.April20}) );
  server.use(verifyRequest());

  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
    return
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

});