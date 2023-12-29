const router = require('koa-router')(),
      {_table_name_} = require('../models');

router.prefix('/api/_table_name_');

router.get('/', async ctx => {
  const { page, limit } = ctx.query;
  ctx.body = await _table_name_.getAllInPage(page, limit);
});

router.post('/', async ctx => {
  const { _field_list_ } = ctx.request.body;
  ctx.body = await _table_name_.add(_field_list_);
});

router.put('/:id', async ctx => {
  const { id } = ctx.params;
  const { _field_list_ } = ctx.request.body;
  ctx.body = await _table_name_.updateByID(id, _field_list_);
});

router.delete('/:id', async ctx => {
  const { id } = ctx.params;
  ctx.body = await _table_name_.deleteByID(id);
});

module.exports = router;
