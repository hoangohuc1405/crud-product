import axios from "axios";
import { useEffect, useState } from "react";

export function Listproduct() {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:3000/products");
                console.log("Fetched products:", res.data); // Kiểm tra dữ liệu trả về
                setList(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setList((prevList) => prevList.filter(item => item.id !== id));
        } catch (err) {
            console.error("Error deleting product:", err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1>Product List</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Name</td>
                        <td>Description</td>
                        <td>Img</td>
                        <td>Price</td>
                        <td>Stock</td>
                        <td colSpan={2}>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.img ? (
                                        <img src={item.img} style={{ width: '100px', height: '100px' }} alt={item.name} />
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td><button>Edit</button></td>
                                <td>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    );
}
