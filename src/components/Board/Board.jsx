import { v4 as uuidv4 } from 'uuid'
import { useState } from 'react'
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetContactsQuery,
} from '../../redux'
import css from './board.module.scss'

const Board = () => {
  // States for goods
  const [count, setCount] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const { data: goods = [], isLoading: isGoodsLoading } =
    useGetGoodsQuery(count)
  const [addProduct, { isError: isProductError }] = useAddProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  // States for contacts

  const { data: contacts = [], isLoading: isContactsLoading } =
    useGetContactsQuery()

  // Handlers for products
  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap()
      setNewProduct('')
    }
  }
  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  if (isGoodsLoading || isContactsLoading) return <h1>Loading...</h1>

  console.log(contacts)
  return (
    <div className={css.board}>
      <h2>Board</h2>

      {/* Section for Products */}
      <div>
        <h3>Products</h3>
        <div>
          <input
            type="text"
            value={newProduct}
            onChange={(e) => setNewProduct(e.target.value)}
            placeholder="New Product"
          />
          <button onClick={handleAddProduct}>Add Product</button>
        </div>
        <div>
          <select value={count} onChange={(e) => setCount(e.target.value)}>
            <option value="">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <ul>
          {goods.map((item) => (
            <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Section for Contacts */}
      <div>
        <h3>Contacts</h3>

        <ul>
          {contacts.map((contact) => (
            <li key={contact._id}>{contact.phone}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Board
