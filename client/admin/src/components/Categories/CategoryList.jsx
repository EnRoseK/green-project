import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SlPencil, SlTrash } from 'react-icons/sl';
import axios from 'axios';
import { useRemoveCategory } from '../../hooks/categories/useRemoveCategories';

const ListItems = ({ item, index, onEdit }) => {
  const { deleteItem, deleted } = useRemoveCategory(item.id);

  if (deleted) return <></>;

  return (
    <>
      <tr>
        <th scope='row'>{index}</th>
        <td>{item.title}</td>
        <td>{item.description}</td>
        <td style={{ whiteSpace: 'nowrap' }}>
          <button
            className='btn btn-sm btn-outline-primary me-2'
            onClick={() => {
              onEdit(item);
            }}
          >
            <SlPencil />
          </button>
          <button
            className='btn btn-sm btn-outline-danger'
            onClick={() => {
              if (window.confirm('Устгахдаа итгэлтэй байна уу?')) {
                deleteItem();
              }
            }}
          >
            <SlTrash />
          </button>
        </td>
      </tr>
    </>
  );
};

export const CategoryList = ({ items, onEdit }) => {
  return (
    <>
      <table className='table table-bordered table-hover'>
        <thead>
          <tr>
            <th width='1'>#</th>
            <th>Name</th>
            <th>Description</th>
            <th width='1'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <ListItems item={item} index={index + 1} key={`list-item-${index}`} onEdit={onEdit} />
          ))}
        </tbody>
      </table>
    </>
  );
};
