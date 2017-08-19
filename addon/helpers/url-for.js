import Ember from 'ember';

const { inject } = Ember;

export default Ember.Helper.extend({
  router: inject.service(),

  compute(params) {
    const last = params.length - 1;
    const lastParam = params[last];
    let routeParams = params.concat();

    if(lastParam && lastParam.values) {
      routeParams[last] = {
        queryParams: lastParam.values
      }
    }

    return this.get('router').urlFor(...routeParams);
  }
});
