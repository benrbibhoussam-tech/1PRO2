import { factories } from '@strapi/strapi';
 
export default factories.createCoreController('api::board.board', ({ strapi }) => ({
 
  async find(ctx) {
    const user = ctx.state.user as any;
    if (!user) return ctx.unauthorized('You must be logged in');
 
    const boards = await strapi.entityService.findMany('api::board.board', {
      filters: { Owner: user.id },
      populate: ['Owner'],
    });
 
    return boards;
  },
 
  async update(ctx) {
    const user = ctx.state.user as any;
    const { id } = ctx.params;
 
    const board = await strapi.entityService.findOne('api::board.board', id, {
      populate: ['Owner'],
    }) as any;
 
    if (!board || !board.owner || board.owner.id !== user.id) {
      return ctx.forbidden('Not allowed');
    }
 
    return await strapi.entityService.update('api::board.board', id, {
      data: ctx.request.body.data,
    });
  },
 
  async delete(ctx) {
    const user = ctx.state.user as any;
    const { id } = ctx.params;
 
    const board = await strapi.entityService.findOne('api::board.board', id, {
      populate: ['Owner'],
    }) as any;
 
    if (!board || !board.owner || board.owner.id !== user.id) {
      return ctx.forbidden('Not allowed');
    }
 
    return await strapi.entityService.delete('api::board.board', id);
  },
 
}));