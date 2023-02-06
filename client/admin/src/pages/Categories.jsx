import { Heading } from '../components/Heading';
import { CategoryCreate } from '../components/Categories/CategoryCreate';
import { CategoryEdit } from '../components/Categories/CategoryEdit';
import { CategoryList } from '../components/Categories/CategoryList';
import { DynamicModal } from '../components/utils/DynamicModal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Categories = () => {
    const [modalShow, setModalShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [modalContent, setModalContent] = useState();
    const [modalTitle, setModalTitle] = useState('');

    useEffect(() => {
        axios
            .get(`http://localhost:8000/categories`)
            .then((res) => setCategories(res.data))
            .catch((err) => toast.error(`Алдаа гарлаа`));
    }, []);

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    const afterSubmit = (category) => {
        modalClose();
        const newCategories = [...categories, category];
        setCategories(newCategories);
    };

    const modalClose = () => {
        setModalContent();
        setModalShow(false);
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
            <DynamicModal show={modalShow} handleClose={modalClose} title={modalTitle} content={modalContent} />
        </>
    );
};
