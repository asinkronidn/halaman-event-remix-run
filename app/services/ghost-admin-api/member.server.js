import { ghostAdminAPI } from './ghost-api.server.js';

export function addMember({
    email,
    name
}) {
    return ghostAdminAPI().members.add({
        name: name, 
        email: email
    }).then(resp => Promise.resolve(resp))
    .catch(err => Promise.reject(err));
  }