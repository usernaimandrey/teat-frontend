import React, { useEffect } from "react";
import styles from "./styles.m.styl";
import { map } from "lodash";
import { observer } from "mobx-react-lite";
import OrdersListState from "./store";
import { OrdersListItem } from "./types";

import Button from "../../../components/Button";
import AngleLeftIcon from "../../../assets/icons/angle-left-solid.svg";
import AngleRightIcon from "~/assets/icons/angle-right-solid.svg";
import ListItem from "./components/ListItem";

const OrdersList = observer(
  (): JSX.Element => {
    const [state] = React.useState(new OrdersListState());

    useEffect(() => {
      if (state.initialized) return;
      const init = async () => {
        await state.initialize();
      }
      init();
    });
    return (
      <React.Fragment>
        <div className={styles.screenWrapper}>
          <div className={styles.screen}>
            {state.loading && <span>Loading...</span>}
            {!state.loading && (
              <div className={styles.table}>
                <div className={styles.head}>
                  <div className={styles.row}>
                    <div className={styles.elementHead}>Номер</div>
                    <div className={styles.elementHead}>Создан</div>
                    <div className={styles.elementHead}>Доставка</div>
                    <div className={styles.elementHead}>В работе</div>
                    <div className={styles.elementHead}>Статус</div>
                  </div>
                </div>
                <div className={styles.body}>
                  {map(state.orders, (order: OrdersListItem, index: number) => (
                    <ListItem order={order} key={index} />
                  ))}
                </div>
              </div>
            )}
            <div className={styles.pagination}>
              <Button
                small
                text="PREV"
                icon={AngleLeftIcon}
                resting
                disabled={!state.canPrev}
                onClick={() => state.prevPage()}
              />
              <Button
                small
                text="NEXT"
                rightIcon={AngleRightIcon}
                resting
                disabled={!state.canNext}
                onClick={() => state.nextPage()}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

export default OrdersList;
