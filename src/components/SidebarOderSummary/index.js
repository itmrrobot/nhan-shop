import styles from './SidebarOderSummary.module.scss';
import classNames from 'classnames/bind';
import { CartState } from '../../store/Context';

const cx = classNames.bind(styles);

function SidebarOderSummary() {
    const {state: {total},dispatch} = CartState();
    return (
      <>
        <h3 className={cx("title")}>Order summary</h3>
        <div className={cx("content")}>
          <div className={cx('wrap')}>
            <span className={cx('subtotal')}>Subtotal</span>
            <span className={cx('subtotal-price')}>${total}</span>
          </div>
          <div className={cx('wrap')}>
            <span className={cx('name')}>Shipping </span>
            <span className={cx('free')}>FREE</span>
          </div>
          <div className={cx('wrap-total')}>
            <span className={cx('total')}>Total</span>
            <span className={cx('total-price')}>${total}</span>
          </div>
          <button className={cx('btn-checkout')} onClick={() => dispatch({type:"SHOWMESSAGE",payload:true})}>Checkout</button>
        </div>
      </>
    );  
}

export default SidebarOderSummary;