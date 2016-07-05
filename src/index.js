'use strict';

const FindParent = {
  byMatcher(element, func, opts) {
    if (opts === undefined) {
      opts = {};
    }

    if (opts === null || Array.isArray(opts) || typeof opts !== 'object') {
      throw new Error('Expected opts to be an object.');
    }

    if (!element || element === document) {
      if (opts.throwOnMiss) {
        throw new Error('Expected to find parent node, but none was found.');
      }

      return undefined;
    }

    if (func(element)) {
      return element;
    }

    return this.byMatcher(element.parentNode, func, opts);
  },

  byClassName(element, className, opts) {
    return this.byMatcher(element, el => el.classList.contains(className), opts);
  },

  withDataAttribute(element, attName, opts) {
    return this.byMatcher(element, el => el.dataset.hasOwnProperty(attName), opts);
  }
};

module.exports = FindParent;
