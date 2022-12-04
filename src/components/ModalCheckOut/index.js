import styles from './ModalCheckOut.module.scss';
import classNames from 'classnames/bind';
import { CartState } from '../../store/Context';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function ModalCheckOut() {
    const {state:{isCheckOut,products},dispatch} = CartState();
    const initialValues = {name:'',email:'',address:'',phone:''};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});
    const [success,setSuccess] = useState(false);

    const handleChange = (e) => {
      const {name,value} = e.target;
      setFormValues({...formValues,[name]:value});
    }

    const validate = (values) => {
      const msg = {};
      const regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!values.name) {
        msg.name = 'The name is required';
      }
      if(!values.email) {
        msg.email = 'The email is required';
      } else if(!regx.test(values.email)) {
        msg.email = 'The email is invalid';
      }
      if(!values.address) {
        msg.address = 'The address is required';
      }
      if(!values.phone) {
        msg.phone = 'The phone is required';
      }
      return msg;
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      if(formValues.name!==''&&formValues.address!==''&&formValues.email!==''&&formValues.phone!=='') {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    }

    return (
      <>
        {isCheckOut && (
          <div
            className={cx("modal")}
            onClick={(e) => {
              dispatch({ type: "SHOWMESSAGE", payload: false });
              e.stopPropagation();
            }}
          ></div>
        )}
        {isCheckOut && (
          <div className={cx("modal-content")}>
            {success === false ?<>
              <h3 className={cx("modal-title")}>Billing Address</h3>
              <div className={cx("modal-body")}>
                <form className={cx("modal-form")} onSubmit={handleSubmit}>
                  <div className={cx("modal-form-wrap")}>
                    <div className={cx("form-group-left")}>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Name</span>
                        <input
                          type="text"
                          name="name"
                          value={formValues.name}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.name && (
                          <p className={cx("message")}>{formErrors.name}</p>
                        )}
                      </div>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Email</span>
                        <input
                          type="text"
                          name="email"
                          value={formValues.email}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.email && (
                          <p className={cx("message")}>{formErrors.email}</p>
                        )}
                      </div>
                    </div>
                    <div className={cx("form-group-right")}>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Address</span>
                        <input
                          type="text"
                          name="address"
                          value={formValues.address}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.address && (
                          <p className={cx("message")}>{formErrors.address}</p>
                        )}
                      </div>
                      <div className={cx("modal-form-group")}>
                        <span className={cx("form-group-title")}>Phone</span>
                        <input
                          type="text"
                          name="phone"
                          value={formValues.phone}
                          onChange={handleChange}
                          className={cx("modal-form-input")}
                          autoComplete="off"
                        />
                        {formErrors.phone && (
                          <p className={cx("message")}>{formErrors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={cx("right")}>
                    <button type="submit" className={cx("btn-submit")}>
                      Comfirm
                    </button>
                  </div>
                </form>
              </div>
              <button
                className={cx("btn-close")}
                onClick={(e) => {
                  dispatch({ type: "SHOWMESSAGE", payload: false });
                  e.stopPropagation();
                }}
              >
                &times;
              </button>
            </>:<>
              <h3 className={cx("modal-title")}>Thanks for buying our product</h3>
              <div className={cx('model-content')}>Please check your email for delivery</div>
              <button
                className={cx("btn-close")}
                onClick={(e) => {
                  dispatch({ type: "SHOWMESSAGE", payload: false });
                  e.stopPropagation();
                }}
              >
                &times;
              </button>
            </>}
          </div>
        )}
      </>
    );
}

export default ModalCheckOut;