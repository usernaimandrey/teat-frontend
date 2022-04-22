import { makeAutoObservable } from "mobx";
import { SingleOrder } from "~/screens/Orders/Show/types";
import client from "~/api/gql";
import { ORDER_QUERY } from "./queries";

export default class OrdersShowStore {
  order: SingleOrder | null = null;
  id: string | null = null;
  initialized = false;
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  startLoading(): void {
    this.loading = true;
  }

  stopLoading(): void {
    this.loading = false;
  }

  setOrder(order: SingleOrder) : void {
    this.order = order;
  }

  setInitialize(val: boolean): void {
    this.initialized = val;
  }

  setId(id: string) {
    this.id = id;
  }

  getOrder(): SingleOrder | null {
    return this.order;
  }

  async loadOrder(): Promise<any> {
    this.startLoading();
    const { data } = await client.query(ORDER_QUERY, { number: this.id }).toPromise();
    this.setOrder(data.order);
    this.stopLoading();
  }
  async init(): Promise<any> {
    if (this.initialized) return;
    this.initialized = true;
    await this.loadOrder();
  }

}
