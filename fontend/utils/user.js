const baseURL = 'http://localhost:3000/api/v1';
import { getToken, getUserFromLocalStorage } from './auth';

export async function getAllUsers() {
  const token = getToken();
  const response = await fetch(`${baseURL}/user/getAllUsers`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return {
    status: 'success',
    data,
  };
}

export async function getOneUser(userId) {
  const token = getToken();

  const response = await fetch(`${baseURL}/user/getOneUser/${userId}`, {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return {
    status: 'success',
    data,
  };
}

export async function updateUser(userId, updateField) {
  const token = getToken();
  console.log('userId: ', userId);
  console.log('update field: ', updateField);
  const response = await fetch(`${baseURL}/user/updateUser/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(updateField),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return {
    status: 'success',
    data,
  };
}

export async function updatePassword(userId, updateField) {
  const token = getToken();

  const response = await fetch(`${baseURL}/user/updatePassword/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(updateField),
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return {
    status: 'success',
    data,
  };
}

export async function imageUpload(formData) {
  const token = getToken();
  const user = getUserFromLocalStorage();
  console.log(formData.get('oldImage'));
  const response = await fetch(`${baseURL}/user/imageUpload/${user._id}`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: 'Bearer ' + token,
      // 'Content-Type': 'images/*',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const result = await response.json();

  return {
    status: 'success',
    result,
  };
}

export async function resetPassword(email) {
  const response = await fetch(`${baseURL}/user/resetPassword`, {
    method: 'POST',
    body: JSON.stringify(email),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();

  return data;
}

export async function renewPassword(field) {
  const response = await fetch(`${baseURL}/user//renewPasswordWithToken`, {
    method: 'PATCH',
    body: JSON.stringify(field),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return {
      status: 'error',
      error: error.message,
    };
  }

  const data = await response.json();
  console.log(data);
  return data;
}
