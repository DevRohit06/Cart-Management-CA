export class Product {
	constructor(
		public id: string,
		public title: string,
		public price: number,
		public description: string,
		public category: string,
		public image: string,
		public quantity: number = 1,
		public uid?: string,
		public total?: number
	) {}

	public IncreaseQuantity() {
		this.quantity++;
	}

	public getTotal(): number {
		return this.price * this.quantity;
	}

	public DecreaseQuantity() {
		if (this.quantity > 1) {
			this.quantity--;
		}
	}
}
