import { Heading } from '../components/Heading';
import { CategoryCreate } from '../components/Categories/CategoryCreate';
import { CategoryEdit } from '../components/Categories/CategoryEdit';
import { CategoryList } from '../components/Categories/CategoryList';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useModal } from '../context/ModalContext';
import { useCategories } from '../hooks/categories';

export const Categories = () => {
  const [categories, setCategories] = useCategories();
  const { setModalContent, setModalTitle, setModalShow, modalClose } = useModal();

  const afterSubmit = (category) => {
    modalClose();
    const newCategories = [...categories, category];
    setCategories(newCategories);
  };

  const showCreateModal = () => {
    setModalContent(<CategoryCreate afterSubmit={afterSubmit} />);
    setModalTitle('Create Category');
    setModalShow(true);
  };

  const afterEdit = (category) => {
    modalClose();
    setCategories(
      categories.map((item) => {
        if (category.id === item.id) return category;
        return item;
      })
    );
  };

  const showEditModal = (category) => {
    setModalContent(<CategoryEdit afterEdit={afterEdit} id={category.id} />);
    setModalTitle(`Edit Category`);
    setModalShow(true);
  };

  return (
    <>
      <div className='container-sm body-container'>
        <Heading title={`Categories`} handleShow={showCreateModal} />
        <CategoryList items={categories} onEdit={showEditModal} />
      </div>
    </>
  );
};
