import styles from "./ListProduct.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../constants";

const cx = classNames.bind(styles);

function ListProduct() {
    const [isClickCategory,setIsClickCategory] = useState(false);
    const [isClickQtyProduct,setIsClickQtyProduct] = useState(false);
    const category = ["Shoes","Furniture","Electronics","Clothes"];
    const qtyProduct = [5,10,15,20];
    const [categoryChoose,setCategoryChoose] = useState("");
    const [qtyProductChoose,setQtyProductChoose] = useState(5);
    const [searchInput,setSearchInput] = useState('');
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(false);
    let products=data;
    if(categoryChoose==="Shoes") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Furniture") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Electronics") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(categoryChoose==="Clothes") {
        products=data.filter(p => p.category.name===categoryChoose);
    }
    if(qtyProductChoose === 10) {
        products=products.slice(0,qtyProductChoose);
    }
    if(qtyProductChoose === 15) {
        products=products.slice(0,qtyProductChoose);
    }
    if(qtyProductChoose === 20) {
        products=products.slice(0,qtyProductChoose);
    }
    if(searchInput) {
        products=products.filter((p) => {
            return p.title.toLowerCase()===searchInput.toLowerCase().trim()
                || p.title.toLowerCase().includes(searchInput.toLowerCase().trim());
        })
    } 
    useEffect(() => {
        const controller = new AbortController();
        try {
            const fetchData = async() => {
                let respone = await axios.get(url+"/products",{
                    signal: controller.signal
                })
                setLoading(true);
                setData(respone.data);
            }
            fetchData();
        } catch(e) {
            console.log(e);
        }
        return () => {
            controller.abort();
        }
    },[]);
    
    const handleDelete = (id) => {
        const newProducts = data.filter(p => p.id!==id);
        axios.delete(url+`/products/${id}`);
        setData(newProducts);
    }

    const handleSearch = (e) => {
        if(e.which===13) {
            setSearchInput(e.target.value);
        }
    }

    return (
        <div className={cx("wrap-products")}>
            <h3 className={cx("title")}>Products</h3>
            <div className={cx("content")}>
                <Link to="/login/admin/products/create" className={cx("btn-create")}>Add new</Link>
                <div className={cx("dropdown-category")} onClick={() => setIsClickCategory(!isClickCategory)}>
                    <span className={cx("select")}>Select Category</span>
                    <div className={cx("btn-dropdown")}>
                        <svg className={cx("icon-down")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                    </div>
                    <div className={cx("dropdown-list",{show: isClickCategory})}>
                        {category.map((categoryItem,index) => {
                            return <div className={cx("dropdown-item")} key={index} onClick={() => setCategoryChoose(categoryItem)}>{categoryItem}</div>
                        })}
                    </div>
                </div>
                <div className={cx("filter")}>
                    <div className={cx("show-product")}>
                        Show
                        <div className={cx("dropdown-numbers")} onClick={() => setIsClickQtyProduct(!isClickQtyProduct)}>
                            <span className={cx('number')}>{qtyProductChoose}</span>
                            <div className={cx("list-number",{show: isClickQtyProduct})}>
                                {qtyProduct.map((num,index) => {
                                    return <div className={cx("number-item")} key={index} onClick={() => setQtyProductChoose(num)}>{num}</div>
                                })}
                            </div>
                            <div className={cx("btn-dropdown")}>
                                <svg className={cx("icon-down")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>
                            </div>
                        </div>
                    </div>
                    <div className={cx("search-fiter")}>
                        Search:
                        <input type="text" className={cx("search-input")} onKeyDown={handleSearch}/>
                    </div>  
                </div>
                <div className={cx("wrap-table")}>
                <table className={cx("products-table")}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {loading?<tbody>
                        {products.map((product,index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img
                                    src={product.images[0]}
                                    alt=""
                                    className={cx("table-item-img")}
                                  />
                                </td>
                                <td >{product.title}</td>
                                <td className={cx("table-item-desc")}>{product.description}</td>
                                <td>{product.category.name}</td>
                                <td>{product.price}</td>
                                <td>
                                  <div className={cx("group-btn")}>
                                    <Link to={`/login/admin/products/edit/${product.id}`} className={cx("btn-edit")}>Edit</Link>
                                    <button className={cx("btn-delete")} onClick={() => handleDelete(product.id)}>Delete</button>
                                  </div>
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>:<tbody><tr><td className={cx("load")}>Loading...</td></tr></tbody>}
                </table>
                </div>
            </div>
        </div>
    )
}

export default ListProduct;