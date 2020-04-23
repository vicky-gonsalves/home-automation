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

const ListTable = ({ tableHeaders, list, count, getList, isLoggedIn, isConnected, isFetching }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('createdAt');
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(config.table.rowsPerPage);
  const [searchFilter, setSearchFilter] = React.useState({});
  const [headCells, setHeadCells] = React.useState(tableHeaders);

  const performFilter = _searchFilter => {
    setSearchFilter(_searchFilter);
    setPage(0);
    getList(isLoggedIn, isConnected, orderBy, order, limit, page, searchFilter);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
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

  const handleSearch = (headCell, cancel = false) => () => {
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
        <IconButton aria-label="search" size="small" onClick={handleSearch(headCell)}>
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
          />
        );
      }
    };

    if (!headCell.searchClicked) {
      return (
        <TableCell key={headCell.id} align={headCell.align} style={{ minWidth: headCell.width }}>
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

  const renderActions = actions =>
    actions.map(action => <React.Fragment key={action.id}>{action.component}</React.Fragment>);

  const renderRowCells = item =>
    headCells.map(headCell => {
      if (headCell.id === 'actions') {
        return (
          <TableCell key={headCell.id} className={classes.actions}>
            <div>{renderActions(headCell.actions)}</div>
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
    return list.map(item => <TableRow key={item.id}>{renderRowCells(item)}</TableRow>);
  };

  useEffect(() => {
    getList(isLoggedIn, isConnected, orderBy, order, limit, page, searchFilter);
  }, [isLoggedIn, isConnected, getList, order, orderBy, page, limit, searchFilter]);

  return (
    <React.Fragment>
      <div className={classes.tableContainer}>
        <TableContainer>
          <Table stickyHeader className={classes.table} aria-label="Table">
            <TableHead>
              <TableRow>{headCells.map(headCell => renderTableHeadings(headCell))}</TableRow>
            </TableHead>
            <TableBody>{renderTableRows()}</TableBody>
          </Table>
          {isFetching && <OverlayLoading />}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={config.table.rowsPerPageOptions}
          component="div"
          count={count}
          rowsPerPage={limit}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeLimit}
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
};
export default ListTable;
