/* eslint-disable import/prefer-default-export */
import fetch from 'node-fetch';

const BASE_API_URL = 'https://fmvoley.com/wp-admin/admin-ajax.php';

async function fetchDataFromFMVoleyAPI({ endpointAction, groupId }) {
  try {
    const response = await fetch(BASE_API_URL, {
      method: 'POST',
      body: `action=${endpointAction}&grupo=${groupId}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.text();
  } catch (error) {
    throw new Error(error);
  }
}

export {
  fetchDataFromFMVoleyAPI,
};
