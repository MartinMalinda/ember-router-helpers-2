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

  cleanURL(url) {
    const urlWithoutRoot = removeRoot(url, this.get('router.rootURL'));
    const urlWithoutQP = urlWithoutRoot.split('?')[0];
    return urlWithoutQP;
  },

  compute(params) {

    if(!resemblesURL(params[0])) {
      return this.get('router').isActive(...params);
    } else {
      const cleanURL = this.cleanURL(params[0]);
      return this.get('router.currentURL').indexOf(cleanURL) === 0;
    }
  }
});
