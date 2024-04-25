export interface ISupplier {
  address: {
      postalCode: string,
      state: string,
      city: string,
      country: string
  },
  _id: string,
  name: string,
  taxIdNum: number,
  description: string,
  active: true,
  addedAt: Date,
}
