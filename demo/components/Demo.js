import usePagination from '@lucasmogari/react-pagination';
import Pagination, { RootPagination } from './Pagination';
import PreviousButton from './PreviousButton';
import NextButton from './NextButton';
import PageItemButton from './PageItemButton';
import PageGap from './PageGap';

const Demo = () => {
  const pagination = usePagination({ itemsPerPage: 24, totalItems: 1000 });

  return (
    <div>
      <h3>Demo</h3>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <label className="block">
            <span className="text-gray-700 mr-2">Total items</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.totalItems}
              style={{ width: 80 }}
              onChange={(e) => pagination.setTotalItems(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 mr-2">Items per page</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.itemsPerPage}
              style={{ width: 80 }}
              onChange={(e) => pagination.setItemsPerPage(e.target.value)}
            />
          </label>
          <label className="block">
            <span className="text-gray-700 mr-2">Max. page items</span>
            <input
              className="form-input mt-1 block"
              type="number"
              value={pagination.maxPageItems}
              style={{ width: 80 }}
              onChange={(e) => pagination.setMaxPageItems(e.target.value)}
            />
          </label>
        </div>

        <div className="space-y-2 p-2 rounded shadow">
          <p className="">
            <label htmlFor="page">Page</label>{' '}
            <input
              className="form-input"
              type="number"
              id="page"
              value={pagination.page}
              style={{ width: 80 }}
              onChange={(e) => pagination.goTo(e.target.value)}
            />{' '}
            of {pagination.totalPages}
          </p>
          <p>
            Items {pagination.fromItem}-{pagination.toItem} of {pagination.totalItems}
          </p>
        </div>

        <div className="p-2 rounded shadow">
          <h4>Arrows only</h4>
          <RootPagination
            className="flex items-center space-x-1"
            pages={
              <>
                <li>
                  <PreviousButton {...pagination.getPageItem('previous').props} />
                </li>
                <li>
                  <NextButton {...pagination.getPageItem('next').props} />
                </li>
              </>
            }
          />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Numbers only</h4>
          <RootPagination
            className="flex flex-wrap items-center space-x-1"
            pages={[...Array(pagination.size - 2)].map((_, i) => {
              const { current, page, props } = pagination.getPageItem(i + 1);
              return page === 'gap' ? (
                <li key={i}>
                  <PageGap key={i} />
                </li>
              ) : (
                <li key={i}>
                  <PageItemButton
                    key={i}
                    current={current}
                    page={page}
                    className="w-16"
                    {...props}
                  />
                </li>
              );
            })}
          />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Arrows and numbers</h4>
          <Pagination className="flex flex-wrap items-center space-x-1" pagination={pagination} />
        </div>

        <div className="p-2 rounded shadow">
          <h4>Infinity</h4>
          <RootPagination
            className="flex flex-wrap items-center"
            pages={[...Array(pagination.totalPages)].map((_, i) => {
              const page = i + 1;
              return (
                <li key={i}>
                  <PageItemButton
                    key={i}
                    current={pagination.page === page}
                    page={page}
                    className="w-16"
                    onClick={(e) => {
                      e.preventDefault();
                      pagination.goTo(page);
                    }}
                  />
                </li>
              );
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
