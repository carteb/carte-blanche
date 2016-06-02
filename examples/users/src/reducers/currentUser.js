const initialState = {
  id: 'someId',
  firstName: 'Ada',
  lastName: 'Lovelace',
  avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/440px-Ada_Lovelace_portrait.jpg',
};

export default function currentUser(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
