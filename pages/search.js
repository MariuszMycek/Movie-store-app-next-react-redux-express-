import React from 'react';
import Content from '../components/Layout/Content';
import Header from '../components/Layout/Header/index';
import Footer from '../components/Layout/Footer';
import Container from '../components/Layout/Container';
import {
  MultiList,
  DataSearch,
  MultiDataList,
  RangeSlider,
  ReactiveList
} from '@appbaseio/reactivesearch';
import ProductCard from '../components/Product/ProductCard';
import { css } from '@emotion/core';

const searchCls = css`
  .dataSearch {
  }
  .input {
    padding-left: 35px;
    & + div div {
      top: calc(50% - 10px);
    }
  }
  .resultList {
    display: flex;
    flex-wrap: wrap;
    max-width: 1020px;
    margin: 40px auto;
    justify-content: center;
  }
`;

const SearchPage = () => (
  <Container title='Search'>
    <Header />
    <Content>
      <DataSearch
        css={searchCls}
        className='dataSearch'
        componentId='SearchSensor'
        dataField={['original_title']}
        queryFormat='and'
        autosuggest={false}
        filterLabel='search'
        URLParams={true}
        innerClass={{
          input: 'input'
        }}
      />
      <MultiList
        componentId='year-list'
        dataField='release_year'
        size={20}
        sortBy='desc'
        queryFormat='or'
        selectAllLabel='All'
        showCheckbox
        showSearch
        placeholder='Search for a Year'
        react={{
          and: ['SearchSensor', 'results', 'price', 'language-list']
        }}
        showFilter
        showCount={false}
        filterLabel='Year'
        URLParams={false}
      />
      <MultiDataList
        componentId='language-list'
        dataField='original_language.keyword'
        size={100}
        sortBy='asc'
        queryFormat='or'
        selectAllLabel='All Languages'
        showCheckbox
        showSearch
        placeholder='Search for a language'
        react={{
          and: ['SearchSensor', 'results', 'price', 'year-list']
        }}
        data={[
          {
            label: 'English',
            value: 'English'
          },
          {
            label: 'Chinese',
            value: 'Chinese'
          },
          {
            label: 'Turkish',
            value: 'Turkish'
          }
        ]}
        showFilter
        filterLabel='Language'
        URLParams={false}
      />
      <RangeSlider
        componentId='price'
        react={{
          and: ['SearchSensor', 'language-list', 'year-list']
        }}
        dataField='price'
        range={{
          start: 0,
          end: 1500
        }}
        showHistogram={false}
        rangeLabels={{
          start: '$0',
          end: '$1500'
        }}
      />
      <ReactiveList
        css={searchCls}
        className='reactiveList'
        innerClass={{
          list: 'resultList'
        }}
        componentId='results'
        dataField='original_title'
        react={{
          and: ['SearchSensor', 'price', 'language-list', 'year-list']
        }}
        pagination
        paginationAt='bottom'
        pages={5}
        size={4}
        Loader='Loading...'
        noResults='No results were found...'
        sortOptions={[
          {
            dataField: 'price',
            sortBy: 'asc',
            label: 'Sort by Price(Low to High) \u00A0'
          },
          {
            dataField: 'popularity',
            sortBy: 'desc',
            label: 'Sort by Popularity(High to Low)\u00A0 \u00A0'
          },
          {
            dataField: 'vote_average',
            sortBy: 'desc',
            label: 'Sort by Ratings(High to Low) \u00A0'
          },
          {
            dataField: 'original_title.keyword',
            sortBy: 'asc',
            label: 'Sort by Title(A-Z) \u00A0'
          }
        ]}
        renderItem={res => (
          <ProductCard
            key={res.id}
            id={res.id}
            posterPath={res.poster_path}
            originalTitle={res.original_title}
            releaseYear={res.release_year}
            genresData={res.genres_data}
            overview={res.overview}
            price={res.price}
            voteAverage={res.vote_average}
          />
        )}
      />
    </Content>
    <Footer />
  </Container>
);

export default SearchPage;
