//selectors
export const getAllTables = (state => state.tables);

// action names
const createActionName = actionName => `app/tables/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_BOOKS');

// action creators
export const updateTables = payload => ({type: UPDATE_TABLES, payload});

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(response => response.json())
      .then(tables => dispatch(updateTables(tables)));
  }
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    default:
      return statePart;
  };
};
export default tablesReducer;