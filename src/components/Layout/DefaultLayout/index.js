import Footer from "../../Footer";
import Header from "../../Header";
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import ModalCheckOut from "../../ModalCheckOut";

const cx = classNames.bind(styles);

function DefaultLayout({children}) {
    return (
      <div className={cx("wrap")}>
        <ModalCheckOut/>
        <Header />
        <div className={cx("container")}>{children}</div>
        <Footer />
      </div>
    );
}

export default DefaultLayout;