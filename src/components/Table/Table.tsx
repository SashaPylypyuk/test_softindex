import React, { FC } from 'react';
import './Table.css';

interface Props {
  users: User[];
  sort(field: string): void;
  deleteElement(field: number): void;
}

export const Table: FC<Props> = ({ users, sort, deleteElement }) => {

  return (
    <div>
      <table className="table">
        <thead className="table__thead">
          <th className=" table__th">
            <button className="table__button" type="button" onClick={() => sort('firstName')}>
              First Name
            </button>
          </th>
          <th className="table__cell table__th">
            <button className="table__button" type="button" onClick={() => sort('lastName')}>
              Last Name
            </button>
          </th>
          <th className="table__cell table__th">
            <button className="table__button" type="button" onClick={() => sort('phone')}>
              Phone
            </button>
          </th>
          <th className="table__cell table__th">
            <button className="table__button" type="button" onClick={() => sort('gender')}>
              Gender
            </button>
          </th>
          <th className="table__cell table__th">
            <button className="table__button" type="button" onClick={() => sort('age')}>
              Age
            </button>
          </th>
        </thead>
          {users.map((user, index) => (
            <tr key={index} className="table__tr">
              <td className="table__cell table__td">
                {user.firstName}
              </td>
              <td className="table__cell table__td">
                {user.lastName}
              </td>
              <td className="table__cell table__td">
                {user.phone}
              </td>
              <td className="table__cell table__td">
                {user.gender ? 'Male': 'Female'}
              </td>
              <td className="table__cell table__td">
                {user.age}
              </td>
              <td>
                <button className="table__button--delete" onClick={() => deleteElement(index)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  );
}
