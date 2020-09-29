import React, { useState, useEffect } from 'react';
import './App.css'

import { Table } from './components/Table/Table';
import { Form } from './components/Form/Form';

function App() {
  const [users, setUsers] = useState<User[]>([])

  if (!users.length) {
    let usersFromLs = localStorage.getItem('users')
    if (typeof (usersFromLs) === 'string') {
      usersFromLs =  JSON.parse(usersFromLs)
      if (usersFromLs?.length && typeof usersFromLs !== 'string') {
        setUsers(usersFromLs)
      }
    }
  }

  const addUser = (user: User) => {
    setUsers(users => [...users, user]);
  }

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
    console.log(localStorage.getItem('users'))
  }, [users])

  const sort = (typeOfSort: string) => {
    const sortedUsers = [...users];
    switch (typeOfSort) {
      case 'firstName': {
        console.log(typeOfSort)
        sortedUsers.sort((a, b) => a.firstName.localeCompare(b.firstName))
        break;
      }
      case 'lastName': {
        console.log(typeOfSort)
        sortedUsers.sort((a, b) => a.lastName.localeCompare(b.lastName))
        break;
      }
      case 'phone': {
        console.log(typeOfSort)
        sortedUsers.sort((a, b) => a.phone.localeCompare(b.phone))
        break;
      }
      case 'gender': {
        console.log(typeOfSort)
        sortedUsers.sort((a, b) => a.gender === b.gender ? 0 : a.gender ? -1 : 1 )
        break;
      }
      case 'age': {
        console.log(typeOfSort)
        sortedUsers.sort((a, b) => a.age - b.age)
        break;
      }
    }

    setUsers(sortedUsers)
  }

  const deleteElement = (index: number) => {
    const usersForDelete = [...users]
    usersForDelete.splice(index, 1)

    setUsers(usersForDelete)
  }
  return (
    <div>
      <Form addUser={addUser} />
      <Table users={users} sort={sort} deleteElement={deleteElement}/>
    </div>
  );
}

export default App;
