"use strict";

/**
 *  note controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::profile.profile", ({ strapi }) => ({
  async findOwnProfile(ctx) {
    const { filters } = ctx.query;
    ctx.query = {
      ...ctx.query,
      filters: {
        ...filters,
        author: {
          id: ctx.state.user.id,
        },
      },
    };
    return await super.find(ctx);
  },

  async create(ctx) {
    const profileData = await this.findOwnProfile(ctx);

    if (profileData.meta.pagination.total >= 1) {
      console.log("User Already Has Profile Created");
      return;
    } else {
      return await super.create(ctx);
    }
  },
}));
