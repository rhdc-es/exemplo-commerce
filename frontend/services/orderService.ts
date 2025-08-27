export interface OrderProduct {
  id: number;
  quantity: number;
}

export interface OrderPayload {
  userId: number;
  products: OrderProduct[];
}

export async function createOrder(payload: OrderPayload) {
  const res = await fetch('https://dummyjson.com/carts/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error('Falha ao criar pedido');
  }
  return res.json();
}
