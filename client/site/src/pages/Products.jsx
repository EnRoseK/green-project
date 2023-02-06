import axios from 'axios';
import dayjs from 'dayjs';
import relateTime from 'dayjs/plugin/relativeTime';
import currencyFormatter from '../utils/currencyFormatter';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

dayjs.extend(relateTime);

export const Products = () => {
  const [page, setPage] = useState(null);

  // const [isReady, setIsReady] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [prices, setPrices] = useState([10_000, 1_000_000]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    if (searchParams.has('page')) setCurrentPage(Number(searchParams.get('page')));
    else setCurrentPage(1);
    if (searchParams.has('pageSize')) setPageSize(Number(searchParams.get('pageSize')));
    else setPageSize(10);
    if (searchParams.has('q')) setSearchName(searchParams.get('q'));
    window.scroll(0, 0);
    submitResult(searchParams.get('pageSize') || 10, searchParams.get('page') || 1, searchParams.get('q'));
  }, [location]);

  const submitResult = (pageS, page, q) => {
    const urlParams = new URLSearchParams();
    urlParams.set('pageSize', pageS || pageSize);
    urlParams.set('page', page || currentPage);
    if (q) urlParams.set('q', q);

    axios.get(`http://localhost:8000/products?${urlParams.toString()}`).then((res) => setPage(res.data));
  };

  const updateUrl = (pageS, page) => {
    const urlParams = new URLSearchParams();
    urlParams.set('pageSize', pageS);
    urlParams.set('page', page);
    if (searchName !== '') urlParams.set('q', searchName);

    navigate(`/products?${urlParams.toString()}`);
  };

  const getPaginations = () => {
    let result = [];
    // first page
    result.push(
      <li className={`page-item ${1 === page.page && `active`}`}>
        <Link
          to={`/products?pageSize=${pageSize}&page=${1}${searchName !== '' ? `&q=${searchName}` : ''}`}
          className='page-link'
        >
          1
        </Link>
      </li>
    );

    // first dots
    if (page.page - 3 > 0)
      result.push(
        <li className={`page-item`}>
          <span className='page-link'>...</span>
        </li>
      );

    // Current page
    if (page.page !== 1 && page.page !== page.totalPages) {
      if (page.page !== 2)
        result.push(
          <li className={`page-item`}>
            <Link
              to={`/products?pageSize=${pageSize}&page=${page.page - 1}${searchName !== '' ? `&q=${searchName}` : ''}`}
              className='page-link'
            >
              {page.page - 1}
            </Link>
          </li>
        );

      result.push(
        <li className={`page-item active`}>
          <span className='page-link'>{page.page}</span>
        </li>
      );

      if (page.page !== page.totalPages - 1)
        result.push(
          <li className={`page-item`}>
            <Link
              to={`/products?pageSize=${pageSize}&page=${page.page + 1}${searchName !== '' ? `&q=${searchName}` : ''}`}
              className='page-link'
            >
              {page.page + 1}
            </Link>
          </li>
        );
    } else {
      if (page.page === 1 && page.totalPages - 1 > 2) {
        result.push(
          <>
            <li className={`page-item`}>
              <Link
                to={`/products?pageSize=${pageSize}&page=${page.page + 1}${
                  searchName !== '' ? `&q=${searchName}` : ''
                }`}
                className='page-link'
              >
                {page.page + 1}
              </Link>
            </li>

            <li className={`page-item`}>
              <Link
                to={`/products?pageSize=${pageSize}&page=${page.page + 2}${
                  searchName !== '' ? `&q=${searchName}` : ''
                }`}
                className='page-link'
              >
                {page.page + 2}
              </Link>
            </li>
          </>
        );
      }

      if (page.page === page.totalPages && page.totalPages - 1 > 2) {
        result.push(
          <>
            <li className={`page-item`}>
              <Link
                to={`/products?pageSize=${pageSize}&page=${page.page - 2}${
                  searchName !== '' ? `&q=${searchName}` : ''
                }`}
                className='page-link'
              >
                {page.page - 2}
              </Link>
            </li>

            <li className={`page-item`}>
              <Link
                to={`/products?pageSize=${pageSize}&page=${page.page - 1}${
                  searchName !== '' ? `&q=${searchName}` : ''
                }`}
                className='page-link'
              >
                {page.page - 1}
              </Link>
            </li>
          </>
        );
      }
    }

    // last dots
    if (page.totalPages - 3 >= page.page)
      result.push(
        <li className={`page-item`}>
          <span className='page-link'>...</span>
        </li>
      );

    // last page
    if (page.totalPages !== 1)
      result.push(
        <li className={`page-item ${page.totalPages === page.page && `active`}`}>
          <Link
            to={`/products?pageSize=${pageSize}&page=${page.totalPages}${searchName !== '' ? `&q=${searchName}` : ''}`}
            className='page-link'
          >
            {page.totalPages}
          </Link>
        </li>
      );

    return result;
  };

  if (!page) {
    return (
      <div className='spinner-grow' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    );
  }

  return (
    <main>
      <div className='container'>
        <div className='d-flex justify-content-end gap-5 align-items-center'>
          <label className='mb-3'>
            Нэрээр хайх &nbsp;
            <input
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setCurrentPage(1);
                  updateUrl(pageSize, 1);
                }
              }}
              type='text'
              className='form-control d-inline-block w-auto'
              placeholder='Барааны нэр...'
            />
          </label>

          <label className='mb-3 d-flex align-items-center w-50'>
            Үнээр шүүх &nbsp;
            <RangeSlider
              className='d-inline-block form-control'
              min={10_000}
              max={1_000_000}
              steps={100_000}
              value={prices}
              onInput={(e) => {
                setPrices(e);
              }}
            />
          </label>

          <label className='mb-3'>
            Хуудаслалт &nbsp;
            <select
              value={pageSize}
              onChange={(e) => {
                setCurrentPage(1);
                setPageSize(e.target.value);
                updateUrl(e.target.value, 1);
              }}
              className='form-control d-inline-block w-auto'
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
        <div className='row gy-4'>
          {page.items.map((product) => {
            return (
              <div className='col-sm-3' key={product.id}>
                <div className='product-card'>
                  <div className='product-card-img'>
                    <img src={product.imageUrl} alt={product.name} />
                  </div>
                  <div className='product-card-desc'>
                    <div className='product-card-date'>{dayjs(Number(product.createdAt) * 1000).fromNow()}</div>
                    <div className='product-card-name'>{product.name}</div>
                    <div className='product-card-price'>{currencyFormatter(product.price)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <nav className='my-4'>
            <ul className='pagination pagination-lg justify-content-center'>
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <Link
                  to={`/products?pageSize=${pageSize}&page=${currentPage - 1}${
                    searchName !== '' ? `&q=${searchName}` : ''
                  }`}
                  className='page-link'
                >
                  ‹
                </Link>
              </li>
              {page.totalPages > 0 && getPaginations()}
              <li className={`page-item ${currentPage === page.totalPages && 'disabled'}`}>
                <Link
                  to={`/products?pageSize=${pageSize}&page=${currentPage + 1}${
                    searchName !== '' ? `&q=${searchName}` : ''
                  }`}
                  className='page-link'
                >
                  ›
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>
  );
};
