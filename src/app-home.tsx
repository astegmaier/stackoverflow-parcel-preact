/** @jsx h */
import {
    autocomplete,
    AutocompleteComponents,
    getAlgoliaResults,
  } from '@algolia/autocomplete-js';
  
  import algoliasearch from 'algoliasearch';
  import { h, Fragment } from 'preact';
  
  
  
  const appId = 'theappid';
  const apiKey = 'theapikey';
  const searchClient = algoliasearch(appId, apiKey);
  
  
  /* const querySuggestionsPlugin = createQuerySuggestionsPlugin({
    searchClient,
    indexName: 'database_query_suggestions',
    getSearchParams() {
      return {
        hitsPerPage: 5,
      };
    },
    
  }); */
  
  
  
  autocomplete({
    // debug: true,
    container: '#autocomplete',
    placeholder: 'Escribe aquí, sin miedo',
    openOnFocus: false,
    defaultActiveItemId: 0,
    autoFocus: true,
    getSources({ query }) {
  
      return [
        {
          sourceId: 'plantag',
          getItemUrl({ item }) {
            return item.url;
          },
          getItems() {
            return getAlgoliaResults({
              searchClient,
              queries: [
                {
                  indexName: 'database',
                  query,
                  params: {
                    hitsPerPage: 10,
                    clickAnalytics: true,
                    attributesToSnippet: [
                      'name:10',
                      'nombre'
                    ],
                    snippetEllipsisText: '…',
                  },
                },
              ],
            });
          },
          templates: {
            item({ item, components }) {
              return <ProductItem hit={item} components={components} />;
            },
            noResults() {
              return 'No hay plantas coincidentes :(';
            },
          },
        },
      ];
      
    },
      // Default Navigator API implementation
      navigator: {
        navigate({ itemUrl }) {
          window.location.assign(itemUrl);
        },
        navigateNewTab({ itemUrl }) {
          const windowReference = window.open(itemUrl, '_blank', 'noopener');
    
          if (windowReference) {
            windowReference.focus();
          }
        },
        navigateNewWindow({ itemUrl }) {
          window.open(itemUrl, '_blank', 'noopener');
        },
      },
  
  });
  
  function ProductItem({ hit, components }: ProductItemProps) {
    return (
    <div className="c-single-result">
      <a href={hit.url} className="aa-ItemLink">
        <div className="l-flex-container">
          <div className="aa-ItemContent">
            <div className="aa-ItemContentBody">
              <div className="aa-ItemContentTitle">
                <components.Snippet hit={hit} attribute="nombre" />
              </div>
            </div>
            <div className="aa-ItemContentSubtitle">
                  <components.Snippet hit={hit} attribute="name" />
            </div>
            <div className="aa-ItemActions">
              <button
                className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
                type="button"
                title="Select"
                style={{ pointerEvents: 'none' }}
              >
                <svg viewBox="0 0 30 27" width="30" height="27" fill="currentColor">
                <path d="M10.0611 23.8881C10.6469 24.4606 10.6469 25.389 10.0611 25.9615C9.47533 26.5341 8.52558 26.5341 7.9398 25.9615L0.441103 18.632C0.4374 18.6284 0.433715 18.6248 0.430051 18.6211C0.164338 18.3566 0.000457764 17.994 0.000457764 17.594C0.000457764 17.3952 0.0409356 17.2056 0.114276 17.0328C0.187475 16.8598 0.295983 16.6978 0.439798 16.5572L7.9398 9.22642C8.52558 8.65385 9.47533 8.65385 10.0611 9.22642C10.6469 9.79899 10.6469 10.7273 10.0611 11.2999L5.12178 16.1278H13.5005C20.9565 16.1278 27.0005 10.2202 27.0005 2.93233V1.46616C27.0005 0.656424 27.672 -1.90735e-06 28.5005 -1.90735e-06C29.3289 -1.90735e-06 30.0005 0.656424 30.0005 1.46616V2.93233C30.0005 11.8397 22.6134 19.0602 13.5005 19.0602H5.12178L10.0611 23.8881Z"/>
                </svg>
              </button>
  
            </div>
          </div>
  
  
          <div className="aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop">
              <img src={hit.image} alt={hit.name} width="40" height="40" />
          </div>
        </div>
      </a>
    </div>
    );
  
    
  }