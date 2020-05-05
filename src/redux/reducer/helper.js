/* Permets de créer une fonction qui va retourner un objet qui sert d'action,
cela évite d'avoir écrire plusieurs fonction retournant un objet pour chaque action possible */

export function makeAction(type, ...argNames) {
  return function(...args) {
    let action = {type};
    argNames.forEach((arg, index) => {
      action[arg] = args[index];
    });
    return action;
  };
}

/* Fonction qui attend un nom (argument "type") afin de le préfixer des nom d'états (REQUEST_, SUCCESS_, ERRROR_)
 ainsi qu'une fonction qui va appeler une API en attente d'une réponse. Cela retourne une fonction à qui on peut
 lui passer des paramètres pour l'appel à l'API, lors de l'exécution de cette fonction, cela aura pour but
 de déclencher l'action d'attente (REQUEST_), et de notifier la réussite (SUCCESS_) ou un fail (ERROR_) */

export function makeActionAsync(type, apiCall) {
  const actions = {
    REQUEST: makeAction(`REQUEST_${type}`),
    SUCCESS: makeAction(`SUCCESS_${type}`, 'response'),
    ERROR: makeAction(`ERROR_${type}`),
  };
  return function(...args) {
    return function(dispatch) {
      dispatch(actions.REQUEST());
      return apiCall(...args)
        .then(response => dispatch(actions.SUCCESS(response)))
        .catch(error => dispatch(actions.ERROR()));
    };
  };
}

/* Fonction que l'on appelle en passant nos divers cas possibles sous forme d'objet avec key = NOM_DE_L_ACTION
et value = fonction qui retourne le nouveau state. Execute la fonction si existante, sinon retourne le state */

export function makeReducer(initialState, cases) {
  return function(state = initialState, action) {
    return (cases[action.type] && cases[action.type](state, action)) || state;
  };
}

export default function makeModule(
  prefix,
  initialState = {},
  handlers = {},
  handlersAsync = {},
) {
  const reducer = (state = initialState, action) => {
    const [actionPrefix, actionType] = action.type.split('::');
    const allHandlers = Object.keys(handlersAsync).reduce(
      (accumulator, handlerKey) => ({
        ...accumulator,
        [`${handlerKey}_request`]: handlersAsync[handlerKey].request,
        [`${handlerKey}_success`]: handlersAsync[handlerKey].success,
        [`${handlerKey}_error`]: handlersAsync[handlerKey].error,
      }),
      handlers,
    );
    if (actionPrefix === prefix) {
      return (
        (allHandlers[actionType] &&
          allHandlers[actionType](state, action.payload)) ||
        state
      );
    } else {
      return state;
    }
  };

  const actions = Object.keys(handlers).reduce(
    (accumulator, handlerKey) => ({
      ...accumulator,
      [handlerKey]: (payload = {}) => ({
        type: `${prefix}::${handlerKey}`,
        payload,
      }),
    }),
    {},
  );

  const actionsAsync = Object.keys(handlersAsync).reduce(
    (accumulator, handlerKey) => ({
      ...accumulator,
      [handlerKey]: makeActionAsyncTest(
        prefix,
        handlerKey,
        handlersAsync[handlerKey].apiCall,
      ),
    }),
    {},
  );

  const allActions = {...actions, ...actionsAsync};

  return {reducer, actions: allActions};
}

function makeActionAsyncTest(prefix, action_object, apiCall) {
  const makeAction = (type, payload = {}) => ({
    type: `${prefix}::${action_object}_${type}`,
    payload,
  });
  const actions = {
    request: payload => makeAction('request', payload),
    success: payload => makeAction('success', payload),
    error: payload => makeAction('error', payload),
  };
  return function(...args) {
    return async function(dispatch) {
      dispatch(actions.request(...args));
      try {
        const response = await apiCall(...args);
        dispatch(actions.success({response}));
        return response;
      } catch (error) {
        dispatch(actions.error({error}));
        throw error;
      }
    };
  };
}
