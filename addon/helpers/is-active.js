import Ember from 'ember';
import { removeRoot } from './transition';

const { inject, observer } = Ember;

function resemblesURL(str) {
  return typeof str === 'string' && (str === '' || str[0] === '/');
}

export default Ember.Helper.extend({
  router: inject.service(),

  currentURLObserver: observer('router.currentURL', function() {
    this.recompute();
  }),

  compute(params, hash) {

    if(!resemblesURL(params[0])) {
      return this.get('router').isActive(...params);
    } else {
      const [ url ] = params;
      const urlWithoutRoot = removeRoot(url, this.get('router.rootURL'));
      return urlWithoutRoot.indexOf(this.get('router.currentURL')) === 0;
    }
  }
});
