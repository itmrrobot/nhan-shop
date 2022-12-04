import styles from './AddProduct.module.scss';
import classNames from 'classnames/bind';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {url} from '../../constants/index';

const cx = classNames.bind(styles);

function AddProduct() {
    const [isClickCategory,setIsClickCategory] = useState(false);
    const category = [{id:4,name:"Shoes"},{id:3,name:"Furniture"},{id:2,name:"Electronics"},{id:1,name:"Clothes"}];
    const [categoryChoose,setCategoryChoose] = useState({});
    const initialValues = {title:'',price:0,description:'',categoryId:categoryChoose.id,images:''};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const newFormValues = {title:formValues.title,price:formValues.price,description:formValues.description,categoryId:categoryChoose.id,images:[formValues.images]}

    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }

    const validate = (values) => {
      const msg = {};

      if(!values.title) {
        msg.title = 'The title is required';
      }

      if(!values.price) {
        msg.price = 'The price is required';
      }

      if(!values.description) {
        msg.description = 'The description is required';
      }

      if(!values.categoryId) {
        msg.categoryId = 'You need select category';
      }

      if(!values.images) {
        msg.images = 'The images url is required';
      }

      return msg;
    }

    const handleAdd = async(e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      try {
        const respone = await axios.post(url+'/products/',newFormValues);
        console.log(respone);
      } catch(e) {
        console.log(e);
      }
    }
    return (
      <div className={cx("wrap")}>
        <h3 className={cx("title")}>Add Product</h3>
        <div className={cx("content")}>
          <form className={cx("form-add-product")}>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Product Name</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="title"
                placeholder="Name"
                value={formValues.title}
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.title}</p>            
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Product Price</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="price"
                value={formValues.price}
                placeholder="Price"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.price}</p>
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Category</h4>
              <div className={cx('form-wrap')}>
              <div
                className={cx("dropdown-category")}
                onClick={() => setIsClickCategory(!isClickCategory)}
              >
                <span className={cx("select")}>Select Category</span>
                <div className={cx("btn-dropdown")}>
                  <svg
                    className={cx("icon-down")}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                  </svg>
                </div>
                <div className={cx("dropdown-list", { show: isClickCategory })}>
                  {category.map((categoryItem, index) => {
                    return (
                      <div
                        className={cx("dropdown-item")}
                        key={index}
                        onClick={() => setCategoryChoose(categoryItem)}
                      >
                        {categoryItem.name}
                      </div>
                    );
                  })}
                </div>
              </div>
              {Object.keys(categoryChoose).length===0?<p className={cx("message")}>{formErrors.categoryId}</p>:<p className={cx("message")}></p>}
              </div>
            </div>
            <div className={cx("form-group")}>
              <h4 className={cx("form-product-title","mt-14")}>Image Url</h4>
              <div className={cx('form-wrap')}>
              <input
                type="text"
                name="images"
                value={formValues.images}
                placeholder="Image Url"
                className={cx("form-input-product")}
                onChange={handleChange}
              />
              <p className={cx("message")}>{formErrors.images}</p>
              </div>
            </div>
            <div className={cx("form-group","bl")}>
              <h4 className={cx("form-product-title","mt-14")}>Product Description</h4>
              <div className={cx('form-wrap')}>
              <textarea value={formValues.description} name='description' placeholder="Description" className={cx("form-product-desc")} onChange={handleChange}></textarea>
              <p className={cx("message")}>{formErrors.description}</p>
              </div>
            </div>
            <div className={cx('group-btn')}>
              <button className={cx('btn-create')} onClick={handleAdd}>Add Product</button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default AddProduct;