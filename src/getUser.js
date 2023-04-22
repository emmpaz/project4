import { Auth } from 'aws-amplify';

export async function getUser(setUsername) {
    Auth.currentAuthenticatedUser().then(value => {
      setUsername(value.username)
    }).catch((err) => {
      if (err)
        setUsername("")
    });
  }