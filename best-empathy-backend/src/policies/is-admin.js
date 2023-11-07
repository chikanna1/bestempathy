module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user.isAdmin) {
    return true;
  }
  return 401;
};
