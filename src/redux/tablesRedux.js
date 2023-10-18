import { API_URL } from "../config";
//selectors
export const getAllTables = (state => state.tables);

// action names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

// action creators
export const updateTables = payload => ({type: UPDATE_TABLES, payload});

export const fetchTables = () => {
  return (dispatch) => {
    fetch(`${API_URL}/tables`)
      .then(response => response.json())
      .then(tables => dispatch(updateTables(tables)))
  }
};

export const updateTablesRequest = (values, tableId) => {
  return (dispatch) =>  {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: tableId,
        status: values.selectedOption,
        peopleAmount: values.peopleAmount,
        maxPeopleAmount: values.maxPeopleAmount,
        bill: values.billValue
      }),
    }
    fetch(`${API_URL}/tables/${tableId}`, options)
    .then(response => response.json())
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  };
};
export default tablesReducer;