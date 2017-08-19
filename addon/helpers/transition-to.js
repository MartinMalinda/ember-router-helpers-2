import Ember from 'ember';
import { restructureQP } from './url-for';


const { inject } = Ember;

export const removeRoot = (url, rootURL) => {
  return url.substr(rootURL.length - 1);
}

export default Ember.Helper.extend({
  router: inject.service(),

  _makeAction(cb) {
    // Stolen from https://github.com/DockYard/ember-route-action-helper/blob/master/addon/-private/internals.js
    let ClosureActionModule;

    if ('ember-htmlbars/keywords/closure-action' in Ember.__loader.registry) {
      ClosureActionModule = Ember.__loader.require('ember-htmlbars/keywords/closure-action');
    } else if ('ember-routing-htmlbars/keywords/closure-action' in Ember.__loader.registry) {
      ClosureActionModule = Ember.__loader.require('ember-routing-htmlbars/keywords/closure-action');
    } else {
      ClosureActionModule = { };
    }

    cb[ClosureActionModule.ACTION] = true;

    return cb;
  },

  compute(params, { replace }) {

    const transitionFn = replace ? this.get('router').replaceWith.bind(this.get('router')) :
                                   this.get('router').transitionTo.bind(this.get('router'));

    return this._makeAction(event => {
      event.preventDefault();

      if (!params.length) {
        const target = event.target;
        if(target) {
          const url = removeRoot(target.getAttribute('href'), this.get('router.rootURL'));
          transitionFn(url);
        }
      } else {
        const routeParams = restructureQP(params);
        transitionFn(...routeParams);
      }
    });
  }
});