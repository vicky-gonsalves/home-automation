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
import React, { useEffect } from 'react';
import config from '../../../config';
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
    maxWidth: theme.spacing(8),
  },
  highlight: {
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
  initialSort,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState(initialSort.order);
  const [orderBy, setOrderBy] = React.useState(initialSort.orderBy);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(config.table.rowsPerPage);
  const [searchFilter, setSearchFilter] = React.useState({});
  const [headCells, setHeadCells] = React.useState(tableHeaders);

  const performFilter = _searchFilter => {
    setSearchFilter(_searchFilter);
    setPage(0);
    getList(isLoggedIn, isConnected, `${orderBy}:${order}`, limit, page + 1, searchFilter);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    performFilter(searchFilter);
  };

  const createSortHandler = property => event => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeLimit = event => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchFilter = (key, value) => {
    const _searchFilter = searchFilter;
    _searchFilter[key] = value;
    performFilter(_searchFilter);
  };

  const handleSearch = (headCell, cancel) => () => {
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
  };

  const renderSortTableLabel = headCell => {
    const renderOrderBy = () => {
      if (orderBy === headCell.id) {
        return <span className={classes.visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</span>;
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
  };

  const renderSearchIcons = headCell => {
    if (headCell.search) {
      return (
        <IconButton aria-label="search" size="small" onClick={handleSearch(headCell, false)} data-test="searchIconButton">
          <SearchIcon fontSize="small" />
        </IconButton>
      );
    }
  };

  const renderSortLabel = headCell => {
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
  };

  const renderTableHeadings = headCell => {
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
      <TableCell key={headCell.id} align={headCell.align} className={classes.highlight} style={{ minWidth: headCell.width }}>
        {renderNormalForm()}
        {renderDateTimeForm()}
      </TableCell>
    );
  };

  const renderActions = (actions, item) => {
    const generateComponent = action => {
      if (action.buttonType && (action.buttonType === 'view' || action.buttonType === 'edit')) {
        return <action.component path={`${action.path}${item.id}`} data-test="actionButtonComponent" />;
      } else if (action.buttonType && action.buttonType === 'delete') {
        return <action.component item={item} type={type} data-test="actionButtonComponent" />;
      }
    };
    return actions.map(action => <React.Fragment key={action.id}>{generateComponent(action)}</React.Fragment>);
  };

  const renderRowCells = item =>
    headCells.map(headCell => {
      if (headCell.id === 'actions') {
        return (
          <TableCell key={headCell.id} className={classes.actions}>
            <div>{renderActions(headCell.actions, item)}</div>
          </TableCell>
        );
      } else {
        return (
          <TableCell key={headCell.id} align={headCell.align}>
            <Typography variant="body2" noWrap>
              {headCell.type === 'datetime' && moment(item[headCell.id]).format('MMMM Do YYYY, h:mm:ss a')}
              {headCell.type !== 'datetime' && item[headCell.id].toString()}
            </Typography>
          </TableCell>
        );
      }
    });

  const renderTableRows = () => {
    return list.map(item => (
      <TableRow key={item.id} data-test="tableRowComponent">
        {renderRowCells(item)}
      </TableRow>
    ));
  };

  const renderOverlay = () => {
    if (isFetching) {
      return <OverlayLoading data-test="overlayComponent" />;
    }
  };
  useEffect(() => {
    getList(isLoggedIn, isConnected, `${orderBy}:${order}`, limit, page + 1, searchFilter);
  }, [getList, isConnected, isLoggedIn, limit, order, orderBy, page, searchFilter]);

  return (
    <React.Fragment>
      <PageToolbar title={title} buttons={buttons} data-test="tableToolbarComponent" />
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
      </div>
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
          path: PropTypes.string,
          buttonType: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  getList: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  buttons: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      component: PropTypes.func.isRequired,
      path: PropTypes.string.isRequired,
      buttonType: PropTypes.string.isRequired,
    })
  ),
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  initialSort: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
  }),
};
export default ListTable;
