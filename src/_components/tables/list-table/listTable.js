import blue from '@material-ui/core/colors/blue';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import config from '../../../config';
import ConfirmButton from '../../buttons/confirm-button/confirmButton';
import TableSearchForm from '../../forms/table-search-form/TableSearchForm';
import OverlayLoading from '../../overlay-loading/OverlayLoading';
import PageToolbar from '../../page-toolbar/PageToolbar';
import DateRangePicker from '../../pickers/date-range-picker/dateRangePicker';

const useStyles = makeStyles(theme => ({
  tableContainer: {
    position: 'relative',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  margin: {
    margin: theme.spacing(0.5),
  },
  actions: {
    position: 'relative',
    maxWidth: theme.spacing(8),
  },
  content: {
    position: 'relative',
  },
  highlight: {
    backgroundColor: blue[50],
  },
  deleteButtons: {
    padding: theme.spacing(1.4),
    backgroundColor: blue[50],
  },
  overlay: {
    content: '',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FFFFFF',
    height: '100%',
    opacity: 0.7,
  },
  alert: {
    backgroundColor: blue[50],
  },
}));

const ListTable = ({
  title,
  tableHeaders,
  list,
  count,
  getList,
  isLoggedIn,
  isConnected,
  isFetching,
  buttons,
  type,
  preventDeletion,
  initialSort,
  preDeleteCallback,
  postDeleteCallback,
  cancelDeleteCallback,
  useKey,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState(initialSort.order);
  const [orderBy, setOrderBy] = React.useState(initialSort.orderBy);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(config.table.rowsPerPage);
  const [searchFilter, setSearchFilter] = React.useState({});
  const [headCells, setHeadCells] = React.useState(tableHeaders);

  const performFilter = useCallback(
    _searchFilter => {
      setSearchFilter(_searchFilter);
      setPage(0);
      getList(isLoggedIn, isConnected, `${orderBy}:${order}`, limit, page + 1, searchFilter);
    },
    [getList, isConnected, isLoggedIn, limit, order, orderBy, page, searchFilter]
  );

  const handleRequestSort = useMemo(
    () => (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const createSortHandler = useMemo(
    () => property => event => {
      handleRequestSort(event, property);
    },
    [handleRequestSort]
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = event => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchFilter = useCallback(
    (key, value) => {
      const _searchFilter = searchFilter;
      _searchFilter[key] = value;
      performFilter(_searchFilter);
    },
    [performFilter, searchFilter]
  );

  const handleSearch = useMemo(
    () => (headCell, cancel) => () => {
      const newHeadcells = [];
      headCells.forEach(_headCell => {
        if (_headCell.id === headCell.id) {
          _headCell.searchClicked = !cancel;
        }
        newHeadcells.push(_headCell);
      });
      setHeadCells(newHeadcells);
      if (cancel) {
        if (searchFilter.hasOwnProperty(headCell.id)) {
          const _searchFilter = searchFilter;
          delete _searchFilter[headCell.id];
          performFilter(_searchFilter);
        }
      }
    },
    [headCells, performFilter, searchFilter]
  );

  const renderSortTableLabel = useMemo(
    () => headCell => {
      const renderOrderBy = () => {
        if (orderBy === headCell.id) {
          return (
            <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>
          );
        }
      };
      if (headCell.sort) {
        return (
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            data-test="tableSortLabelComponent"
          >
            {headCell.label}
            {renderOrderBy()}
          </TableSortLabel>
        );
      }
    },
    [classes.visuallyHidden, createSortHandler, order, orderBy]
  );

  const renderSearchIcons = useMemo(
    () => headCell => {
      if (headCell.search) {
        return (
          <IconButton aria-label="search" size="small" onClick={handleSearch(headCell, false)} data-test="searchIconButton">
            <SearchIcon fontSize="small" />
          </IconButton>
        );
      }
    },
    [handleSearch]
  );

  const renderSortLabel = useMemo(
    () => headCell => {
      if (headCell.id === 'actions') {
        return headCell.label;
      } else {
        return (
          <React.Fragment>
            {renderSortTableLabel(headCell)}
            {!headCell.sort && headCell.label}
            {renderSearchIcons(headCell)}
          </React.Fragment>
        );
      }
    },
    [renderSearchIcons, renderSortTableLabel]
  );

  const renderTableHeadings = useMemo(
    () => headCell => {
      const renderDateTimeForm = () => {
        if (headCell.type === 'datetime') {
          return (
            <DateRangePicker
              handleSubmit={handleSearchFilter}
              headCell={headCell}
              handleCancel={handleSearch(headCell, true)}
              isFetching={isFetching}
              data-test="dateRangePickerComponent"
            />
          );
        }
      };

      const renderNormalForm = () => {
        if (headCell.type !== 'datetime') {
          return (
            <TableSearchForm
              handleSubmit={handleSearchFilter}
              headCell={headCell}
              handleCancel={handleSearch(headCell, true)}
              isFetching={isFetching}
              data-test="normalFormComponent"
            />
          );
        }
      };

      if (!headCell.searchClicked) {
        return (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            style={{ minWidth: headCell.width }}
            data-test="sortLabelComponent"
          >
            {renderSortLabel(headCell)}
          </TableCell>
        );
      }
      return (
        <TableCell
          key={headCell.id}
          align={headCell.align}
          className={classes.highlight}
          style={{ minWidth: headCell.width }}
        >
          {renderNormalForm()}
          {renderDateTimeForm()}
        </TableCell>
      );
    },
    [classes.highlight, handleSearch, handleSearchFilter, isFetching, renderSortLabel]
  );

  const renderActions = useMemo(
    () => (actions, item) => {
      const generateComponent = action => {
        if (action.buttonType && useKey && (action.buttonType === 'view' || action.buttonType === 'edit')) {
          if (action.callback && typeof action.callback === 'function') {
            return <action.component callback={action.callback} item={item} data-test="actionButtonComponent" />;
          } else {
            return <action.component path={`${action.path}${item[useKey]}`} data-test="actionButtonComponent" />;
          }
        } else if (
          action.buttonType &&
          action.buttonType === 'delete' &&
          preDeleteCallback &&
          postDeleteCallback &&
          cancelDeleteCallback &&
          typeof preDeleteCallback === 'function' &&
          typeof postDeleteCallback === 'function' &&
          typeof cancelDeleteCallback === 'function'
        ) {
          if (preventDeletion) {
            let counter = 0;
            const keys = Object.keys(preventDeletion);
            keys.forEach(key => {
              if (item.hasOwnProperty(key) && preventDeletion[key] === item[key]) {
                counter++;
              }
            });
            if (counter < keys.length) {
              return (
                <action.component
                  item={item}
                  type={type}
                  useKey={useKey}
                  callback={preDeleteCallback}
                  data-test="actionButtonComponent"
                />
              );
            }
          } else {
            return (
              <action.component
                item={item}
                type={type}
                useKey={useKey}
                callback={preDeleteCallback}
                data-test="actionButtonComponent"
              />
            );
          }
        }
      };
      return actions.map(action => <React.Fragment key={action.id}>{generateComponent(action)}</React.Fragment>);
    },
    [cancelDeleteCallback, postDeleteCallback, preDeleteCallback, preventDeletion, type, useKey]
  );

  const renderRowCells = useMemo(
    () => (item, itemToBeDeleted) =>
      headCells.map(headCell => {
        if (headCell.id === 'actions') {
          return (
            <TableCell key={headCell.id} className={classes.actions}>
              <div>{renderActions(headCell.actions, item)}</div>
              {itemToBeDeleted && <div className={classes.overlay} />}
            </TableCell>
          );
        } else {
          return (
            <TableCell key={headCell.id} align={headCell.align} className={classes.content}>
              <Typography variant="body2" noWrap>
                {headCell.type === 'datetime' && moment(item[headCell.id]).format('MMMM Do YYYY, h:mm:ss a')}
                {headCell.type !== 'datetime' && item[headCell.id].toString()}
              </Typography>
              {itemToBeDeleted && <div className={classes.overlay} />}
            </TableCell>
          );
        }
      }),
    [classes.actions, classes.content, classes.overlay, headCells, renderActions]
  );

  const renderDeleteRowCells = useMemo(
    () => item => {
      return (
        <React.Fragment>
          <TableCell align={'center'} className={classes.deleteButtons}>
            <Typography variant="subtitle2" noWrap>
              <ConfirmButton
                item={item}
                callback={postDeleteCallback}
                cancelCallback={cancelDeleteCallback}
                useKey={useKey}
              />
            </Typography>
          </TableCell>
          <TableCell colSpan={headCells.length - 1} key={`delete-${item.id}`} align={'left'}>
            <Typography variant="h6" noWrap>
              Are you sure you want to delete this {type}?
            </Typography>
          </TableCell>
        </React.Fragment>
      );
    },
    [cancelDeleteCallback, classes.deleteButtons, headCells.length, postDeleteCallback, type, useKey]
  );

  const renderTableRows = useMemo(
    () => () => {
      const itemsToBeDeleted = list.filter(item => item.toBeDeleted);
      const itemToBeDeleted = itemsToBeDeleted.length > 0 ? itemsToBeDeleted[0] : null;
      if (list.length <= 0 && !count) {
        return (
          <TableRow>
            <TableCell colSpan={headCells.length} align={'left'} className={classes.alert}>
              <Typography variant="button" noWrap>
                No content to display
              </Typography>
            </TableCell>
          </TableRow>
        );
      } else {
        return list.map(item => {
          if (!item.toBeDeleted) {
            return (
              <React.Fragment key={item.id}>
                <TableRow data-test="tableRowComponent">{renderRowCells(item, itemToBeDeleted)}</TableRow>
              </React.Fragment>
            );
          } else {
            if (
              postDeleteCallback &&
              cancelDeleteCallback &&
              typeof postDeleteCallback === 'function' &&
              typeof cancelDeleteCallback === 'function'
            ) {
              return (
                <TableRow key={item.id} data-test="tableDeleteRowComponent">
                  {renderDeleteRowCells(item)}
                </TableRow>
              );
            }
            return null;
          }
        });
      }
    },
    [
      cancelDeleteCallback,
      classes.alert,
      count,
      headCells.length,
      list,
      postDeleteCallback,
      renderDeleteRowCells,
      renderRowCells,
    ]
  );

  const renderOverlay = useMemo(
    () => () => {
      if (isFetching) {
        return <OverlayLoading data-test="overlayComponent" />;
      }
    },
    [isFetching]
  );

  useLayoutEffect(() => {
    getList(isLoggedIn, isConnected, `${orderBy}:${order}`, limit, page + 1, searchFilter);
  }, [getList, isConnected, isLoggedIn, limit, order, orderBy, page, searchFilter]);

  const renderTable = useMemo(() => {
    return (
      <div className={classes.tableContainer} data-test="tableContainer">
        <TableContainer data-test="tableContainerComponent">
          <Table stickyHeader className={classes.table} aria-label="Table" data-test="tableComponent">
            <TableHead>
              <TableRow>{headCells.map(headCell => renderTableHeadings(headCell))}</TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
          {renderOverlay()}
        </TableContainer>
        {count && (
          <TablePagination
            rowsPerPageOptions={config.table.rowsPerPageOptions}
            component="div"
            count={count}
            rowsPerPage={limit}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeLimit}
            data-test="tablePaginationComponent"
          />
        )}
      </div>
    );
  }, [
    classes.table,
    classes.tableContainer,
    count,
    headCells,
    limit,
    page,
    renderOverlay,
    renderTableHeadings,
    renderTableRows,
  ]);

  return (
    <React.Fragment>
      <PageToolbar title={title} buttons={buttons} isFetching={isFetching} data-test="tableToolbarComponent" />
      {renderTable}
    </React.Fragment>
  );
};

ListTable.propTypes = {
  classes: PropTypes.shape({
    tableContainer: PropTypes.string.isRequired,
    table: PropTypes.string.isRequired,
    visuallyHidden: PropTypes.string.isRequired,
    margin: PropTypes.string.isRequired,
    actions: PropTypes.string.isRequired,
    highlight: PropTypes.string.isRequired,
  }),
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      align: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      type: PropTypes.string,
      options: PropTypes.arrayOf(PropTypes.string),
      actions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          component: PropTypes.func.isRequired,
          path: (props, propName, componentName) => {
            if (props.buttonType !== 'delete' && !props.path && !props.callback) {
              return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
            }
          },
          callback: (props, propName, componentName) => {
            if (props.buttonType !== 'delete' && !props.path && !props.callback) {
              return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
            }
          },
          buttonType: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number,
  getList: PropTypes.func.isRequired,
  preDeleteCallback: PropTypes.func,
  postDeleteCallback: PropTypes.func,
  cancelDeleteCallback: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  buttons: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      path: (props, propName, componentName) => {
        if (!props.path && !props.callback) {
          return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
        }
      },
      callback: (props, propName, componentName) => {
        if (!props.path && !props.callback) {
          return new Error(`One of props 'path' or 'callback' was not specified in '${componentName}'.`);
        }
      },
      buttonType: PropTypes.string.isRequired,
      width: PropTypes.number,
    })
  ),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  initialSort: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }),
  useKey: PropTypes.string.isRequired,
};
export default ListTable;
