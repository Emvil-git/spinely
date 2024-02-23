export const retrieveSessions = () => {
  fetch(`http://localhost:4000/sessions/get`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
    }
  }).then(res => res.json())
  .then(
    data => {
      return data
    }
  )
}

export const retrieveReports = sessionId => {
    fetch(`http://localhost:4000/progress/get/:${sessionId}`)
    .then(res => res.json())
    .then(
        data => {
            return data
        }
    )
}

export const retrieveSpineData = () => {
    fetch(`http://localhost:4000/spine/getUserData`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
        }
    }).then(res => res.json())
    .then(
        data => {
            return data
        }
    )
}

export const checkSpineData = () => {
    fetch(`http://localhost:4000/spine/checkData`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
        }
    }).then(res => res.json())
    .then(
        data => {
            return data
        }
    )
}

export const retrieveCalibration = () => {
    fetch(`http://localhost:4000/calibration/getData`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
        }
    }).then(res => res.json())
    .then(
        data => {
            return data
        }
    )
}

export const checkCalibration = () => {
    fetch(`http://localhost:4000/calibration/checkData`, {
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).access}`
        }
    }).then(res => res.json())
    .then(
        data => {
            return data
        }
    )
}

export const convertDate = (isoString) => {
    const dateObj = new Date(isoString);
    const year = dateObj.getFullYear();
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const hours = ('0' + dateObj.getHours()).slice(-2);
    const minutes = ('0' + dateObj.getMinutes()).slice(-2);
    const seconds = ('0' + dateObj.getSeconds()).slice(-2);
    const fDate = `${date}-${month}-${year}`;
    const fTime = `${hours}:${minutes}:${seconds}`;
    return `${fDate} ${fTime}`;
}


// Index Generators

export const generateSessionIndex = (sessionIndex) => {
    let indStr = sessionIndex.toString();
    indStr = '10' + indStr;
    return parseInt(indStr);
}

export const generateMonitoringIndex = (monIndex) => {
    let indStr = monIndex.toString();
    indStr = '20' + indStr;
    return parseInt(indStr);
}

export const generateProgressIndex = (progIndex) => {
    let indStr = progIndex.toString();
    indStr = '30' + indStr;
    return parseInt(indStr);
}