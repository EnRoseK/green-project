import axios from 'axios';
import { useState } from 'react';
import { SlPencil, SlTrash } from 'react-icons/sl';
import { BsCheck2 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Form } from 'react-bootstrap';

const ListItem = ({ item, index }) => {
  const [deleted, setDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);
  const [link, setLink] = useState(item.link);
  const [newTab, setNewTab] = useState(item.newTab);
  const [ordering, setOrdering] = useState(item.ordering);

  const deleteItem = () => {
    axios
      .delete(`http://localhost:8000/menus/${item.id}`)
      .then(() => {
        setDeleted(true);
        toast.success('Амжилттай устгалаа.');
      })
      .catch((err) => {
        console.log(err);
        toast.error(`Алдаа гарлаа`);
      });
  };

  const editItem = () => {
    axios
      .patch(`http://localhost:8000/menus/${item.id}`, { name, link, newTab, ordering: Number(ordering) })
      .then((res) => {
        setName(res.data.name);
        setLink(res.data.link);
        setNewTab(res.data.newTab);
        setOrdering(res.data.ordering);
        toast.success('Амжилттай шинэчиллээ.');
      })
      .catch((err) => toast.error('Алдаа гарлаа.'));
  };

  if (deleted) return <></>;

  return (
    <tr>
      <th scope='row'>{index}</th>
      {isEditing ? (
        <>
          <td>
            <Form.Control
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              type='text'
            />
          </td>
          <td>
            <Form.Control
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
              }}
              type='text'
            />
          </td>
          <td>
            <Form.Select value={newTab} onChange={(e) => setNewTab(e.target.value === 'true' ? true : false)}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
          </td>
          <td>
            <Form.Control value={ordering} onChange={(e) => setOrdering(e.target.value)} type='number' />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{link}</td>
          <td>{newTab ? 'Yes' : 'No'}</td>
          <td>{ordering}</td>
        </>
      )}

      <td style={{ whiteSpace: 'nowrap' }}>
        {isEditing ? (
          <button
            className='btn btn-sm btn-outline-success me-2'
            onClick={() => {
              editItem();
              setIsEditing(false);
            }}
          >
            <BsCheck2 />
          </button>
        ) : (
          <button className='btn btn-sm btn-outline-primary me-2' onClick={() => setIsEditing(true)}>
            <SlPencil />
          </button>
        )}
        <button className='btn btn-sm btn-outline-danger' onClick={deleteItem}>
          <SlTrash />
        </button>
      </td>
    </tr>
  );
};

export const MenuList = ({ items }) => {
  return (
    <table className='table table-bordered table-hover'>
      <thead>
        <tr>
          <th width='1'>#</th>
          <th>Name</th>
          <th>Link</th>
          <th>New Tab</th>
          <th>Order</th>
          <th width='1'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items?.map((item, index) => (
          <ListItem item={item} index={index + 1} key={`list-item-${index}`} />
        ))}
      </tbody>
    </table>
  );
};
