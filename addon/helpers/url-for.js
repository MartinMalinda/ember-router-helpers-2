import Ember from 'ember';

const { inject } = Ember;

export const restructureQP = allParams => {
  let routeParams = allParams.concat();
  const last = allParams.length - 1;
  const maybeQP = allParams[last];
  if(maybeQP && maybeQP.values) {
    routeParams[last] = {
      queryParams: maybeQP.values
    }
  }
  return routeParams;
};

export default Ember.Helper.extend({
  router: inject.service(),

  compute(params) {
    if (!this.get('router.currentRouteName')) {
      // there is no routing state, this is probably an integration test
      return '';
    }

    const routeParams = restructureQP(params);
    return this.get('router').urlFor(...routeParams);
  }
});
