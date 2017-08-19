import Ember from 'ember';
import { restructureQP } from './url-for';

const { inject } = Ember;

export const removeRoot = (url, rootURL) => {
  return url.substr(rootURL.length - 1);
}

export default Ember.Helper.extend({
  router: inject.service(),

  compute(params, { replace }) {

    const transitionFn = replace ? this.get('router').replaceWith.bind(this.get('router')) :
                                   this.get('router').transitionTo.bind(this.get('router'));

    return event => {

      if(event) {
        event.preventDefault();
      }

      if (!params.length) {

        Ember.assert('Empty {{transition-to}} usage requires to be passed to event handling attribute (onclick, onmouseover...)', event);

        const target = event.target;
        if(target) {
          const url = removeRoot(target.getAttribute('href'), this.get('router.rootURL'));
          transitionFn(url);
        }
      } else {
        const routeParams = restructureQP(params);
        transitionFn(...routeParams);
      }
    };
  }
});
