import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import OrdersShowStore from "./store";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import styles from "./styles.m.styl";
import Item from './components/Item/index';

type ShowParams = {
  id: string;
};

const OrdersShow = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersShowStore());
    const param: ShowParams = useParams();
    state.setId(param.id);
    useEffect(() => {
      if (state.initialized) return;
      const initial = async (): Promise<any> => {
        await state.init();
      };
      initial();
    });
    console.log(state.order)
    return (
      <div className={styles.screenWrapper}>
        <Link to="/orders">BACK</Link>
        {state.loading && <span>Loading...</span>}
        {!state.loading && (
          <>
          <h2>{`Заказ ${state.order?.number}`}</h2>
          <div className={styles.screen}>
            <div className={styles.items}>
              <div>Номер</div>
              <div>Доставка</div>
              <div>Статус</div>
              <div>Состав</div>
                <div>{state.order?.id}</div>
                <div>{state.order?.delivery.code}</div>
                <div>{state.order?.status}</div>
                <div>
                {state.order?.items.map((item) => {
                return <Item item={item} />
                })}
                </div>
            </div>
          </div>
          </>
        )}
      </div>
    );
  }
);

export default OrdersShow;
