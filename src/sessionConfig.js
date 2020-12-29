const getConnection = () => sessionStorage.getItem('connectionId');

const exitConnection = () => {
    sessionStorage.removeItem('routerId');
    sessionStorage.removeItem('connectionId');
};

const setConnection = (routerId, connectionId) => {
    sessionStorage.setItem('routerId', routerId);
    sessionStorage.setItem('connectionId', connectionId);
};

const getRouterId = () => parseInt(sessionStorage.getItem('routerId'));

export { getConnection, setConnection, exitConnection, getRouterId };
