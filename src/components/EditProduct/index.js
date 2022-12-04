import styles from './EditProduct.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {url} from '../../constants/index';

const cx = classNames.bind(styles);

function EditProduct() {
    const {id} = useParams();
    const [formValues,setFormValues] = useState({});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(formValues.images) {
            formValues.images = [formValues.images];
        }
        try {
            const respone = await axios.put(url+`/products/${id}`,formValues);
            console.log(respone);
        } catch(e) {
            console.log(e)
        }
    }

    const handleReset = () => {
        
    }

    return (
        <div className={cx('wrap')}>
            <h3 className={cx("title")}>Edit Product</h3>
            <div className={cx("content")}>
                <form className={cx("form-edit-product")}>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Title</h4>
                            <input type="text" name="title" className={cx('form-product-input')} placeholder="Title" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Price</h4>
                            <input type="text" name="price" className={cx('form-product-input')} placeholder="Price" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Description</h4>
                            <textarea name='description' placeholder="Description" className={cx("form-product-desc")} onChange={handleChange}></textarea>
                        </div>
                    </div>
                    <div className={cx('form-group-product')}>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Category Id</h4>
                            <input type="text" name="categoryId" className={cx('form-product-input')} placeholder="Category Id" onChange={handleChange}/>
                        </div>
                        <div className={cx('form-group')}>
                            <h4 className={cx("form-product-title")}>Images Url</h4>
                            <input type="text" name="images" className={cx('form-product-input')} placeholder="Images Url" onChange={handleChange}/>
                        </div>
                    </div>
                </form>
                <div className={cx('group-edit-btn')}>
                    <div className={cx('btn-reset')} onClick={handleReset}>Reset</div>
                    <div className={cx('btn-edit')} onClick={handleSubmit}>Edit</div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct;