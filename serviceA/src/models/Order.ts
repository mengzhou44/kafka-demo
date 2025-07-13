export class Order {
  constructor(
    public orderId: number,
    public customerName: string,
    public totalAmount: number,
    public timestamp: string
  ) {}

  static fromJson(json: string): Order {
    const obj = JSON.parse(json);
    return new Order(obj.orderId, obj.customerName, obj.totalAmount, obj.timestamp);
  }
}