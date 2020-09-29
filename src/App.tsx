import React, { ChangeEvent, useState, useEffect } from 'react';
import cn from 'classnames';
import './App.css'

import { Table } from './components/Table/Table';

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState<boolean>(true)
  const [age, setAge] = useState<number>(0)
  const [users, setUsers] = useState<Users[]>([])
  const [firstNameError, setFirstNameError] = useState<boolean>(false)
  const [lastNameError, setLastNameError] = useState<boolean>(false)
  const [phoneError, setPhoneError] = useState<boolean>(false)
  const [ageError, setAgeError] = useState<boolean>(false)

  if (!users.length) {
    let usersFromLs = localStorage.getItem('users')
    if (typeof (usersFromLs) === 'string') {
      usersFromLs =  JSON.parse(usersFromLs)
      if (usersFromLs?.length && typeof usersFromLs !== 'string') {
        setUsers(usersFromLs)
      }
    }
  }

  const changeFistName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFirstName(value);
    setFirstNameError(false);
  }
  const changeLastName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setLastName(value);
    setLastNameError(false);
  }
  const changePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPhone(value);
    setPhoneError(false);
  }
  const changeAge = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAge(Number.parseInt(value))
    setAgeError(false);
  }
  const changeGender = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    if (value === 'Male') {
      setGender(true)
    } else {
      setGender(false)
    }
  }
  const addUser = () => {
    let localError = false;

    if (firstName === '') {
      localError = true
      setFirstNameError(true)
    } else {
      setFirstName(firstName.replace(/\s+/g, ' ').trim())
    }

    if (lastName === '') {
      localError = true
      setLastNameError(true)
    } else {
      setLastName(lastName.replace(/\s+/g, ' ').trim())
    }

    let phoneLength = phone.replace(/\s+/g, '').trim().length
    if (phone === '' || (phoneLength !== 10 && phoneLength !== 12)) {
      localError = true
      setPhoneError(true)
    }
    setPhone(phone.replace(/\s+/g, '').trim())

    if ((age <= 0 || age > 100) || isNaN(age) ) {
      localError = true
      setAgeError(true)
    }

    if (!localError) {
      const user = {
        firstName : firstName,
        lastName : lastName,
        phone : phone,
        gender : gender,
        age : age
      };
      setUsers(users => [...users, user]);
      setFirstName('');
      setLastName('');
      setPhone('');
      setGender(true);
      setAge(0)
    }
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
      <form className="form">
        <label className="form__label">
          <p className="form__text">
            First Name
          </p>
          <input
            className={cn('form__input', {'error' : firstNameError})}
            type="text"
            value={firstName}
            onChange={changeFistName}
          />
        </label>
        <label className="form__label">
          <p className="form__text">
            Last Name
          </p>
          <input
            className={cn('form__input', {'error' : lastNameError})}
            type="text"
            value={lastName}
            onChange={changeLastName}
          />
        </label>
        <label className="form__label">
          <p className="form__text">
            Phone
          </p>
          <input
            className={cn('form__input', {'error' : phoneError})}
            type="text"
            value={phone}
            onChange={changePhone}
          />
        </label>
        <label className="form__label">
          <p className="form__text">
            Male <input type="radio" name="gender" value="Male" onChange={changeGender} checked={gender === true} />
          </p>
          <p className="form__text">
            Female <input type="radio" name="gender" value="Female" onChange={changeGender} />
          </p>
        </label>
        <label className="form__label">
          <p className="form__text">
            Age
          </p>
          <input
            className={cn('form__input', {'error' : ageError})}
            type="number"
            value={age}
            onChange={changeAge}
          />
        </label>
        <input className="form__input form__button" type="button" value="Send" onClick={addUser} />
      </form>
      <Table users={users} sort={sort} deleteElement={deleteElement}/>
    </div>
  );
}

export default App;
