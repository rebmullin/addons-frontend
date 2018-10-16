import * as React from 'react';

import SearchContextCard, {
  SearchContextCardBase,
} from 'amo/components/SearchContextCard';
import { searchStart } from 'core/reducers/search';
import {
  dispatchClientMetadata,
  dispatchSearchResults,
  fakeAddon,
  fakeI18n,
  shallowUntilTarget,
} from 'tests/unit/helpers';
import {
  ADDON_TYPE_EXTENSION,
  ADDON_TYPE_DICT,
  ADDON_TYPE_LANG,
  ADDON_TYPE_THEMES_FILTER,
} from 'core/constants';

describe(__filename, () => {
  let _store;

  function render(customProps = {}) {
    const props = {
      store: _store,
      ...customProps,
    };

    return shallowUntilTarget(
      <SearchContextCard i18n={fakeI18n()} {...props} />,
      SearchContextCardBase,
    );
  }

  function _searchStart(props = {}) {
    _store.dispatch(searchStart({ errorHandlerId: 'Search', ...props }));
  }

  beforeEach(() => {
    _store = dispatchClientMetadata().store;
  });

  it('should render a card', () => {
    const root = render();

    expect(root).toHaveClassName('SearchContextCard');
  });

  it('should render "searching" while loading without query', () => {
    _searchStart({ filters: {} });
    const root = render();

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      'Loading add-ons',
    );
  });

  it('should render during a search that is loading', () => {
    _searchStart({ filters: { query: 'test' } });
    const root = render();

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      'Searching for "test"',
    );
  });

  it('should render search results', () => {
    const { store } = dispatchSearchResults();
    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found for "test"',
    );
  });

  it('should render results that lack a query', () => {
    const { store } = dispatchSearchResults({ filters: {} });
    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found',
    );
  });

  it('should use singular form when only one result is found', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
    });
    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found for "test"',
    );
  });

  it('should use singular form without query when only one result', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {},
    });
    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found',
    );
  });

  it('should render empty results', () => {
    const { store } = dispatchSearchResults({ addons: [], filters: {} });
    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '0 results found',
    );
  });

  it('should render singular form when only one result is found with addonType ADDON_TYPE_THEMES_FILTER', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 theme found for "test"',
    );
  });

  it('should render plural form when multiple results are found with addonType ADDON_TYPE_THEMES_FILTER', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 themes found for "test"',
    );
  });

  it('should render results with category and query for addonType ADDON_TYPE_THEMES_FILTER', () => {
    const category = 'bookmarks';
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
        category,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 theme found for "test" in bookmarks',
    );
  });

  it('should render results with category without hyphens for addonType ADDON_TYPE_THEMES_FILTER', () => {
    const category = 'fun-bookmarks';
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
        category,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 theme found in fun bookmarks',
    );
  });

  it('should render results with category and no query if not provided for addonType ADDON_TYPE_THEMES_FILTER', () => {
    const category = 'fun-bookmarks';
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
        category,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 theme found in fun bookmarks',
    );
  });

  it('should render results without category or query when not provided for addonType ADDON_TYPE_THEMES_FILTER', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_THEMES_FILTER,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 theme found',
    );
  });

  it('should render singular form when only one result is found with addonType ADDON_TYPE_DICT', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_DICT,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found for "test"',
    );
  });

  it('should render plural form when multiple results are found with addonType ADDON_TYPE_DICT', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: ADDON_TYPE_DICT,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found for "test"',
    );
  });

  it('should render results without query when not provided for addonType ADDON_TYPE_DICT', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_DICT,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found',
    );
  });

  it('should render singular form when only one result is found with addonType ADDON_TYPE_EXTENSION', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_EXTENSION,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 extension found for "test"',
    );
  });

  it('should render plural form when multiple results are found with addonType ADDON_TYPE_EXTENSION', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: ADDON_TYPE_EXTENSION,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 extensions found for "test"',
    );
  });

  it('should render results with category without hyphens for addonType ADDON_TYPE_EXTENSION', () => {
    const category = 'fun-bookmarks';
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_EXTENSION,
        category,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 extension found in fun bookmarks',
    );
  });

  it('should render results with category and no query if not provided for addonType ADDON_TYPE_EXTENSION', () => {
    const category = 'fun-bookmarks';
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_EXTENSION,
        category,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 extension found in fun bookmarks',
    );
  });

  it('should render results without category or query when not provided for addonType ADDON_TYPE_EXTENSION', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_EXTENSION,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 extension found',
    );
  });

  it('should render singular form when only one result is found with addonType ADDON_TYPE_LANG', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_LANG,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found for "test"',
    );
  });

  it('should render plural form when multiple results are found with addonType ADDON_TYPE_LANG', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: ADDON_TYPE_LANG,
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found for "test"',
    );
  });

  it('should render results without query when not provided for addonType ADDON_TYPE_LANG', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: ADDON_TYPE_LANG,
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found',
    );
  });

  it('should render singular form when only one result is found with addonType does not exist', () => {
    const { store } = dispatchSearchResults({
      addons: { [fakeAddon.slug]: fakeAddon },
      filters: {
        addonType: 'random',
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '1 result found for "test"',
    );
  });

  it('should render plural form when multiple results are found for an addonType that does not exist', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: 'random',
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found for "test"',
    );
  });

  it('should render plural form when multiple results are found for an addonType that does not exist', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: 'random',
        query: 'test',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found for "test"',
    );
  });

  it('should render results without query when not provided for addonType that does not exist', () => {
    const { store } = dispatchSearchResults({
      filters: {
        addonType: 'random',
      },
    });

    const root = render({ store });

    expect(root.find('.SearchContextCard-header')).toIncludeText(
      '2 results found',
    );
  });
});
