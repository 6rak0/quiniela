import fetch from 'node-fetch';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function post(req, res) {
  try {
    const { username, password } = req.body;

    const result = await fetch(`http://45.77.197.176:4000/api/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ username, password }),
    });

    const parsed = await result.json();

    if (!parsed.success) {
      throw new Error(parsed.message);
    }
    req.session.token = parsed.token;
    req.session.user = parsed.user;
    res.end(JSON.stringify(parsed));
  } catch (error) {
    console.log(error);
    res.end(JSON.stringify({ error: error.message }));
  }
}
